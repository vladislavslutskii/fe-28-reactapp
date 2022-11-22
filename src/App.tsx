import React, { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
// @ts-ignore
import styles from "./app.module.scss";
import ThemeProvider from "./Context/ThemeContext/Provider";

import Router from "./Pages/Router";
import store from "./Redux/store";
import { changeTheme } from "./Redux/reducers/themeReducer";
import ThemeSelectors from "./Redux/selectors/themeSelectors";

const App = () => {
  const [value, setValue] = useState<string>("");
  const onChange = (inputValue: string) => {
    setValue(inputValue);
  };

  const dispatch = useDispatch();

  const onChangeTheme = () => {
    dispatch(changeTheme());
  };
  const theme = useSelector(ThemeSelectors.getTheme);

  return (
    <ThemeProvider theme={theme} onChangeTheme={onChangeTheme}>
      <Router></Router>
    </ThemeProvider>
  );
};

const AppWithStore = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWithStore;
