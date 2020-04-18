import React from 'react'

const listContext = React.createContext({ list: [], setList: () => {} })

export const ListProvider = listContext.Provider
export default listContext
