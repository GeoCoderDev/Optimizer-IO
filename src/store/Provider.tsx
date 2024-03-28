"use client";

;
import React from "react";
import { Provider } from "react-redux";
import store from ".";
const ProviderStore = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderStore;
