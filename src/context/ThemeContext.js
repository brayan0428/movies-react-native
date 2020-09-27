import { createContext } from 'react'

const ThemeContext = createContext({
    darkTheme: false,
    toggleTheme: () => {}
})

export default ThemeContext