import React, { FC, ReactNode } from "react";
import ThemeContext, { Theme } from "./Context";

type ThemeProviderProps = {
  theme: Theme;
  onChangeTheme: () => void;
  children: ReactNode;
};

const ThemeProvider: FC<ThemeProviderProps> = ({
  theme,
  children,
  onChangeTheme,
}) => {
  return (
    <ThemeContext.Provider value={{ theme, onChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
