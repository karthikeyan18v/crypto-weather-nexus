import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const COINS = ['bitcoin', 'ethereum', 'solana'];

export const fetchCrypto = createAsyncThunk(
  'crypto/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINS.join(',')}&order=market_cap_desc`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCryptoHistory = createAsyncThunk(
  'crypto/fetchHistory',
  async (coinId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
      );
      return { coinId, data: response.data.prices };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    data: [],
    history: {},
    loading: false,
    error: null,
    prices: {},
    alerts: [] // Added alerts array to store price alerts
  },
  reducers: {
    updatePrices: (state, action) => {
      state.prices = action.payload;
    },
    addPriceAlert: (state, action) => {
      state.alerts.push({
        coinId: action.payload.coinId,
        price: action.payload.price,
        timestamp: Date.now(),
        type: 'price_alert'
      });
      
      // Keep only the last 10 alerts
      if (state.alerts.length > 10) {
        state.alerts.shift();
      }
    },
    clearAlerts: (state) => {
      state.alerts = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchCrypto.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchCryptoHistory.fulfilled, (state, action) => {
        state.history[action.payload.coinId] = action.payload.data;
      });
  },
});

export const { updatePrices, addPriceAlert, clearAlerts } = cryptoSlice.actions;
export default cryptoSlice.reducer;