import { createContext, useContext, useState } from "react";

const ColorThemeContext  = createContext();

export const ColorThemeContextProvider = ({children}) => {
  const [isDark, setIsDark] = useState(false)


  return(
    <ColorThemeContext.Provider value={{isDark, setIsDark}}>
      {children}
    </ColorThemeContext.Provider>
  )
}

export const useColorTheme = () => {
  return useContext(ColorThemeContext)
}