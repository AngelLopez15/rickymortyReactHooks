import { useEffect, useState } from 'react'

export default function usePersonajes(url) {

  const [personajes, setPersonajes] = useState([])

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setPersonajes(data.results))
  }, [url])

  return personajes
}
