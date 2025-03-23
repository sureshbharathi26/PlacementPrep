import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Hardcoded backend URL
const API_URL = "http://localhost:5000/api/companies";

export const fetchCompanies = createAsyncThunk("company/fetchCompanies", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(API_URL); // Use full URL
    if (!Array.isArray(response.data)) {
      return rejectWithValue("Invalid data format");
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch companies");
  }
});

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
