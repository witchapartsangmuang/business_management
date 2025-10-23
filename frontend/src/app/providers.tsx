"use client"; // This directive marks it as a client component

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store"; // Adjust path as needed

type Props = { children: React.ReactNode };

export function ReduxProvider({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}