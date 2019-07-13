import React, {useState, useContext, useEffect} from 'react';

const UpdateContext = React.createContext();

export const UpdateProvider = ({children}) => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateApp, setUpdateApp] = useState(() => {});

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
  return updateContext;
};
