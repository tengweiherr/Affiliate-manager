import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { RootState } from "..";
import { login } from "../slices/authSlice";

export const authListenerMiddleware = createListenerMiddleware();
authListenerMiddleware.startListening({
  matcher: isAnyOf(login),
  effect: (action, listenerApi) => {
    localStorage.setItem(
        "count",
        JSON.stringify((listenerApi.getState() as RootState))
      );
  }
});