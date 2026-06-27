// src/app/store.ts
import {
  configureStore,
  createListenerMiddleware,
  isAnyOf
} from '@reduxjs/toolkit';
import educationReducer from '../features/education/educationSlice';
import skillsReducer, {
  createSkill,
  fetchSkills,
  hydrateSkillsFromStorage
} from '../features/skills/skillsSlice';

const skillsStorageMiddleware = createListenerMiddleware();

skillsStorageMiddleware.startListening({
  matcher: isAnyOf(
    createSkill.fulfilled,
    fetchSkills.fulfilled,
    hydrateSkillsFromStorage
  ),
  effect: (_, api) => {
    const state = api.getState() as RootState;
    localStorage.setItem('cv-app-skills', JSON.stringify(state.skills.items));
  }
});

export const store = configureStore({
  reducer: {
    education: educationReducer,
    skills: skillsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(skillsStorageMiddleware.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;