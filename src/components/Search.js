import React from 'react'

export default function Search({busqueda,busquedaInput,handleSerch}) {
  return (
    <div>
      <input type="text" value={busqueda} ref={busquedaInput} onChange={handleSerch} />
    </div>
  )
}
