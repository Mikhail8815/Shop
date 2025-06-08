import {createSlice, createAsyncThunk, type PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import type { Product, ProductsState } from './types';

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchAll',
  async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk<Product, number>(
    'products/fetchById',
    async (productId, { rejectWithValue }) => {
      try {
        const response = await axios.get<Product>(`https://fakestoreapi.com/products/${productId}`);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue('Unknown error');
      }
    }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      }).
        addCase(fetchProductById.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
          state.status = 'succeeded';
          state.selectedProduct = action.payload;
        })
        .addCase(fetchProductById.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload as string;
        });
  },
});

export const productsReducer = productsSlice.reducer;