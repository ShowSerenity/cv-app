// src/features/education/educationSlice.ts

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type EducationItem = {
  id: string;
  date: string;
  title: string;
  description: string;
};

type EducationState = {
  items: EducationItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: EducationState = {
  items: [],
  status: 'idle',
  error: null
};

export const fetchEducations = createAsyncThunk<
  EducationItem[],
  void,
  { rejectValue: string }
>('education/fetchEducations', async (_, thunkApi) => {
  try {
    const response = await fetch('/api/educations');

    if (!response.ok) {
      throw new Error('Failed to load education data.');
    }

    const data = (await response.json()) as EducationItem[];
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Unknown education fetch error.';
    return thunkApi.rejectWithValue(message);
  }
});

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducations.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEducations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEducations.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.payload ?? 'Failed to load education data.';
      });
  }
});

export default educationSlice.reducer;