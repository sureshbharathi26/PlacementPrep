import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCompanies = createAsyncThunk('company/fetchCompanies', async () => {
  const response = await axios.get('/api/companies');
  return response.data;
});

const companySlice = createSlice({
  name: 'company',
  initialState: {
    companies: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
        state.loading = false;
      });
  },
});

export default companySlice.reducer;    