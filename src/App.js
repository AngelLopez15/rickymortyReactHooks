import { useState } from "react";
import Header from "./components/Header";
import Personajes from "./components/Personajes";
import "./App.css"
import DarkContext from "./context/DarkContext";

function App() {

  const [darkMode, setDarkMode] = useState(false)

  return (
    <DarkContext.Provider value={{darkMode, setDarkMode}}>
      <div className= {darkMode ? "App-dark" : "App"}>
        <Header />
        <Personajes />
      </div>
    </DarkContext.Provider>
  );
}

export default App;
