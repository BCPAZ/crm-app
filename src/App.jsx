import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingScreen from '@/components/common/LoadingScreen';
import { persistor, store } from '@/data/store';
import AppRouter from '@/routes';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<LoadingScreen />}>
        <AppRouter />
      </PersistGate>
    </Provider>
  );
};

export default App;
