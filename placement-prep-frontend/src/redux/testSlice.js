import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuestions = createAsyncThunk(
  'test/fetchQuestions',
  async ({ companyId, round }) => {
    const response = await axios.get(`/api/tests/${companyId}/${round}`);
    return response.data;
  }
);

const testSlice = createSlice({
  name: 'test',
  initialState: {
    questions: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.loading = false;
      });
  },
});

export default testSlice.reducer;