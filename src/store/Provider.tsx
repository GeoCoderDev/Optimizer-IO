"use client";

import { store } from '@/lib/store';
import React from 'react'
import { Provider } from "react-redux";
const ProviderStore = ({children}:{children: JSX.Element | JSX.Element[]}) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default ProviderStore