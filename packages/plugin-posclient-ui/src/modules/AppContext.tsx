import React, { FC, useCallback, useMemo } from 'react';

const initialState = {};

export const AppContext = React.createContext<{} | any>(initialState);

AppContext.displayName = 'AppContext';

export const AppContextProvider: FC = ({ children }) => {
  const [state, setState] = React.useState(initialState);

  const setter = useCallback((newState: any) => {
    setState(newState);
  }, []);

  const value = useMemo(() => {
    return {
      state,
      setter
    };
  }, [state, setter]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  return context;
};
