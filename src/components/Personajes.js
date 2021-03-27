import { useCallback, useContext, useMemo, useReducer, useRef, useState } from 'react'
import DarkContext from '../context/DarkContext'
import usePersonajes from '../hooks/usePersonajes'
import Search from './Search'

// Creando el estado inicial
const initialState = {
  favoritos: []
}

const API = 'https://rickandmortyapi.com/api/character'

// Creando el Reducer
const favoritosReducer = (state, action) => {
  switch (action.type) {
    case 'AGREGAR_A_fAVORITOS':
      return {
        ...state,
        favoritos: [...state.favoritos, action.payload],
      }
    case 'BORRAR_DE_fAVORITOS':
      return {
        ...state,
        favoritos: []
      }
    default:
      return state;
  }
}


export default function Personajes() {
  // Importando el contexto
  const { darkMode, setDarkMode } = useContext(DarkContext);
  // usando el useState
  // const [personajes, setPersonajes] = useState([])
  // Usando el Reducer
  const [favoritos, dispatch] = useReducer(favoritosReducer, initialState)

  // State para hacer una busqueda
  const [busqueda, setBusqueda] = useState('')

  // usando el hook useRef
  // El hook useRef se usa principalmente para trabajar con formularios
  // guarda la referencia del valor de los target y sustituye el "event"
  // ya que el event puede llegar a causar bugs
  const busquedaInput = useRef(null)

  // useEffect(() => {
  //   fetch('https://rickandmortyapi.com/api/character')
  //     .then(response => response.json())
  //     .then(data => setPersonajes(data.results))
  // }, [])

  // Sustituyendo el useEffect de arriba por nuestro Custom Hook
  const personajes = usePersonajes(API)

  // Funcion para manejar el reducer
  const handleClickFavoritos = (favoritos) => {
    dispatch({ type: 'AGREGAR_A_fAVORITOS', payload: favoritos })
  }

  const handleClickBorrar = () => {
    dispatch({ type: 'BORRAR_DE_fAVORITOS' })
  }

  // funcion para hacer la busqueda
  // const handleSerch = () => {
  //   setBusqueda(busquedaInput.current.value)
  // }
  
  // Ocupando el hook useCallback
  const handleSerch = useCallback(
    () => {
      setBusqueda(busquedaInput.current.value)
    },
    [],
  )

  // const filteredUsers = personajes.filter((user)=>{
  //   return user.name.toLowerCase().includes(busqueda.toLowerCase())
  // })

  // Usando useMemo para memorizar la logica de la busqueda
  const filteredUsers = useMemo(() => 
    personajes.filter((user)=>{
      return user.name.toLowerCase().includes(busqueda.toLowerCase())
    }), [personajes,busqueda])

  return (
    <>
      <h2 className={darkMode ? "titulo-personajes-dark" : "titulo-personajes"}>Personajes</h2>
      {/* <div>
        <input type="text" value={busqueda} ref={busquedaInput} onChange={handleSerch} />
      </div> */}
      <Search 
        busqueda={busqueda}
        busquedaInput={busquedaInput}
        handleSerch={handleSerch}
      />
      <div className="personajes">
        {
          filteredUsers.map((item, index) => (
            <div className={darkMode ? "personaje-dark" : "personaje"} key={item.id}>
              <div>
                <picture>
                  <img className="img-card" src={item.image} alt={item.name} />
                </picture>
              </div>
              <div className="card-body">
                <h3 className={darkMode ? "text-dark" : "text"}>{item.name}</h3>
                <p className={darkMode ? "text-dark" : "text"}>Especie: {item.species}</p>
                <p className={darkMode ? "text-dark" : "text"}>Origen: {item.origin.name}</p>
                <button type="button" onClick={() => handleClickFavoritos(item)}>Agregar a favoritos</button>
              </div>
            </div>
          ))
        }
      </div>
      <div className="personajes">
        {
          personajes.map((item, index) => (
            <div className={darkMode ? "personaje-dark" : "personaje"} key={item.id}>
              <div>
                <picture>
                  <img className="img-card" src={item.image} alt={item.name} />
                </picture>
              </div>
              <div className="card-body">
                <h3 className={darkMode ? "text-dark" : "text"}>{item.name}</h3>
                <p className={darkMode ? "text-dark" : "text"}>Especie: {item.species}</p>
                <p className={darkMode ? "text-dark" : "text"}>Origen: {item.origin.name}</p>
                <button type="button" onClick={() => handleClickFavoritos(item)}>Agregar a favoritos</button>
              </div>
            </div>
          ))
        }
      </div>
      <div>
        <h2 className={darkMode ? "titulo-personajes-dark" : "titulo-personajes"}>Favoritos</h2>
        <button type="button" onClick={() => handleClickBorrar()}>Limpiar</button>
        <div className="personajes">
          {
            favoritos.favoritos.map((item, index) => (
              <div className={darkMode ? "personaje-dark" : "personaje"} key={item.id}>
                <div>
                  <picture>
                    <img className="img-card" src={item.image} alt={item.name} />
                  </picture>
                </div>
                <div className="card-body">
                  <h3 className={darkMode ? "text-dark" : "text"}>{item.name}</h3>
                  <p className={darkMode ? "text-dark" : "text"}>Especie: {item.species}</p>
                  <p className={darkMode ? "text-dark" : "text"}>Origen: {item.origin.name}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
