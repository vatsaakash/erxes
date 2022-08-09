import React from 'react';
import GeneralRoutes from './generalRoutes';
import { AppContextProvider } from './modules/AppContext';

// import { AppProvider } from 'coreui/appContext';

const App = () => {
  return (
    // <AppProvider>
    <AppContextProvider>
      <GeneralRoutes />
    </AppContextProvider>
    // </AppProvider>
  );
};

export default App;
