# CV App — Stage 2 (React + Redux Toolkit)

This document describes the features implemented in **Stage 2** of the CV application: state management, mock API, form validation, persistence, and quality gates.

## Overview

Stage 2 evolves the initial CV app into a more production-like frontend:

- Adds **Redux Toolkit** for state management (Education and Skills).
- Integrates a **MirageJS** mock server that emulates a REST API.
- Implements **async data loading** with loading and error states.
- Adds a **Skills** form built with **Formik + Yup** validation.
- Persists skills to **localStorage** via Redux listener middleware.
- Includes **unit tests** with coverage above the required threshold.
- Configures a **pre-push hook** (Husky) as a quality gate.

---

## Tech Stack

- **React** (functional components + hooks)
- **Redux Toolkit** (`configureStore`, `createSlice`, `createAsyncThunk`)
- **React-Redux** (typed hooks)
- **MirageJS** (mock REST API)
- **Formik** + **Yup** (form handling and validation)
- **Vitest** + **React Testing Library** (unit tests and coverage)
- **Husky** (Git hooks)

---

## Architecture

### Responsibilities

- `app/store.ts`
  - Configures the Redux store.
  - Registers `education` and `skills` reducers.
  - Adds listener middleware to sync skills with `localStorage`.

- `features/education/educationSlice.ts`
  - Manages Education timeline data, loading state, and errors.
  - Provides `fetchEducations` async thunk.

- `features/skills/skillsSlice.ts`
  - Manages Skills list and skill creation flow.
  - Provides `fetchSkills`, `createSkill`, and `clearCreateStatus`.
  - Integrates with `localStorage` (read on load, write via middleware).

- `services/server.ts`
  - Implements MirageJS mock server.
  - Defines `GET /api/educations`, `GET /api/skills`, `POST /api/skills`.

- `pages/Inner/InnerPage.tsx`
  - Orchestrates data loading (dispatches async thunks).
  - Selects Education/Skills state and passes it to UI components.
  - Controls Skills form visibility and submit behavior.

---

## State Management (Redux Toolkit)

### Store configuration

**File:** `src/app/store.ts`

- Uses `configureStore` to create the app store.
- Adds `education` and `skills` reducers.
- Uses `createListenerMiddleware` + `isAnyOf` to listen for:

  - `fetchSkills.fulfilled`
  - `createSkill.fulfilled`

- On these events, the middleware writes `state.skills.items` into `localStorage` under the key `cv-app-skills`.

Key point: persistence logic lives in middleware, so UI components remain free of side-effect code.

### Education slice

**File:** `src/features/education/educationSlice.ts`

- State:

  ```ts
  type EducationState = {
    items: EducationItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  ```

- Async thunk `fetchEducations`:

  - Calls `GET /api/educations`.
  - On success: stores the array of `EducationItem` and sets `status = 'succeeded'`.
  - On failure: sets `status = 'failed'` and an error message (either from the thrown error or a default one).

- Reducer logic:

  - `pending`: `status = 'loading'`, `error = null`.
  - `fulfilled`: `status = 'succeeded'`, `items = payload`.
  - `rejected`: `status = 'failed'`, `error = rejectValue or default`.

### Skills slice

**File:** `src/features/skills/skillsSlice.ts`

- State:

  ```ts
  type SkillsState = {
    items: SkillItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    createStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    createError: string | null;
  };
  ```

- Local storage integration:

  - `loadSkillsFromStorage()` reads `cv-app-skills` from `localStorage`.
  - If a valid array is found, it is used as initial skills data.

- Async thunk `fetchSkills`:

  - First checks `localStorage` via `loadSkillsFromStorage`.
  - If there are stored skills, returns them immediately.
  - If not, calls `GET /api/skills`.
  - Handles success and failure similarly to `fetchEducations`.

- Async thunk `createSkill`:

  - Calls `POST /api/skills` with `{ name, range }`.
  - Validates server response; returns a new `SkillItem` with a generated `id` from `nanoid()` and trimmed `name`.
  - On failure, returns a meaningful `rejectValue` to be stored in `createError`.

- Reducers:

  - `fetchSkills.*` updates list `items`, `status`, and `error`.
  - `createSkill.*` updates `createStatus`, `createError`, and appends the new skill to `items` on success.
  - `clearCreateStatus` resets `createStatus` and `createError` to idle/`null`.

### Usage in InnerPage

**File:** `src/pages/Inner/InnerPage.tsx`

