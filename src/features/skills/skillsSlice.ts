// src/features/skills/skillsSlice.ts
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import type { SkillItem } from '../../types';

type CreateSkillPayload = {
  name: string;
  range: number;
};

type SkillsState = {
  items: SkillItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  createStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  createError: string | null;
};

const initialState: SkillsState = {
  items: [],
  status: 'idle',
  createStatus: 'idle',
  error: null,
  createError: null
};

const loadSkillsFromStorage = (): SkillItem[] => {
  try {
    const raw = localStorage.getItem('cv-app-skills');

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as SkillItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const fetchSkills = createAsyncThunk<
  SkillItem[],
  void,
  { rejectValue: string }
>('skills/fetchSkills', async (_, thunkApi) => {
  try {
    const storedSkills = loadSkillsFromStorage();

    if (storedSkills.length > 0) {
      return storedSkills;
    }

    const response = await fetch('/api/skills');

    if (!response.ok) {
      throw new Error('Failed to load skills.');
    }

    const data = (await response.json()) as SkillItem[];
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown skills fetch error.';
    return thunkApi.rejectWithValue(message);
  }
});

export const createSkill = createAsyncThunk<
  SkillItem,
  CreateSkillPayload,
  { rejectValue: string }
>('skills/createSkill', async (payload, thunkApi) => {
  try {
    const response = await fetch('/api/skills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = (await response.json()) as { message?: string };
      throw new Error(errorData.message || 'Failed to create skill.');
    }

    await response.json();

    return {
      id: nanoid(),
      name: payload.name.trim(),
      range: payload.range
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown create skill error.';
    return thunkApi.rejectWithValue(message);
  }
});

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    clearCreateStatus(state) {
      state.createStatus = 'idle';
      state.createError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Failed to load skills.';
      })
      .addCase(createSkill.pending, (state) => {
        state.createStatus = 'loading';
        state.createError = null;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.createError = action.payload ?? 'Failed to create skill.';
      });
  }
});

export const { clearCreateStatus } = skillsSlice.actions;
export default skillsSlice.reducer;