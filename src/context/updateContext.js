import React, {useState, useContext, useEffect} from 'react';

const UpdateContext = React.createContext();

export const UpdateProvider = ({children}) => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  // The value is a function that returns another function
  // because when useState receives a function, it gets executed
  // and its return value is used as the state value
  const [updateApp, setUpdateApp] = useState(() => () => {});

  useEffect(() => {
    const handleUpdateReady = event => {
      const skipWaiting = event.detail.skipWaiting;
      setUpdateApp(() => () => {
        skipWaiting();
        window.location.reload(true);
      });
      setUpdateAvailable(true);
    };

    window.addEventListener('appUpdateReady', handleUpdateReady);

    return () => {
      window.removeEventListener('appUpdateReady', handleUpdateReady);
    };
  }, []);

  const value = {updateAvailable, updateApp};

  return (
    <UpdateContext.Provider value={value}>{children}</UpdateContext.Provider>
  );
};

export const useUpdateContext = () => {
  const updateContext = useContext(UpdateContext);

  // This can only be used if the context's initial value is undefined
  if (updateContext === undefined) {
    throw new Error('useUpdateContext must be used within a SpeechProvider');
  }
  return updateContext;
};