- Dispatches `fetchEducations` and `fetchSkills` when the corresponding `status` is `idle`.
- Reads selected Education and Skills state via `useAppSelector`.
- Passes `status` and `error` down to `TimeLine` and `Skills`.
- Submits new skills with:

  ```ts
  const handleSkillSubmit = async (values: { name: string; range: number }) => {
    await dispatch(createSkill(values)).unwrap();
    setIsSkillFormOpen(false);
  };
  ```

---

## Mock Server (MirageJS)

### File: `src/services/server.ts`

The MirageJS server emulates a backend with an in-memory database.

Endpoints:

- `GET /api/educations`
  - Returns seeded education records (id, date, title, description).

- `GET /api/skills`
  - Returns seeded skill records (id, name, range).

- `POST /api/skills`
  - Accepts JSON `{ name?: string; range?: number }`.
  - Validates input:
    - `name` must be a non-empty trimmed string.
    - `range` must be a number.
  - On invalid input: returns HTTP 400 with a structured error message.
  - On success: inserts the new skill into `schema.db.skills` and returns it with HTTP 201.

Additional config:

- `namespace = 'api'` — all routes are under `/api/*`.
- `timing = 3000` — 3-second delay to make loading states visible.

Effect: the frontend behaves as if it talks to a real REST API, but everything runs client-side.

---

## Skills Form (Formik + Yup)

### File: `src/components/AddSkillForm/AddSkillForm.tsx`

The Skills form is implemented as a controlled Formik form.

Key features:

- Uses `useFormik` with explicit `initialValues` and `validationSchema`.
- Validation is handled by a Yup schema with the following rules:
  - `name` is a required string.
  - `range` is required, must be a number, and must be between 10 and 100 inclusive.
  - Empty string for `range` is transformed to `NaN` to trigger a proper type error message.
- Submit handler:
  - Trims `name`.
  - Converts `range` to `number`.
  - Calls the provided `onSubmit` prop (which dispatches `createSkill`).
  - Resets the form on success.

UI behavior:

- Inline error messages are displayed under each field when touched and invalid.
- The submit button is disabled when:
  - The form is invalid.
  - The form is pristine (`!dirty`).
  - External submit status (`isSubmittingExternally`) indicates loading (`\"Adding...\"` label).

---

## Timeline / Education UI

### File: `src/components/TimeLine/TimeLine.tsx`

The Timeline component maps the Redux Education state to user-friendly UI:

- `status = 'loading'`:
  - Renders a loading container with a spinner icon and appropriate `role="status"` and `aria-label`.

- `status = 'failed'`:
  - Renders an error container with `role="alert"` and a clear error message.

- `status = 'succeeded'` with empty `items`:
  - Shows an empty state message indicating no education records.

- `status = 'succeeded'` with data:
  - Shows an accessible timeline:
    - Dates.
    - Titles.
    - Descriptions.

This ties async Redux state and MirageJS delays into visible UX feedback.

---

## LocalStorage Persistence

### Where it lives

- Read:
  - `loadSkillsFromStorage()` in `skillsSlice.ts`.

- Write:
  - Listener middleware in `store.ts`.

Runtime behavior:

1. On app start, `fetchSkills` checks `localStorage` first.
2. When skills are successfully fetched or created, the listener middleware saves `skills.items` back to `localStorage`.
3. Reloading the page keeps the skills list intact.

This fully satisfies the requirement: “Skills component integrated with localStorage”.

---

## Tests and Quality Gate

### Unit tests

Stage 2 includes unit tests for core components, such as:

- `AddSkillForm` — form rendering, validation, submit behavior.
- `Skills` — list rendering, empty state, accessibility labels.
- `TimeLine` — loading, error, empty, and success states.
- `Button` — click behavior, disabled state, icon and full-width props.

Tests focus on:

- Rendering and accessibility (`role`, `aria-label`).
- Conditional rendering for different states.
- Validation error messages.
- Button disabled/enabled logic.
- Correct data passed to callbacks (`onClick`, `onSubmit`).

### Running tests

Common commands:

```bash
npm run test:run      # Run the test suite
npm run test:coverage # Run tests with coverage report
```

Coverage is configured via `vitest.config.ts` to use the `v8` provider and meets Stage 2’s minimum threshold (> 35%).

### Husky pre-push hook

**File:** `.husky/pre-push`

```sh
#!/bin/sh
npm run test:coverage
```

Behavior:

- Every `git push` triggers a coverage run.
- If tests or coverage fail, the push is blocked.
- This acts as a quality gate enforced at the Git level.

---

## How to Run the Project (Stage 2)

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Tests

```bash
npm run test:run
npm run test:coverage
```