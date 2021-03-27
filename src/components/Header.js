import { useContext } from "react"
import DarkContext from "../context/DarkContext"
import ThemeContext from "../context/ThemeContext"

export default function Header() {
  const color = useContext(ThemeContext)

  const { darkMode, setDarkMode } = useContext(DarkContext);

  const handleClick = () => {
    setDarkMode(!darkMode);
  }

  return (
    <div className="header">
      <h1 style={{ color }} className="title">React Hooks</h1>
      <button className={darkMode ? 'dark-button' : 'light-button'} type="button" onClick={handleClick}>{darkMode ? 'Dark Mode' : 'Light Mode'}</button>
    </div>
  )
}
