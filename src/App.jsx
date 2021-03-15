import React, { useEffect, useState } from 'react';
import { store } from './firebaseconfig'

function App() {
  const [idUsuario, setIdUsuario] = useState('')
  const [nombre, setNombre] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [usuarioLst, setUsuariosLst] = useState([])
  const [modoEdicion, setModoEdicion] = useState(null)

  useEffect(() => {
    const getUsuarios = async () => {
      const { docs } = await store.collection('agenda').get()
      const newArray = docs.map(item => ({
        id: item.id, ...item.data()
      }))
      setUsuariosLst(newArray)
    }

    getUsuarios()
  }, [])

  const setUsuarios = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('El campo nombre está vacío')
      return
    } else if (!phone.trim()) {
      setError('El campo número está vacío')
      return
    }

    const usuario = {
      nombre: nombre,
      telefono: phone
    }

    try {
      await store.collection('agenda').add(usuario)
      const { docs } = await store.collection('agenda').get()
      const newArray = docs.map(item => ({
        id: item.id, ...item.data()
      }))
      setUsuariosLst(newArray)
    } catch (error) {
      console.log(error)
    }

    setNombre('')
    setPhone('')
  }

  const borrarUsuario = async (id) => {
    try {
      await store.collection('agenda').doc(id).delete()
      const { docs } = await store.collection('agenda').get()
      const newArray = docs.map(item => ({
        id: item.id, ...item.data()
      }))
      setUsuariosLst(newArray)
    } catch (error) {
      console.log(error)
    }
  }

  const pulsarActualizar = async (id) => {
    try {
      const data = await store.collection('agenda').doc(id).get()
      const {nombre, telefono} = data.data()
      setNombre(nombre)
      setPhone(telefono)
      setIdUsuario(id)
      setModoEdicion(true)
    } catch (error) {
      console.log(error)
    }
  }

  const setUpdate = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) {
      setError('El campo nombre está vacío')
      return
    } else if (!phone.trim()) {
      setError('El campo número está vacío')
      return
    }

    const userUpdate = {
      nombre: nombre,
      telefono: phone
    }

    try {
      await store.collection('agenda').doc(idUsuario).set(userUpdate)
      const { docs } = await store.collection('agenda').get()
      const newArray = docs.map(item => ({
        id: item.id, ...item.data()
      }))
      setUsuariosLst(newArray)
    } catch (error) {
      console.log(error)
    }

    setNombre('')
    setPhone('')
    setModoEdicion(null)
    setIdUsuario('')
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Usuario</h2>
          <form onSubmit={modoEdicion ? setUpdate : setUsuarios} className="form-group">
            <input type="text"
              onChange={(e) => setNombre(e.target.value)}
              className="form-control mt-3"
              value={nombre}
              placeholder="Introduce el nombre" />
            <input type="text"
              onChange={(e) => setPhone(e.target.value)}
              className="form-control mt-3"
              value={phone}
              placeholder="Introduce el número" />
              {
                modoEdicion ?
                (
                  <input type="submit"
                  value="Editar"
                  className="btn btn-dark btn-block mt-3" />
                )
                :
                (
                  <input type="submit"
                  value="Registrar"
                  className="btn btn-dark btn-block mt-3" />
                )
              }
          </form>
          {
            error ?
              (
                <div>
                  <p>{error}</p>
                </div>
              )
              :
              (
                <span></span>
              )
          }
        </div>
        <div className="col">
          <h2>Lista usuarios</h2>
          <ul className="list-group">
            {
              usuarioLst.length !== 0 ?
                (
                  usuarioLst.map(item => {
                    return (
                      <li className="list-group-item" key={item.id}>
                        {item.nombre}-{item.telefono}
                        <button onClick={() => borrarUsuario(item.id)} className="btn btn-danger float-right">Eliminar</button>
                        <button onClick={() => pulsarActualizar(item.id)} className="btn btn-info float-right mr-3">Actualizar</button>
                      </li>
                    )
                  })
                )
                :
                (
                  <span>
                    No se encontró información
                  </span>
                )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
