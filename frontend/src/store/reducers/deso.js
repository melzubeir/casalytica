import { createSlice } from '@reduxjs/toolkit';

const initialDesoState = {
  isActive: false,
};

const desoSlice = createSlice({

  name: 'deso',
  initialState: initialDesoState,
  reducers: {
    setDesoPrice(state, action) {
      state.isActive = true;
      state.buyDeSoFeeBasisPoints = action.payload.BuyDeSoFeeBasisPoints;
      state.nanosPerETHExchangeRate = action.payload.nanosPerETHExchangeRate;
      state.nanosSold = action.payload.NanosSold;
      state.satoshisPerBitCloutExchangeRate = action.payload.SatoshisPerBitCloutExchangeRate;
      state.satoshisPerDeSoExchangeRate =  action.payload.SatoshisPerDeSoExchangeRate;
      state.usdCentsPerBitCloutExchangeRate = action.payload.USDCentsPerBitCloutExchangeRate;
      state.usdCentsPerBitCloutReserveExchangeRate = action.payload.USDCentsPerBitCloutReserveExchangeRate;
      state.usdCentsPerBitcoinExchangeRate = action.payload.USDCentsPerBitcoinExchangeRate;
      state.usdCentsPerDeSoBlockchainDotCom = action.payload.USDCentsPerDeSoBlockchainDotCom;
      state.usdCentsPerDeSoCoinbase = action.payload.USDCentsPerDeSoCoinbase;
      state.usdCentsPerDeSoExchangeRate = action.payload.USDCentsPerDeSoExchangeRate;
      state.usdCentsPerDeSoReserveExchangeRate = action.payload.USDCentsPerDeSoReserveExchangeRate;
      state.usdCentsPerETHExchangeRate = action.payload.USDCentsPerETHExchangeRate;
    },
    setDesoPosts(state, action) {
      state.desoPosts = action.payload;
    }
  },
});

export const desoActions = desoSlice.actions;

export default desoSlice.reducer;
