import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchQuestions = createAsyncThunk(
  'test/fetchQuestions',
  async ({ companyId, round }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/tests/${companyId}/${round}`);
      console.log("API Response:", response.data); // Log the API response
      return response.data;
    } catch (error) {
      console.error("API Error:", error); // Log any errors
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch questions');
    }
  }
);

const testSlice = createSlice({
  name: 'test',
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default testSlice.reducer;