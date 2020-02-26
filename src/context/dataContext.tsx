import React, { useContext } from 'react'
import { Data } from 'types'

import data from '../data'

const DataContext = React.createContext<Data>(data)

export const DataContextProvider: React.FC = ({ children }) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

export const useGetData = <T extends unknown>(
  getData: (data: Data) => T
): T => {
  const data = useContext(DataContext)
  return getData(data)
}
