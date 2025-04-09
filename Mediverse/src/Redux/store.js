import {configureStore} from '@reduxjs/toolkit';
import persistedReducer from './reducers';
import persistStore from 'redux-persist/es/persistStore';

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: {warnAfter: 2000},
    }),
});

const persistor = persistStore(store);

export {store, persistor};
