import React from 'react';
import {firebase} from './firebase'

function App() {

  const [tar, setTar] = React.useState([])
  const [tareas, setTareas] = React.useState([])
  const [tarea, setTarea] = React.useState('')
  const [edad, setEdad] = React.useState('')
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')


  React.useEffect(() => {
    const obtenerDatos = async () => {
      try{
        const db = firebase.firestore()
        const data = await db.collection('Tareas').get()
        const arrayData =  data.docs.map(doc => ({
          id: doc.id, 
          ...doc.data()
        }))
        //console.log(arrayData);
        setTareas(arrayData);
      }
      catch(error){
        console.log(error)
      }
    };

    const obtenerDatosAgua = async () => {
      try {
        const db = firebase.firestore()
        const dat = await db.collection('Locaciones').get()
        const arrayDat = dat.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setTar(arrayDat)
      } catch (error) {
        console.log(error)
      }
    }

    obtenerDatos()
    obtenerDatosAgua()

  }, [])

  const agregar = async (e) => {
    e.preventDefault()
    if(!tarea.trim() || !edad.trim()){
      console.log("esta vacio")
      return
    }
    try {
      const db = firebase.firestore()
      const nuevaTarea = {
        Nombre: tarea,
        Edad: edad,
        Fecha: Date.now()
      }
      const data = await db.collection('Tareas').add(nuevaTarea)
      setTarea('')
      setEdad('')
      setTareas([
        ...tareas, 
        {...nuevaTarea, id: data.id}
      ])
    } catch (error) {
      console.log(error)
    }
    console.log(tarea)
  }

  const eliminar = async (id) => {
    try {
      const db = firebase.firestore()
      await db.collection('Tareas').doc(id).delete()

      const arrayFiltrado = tareas.filter(item => item.id !== id)
      setTareas(arrayFiltrado)
    } catch (error) {
      console.log(error)
    }
  }

  const activarEdicion = (item) => {
    console.log("ok")
    setModoEdicion(true)
    setTarea(item.Nombre)
    setEdad(item.Edad)
    setId(item.id)
  }

  const editar = async (e) => {
    e.preventDefault()
    if(!tarea.trim() || !edad.trim()){
      console.log("vacio")
      return
    }
    try {
      const db = firebase.firestore()
      await db.collection("Tareas").doc(id).update({
        Nombre: tarea,
        Edad: edad
      })
      const arrayEditado = tareas.map(item => (
        item.id === id ? {id: item.id, Fecha: item.Fecha, Nombre: tarea, Edad: edad} : item
      ))
      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setEdad('')
      setId('')

    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div className="container-fluid mt-8">
    <hr/>
    <h3 className="font-weight-light">Registro de medidor de calidad del agua</h3>
    <hr/>
    <div className="row">
      <div className="col-md-8">
        <table className="table table-responsive">
        <thead>
                  <tr className="">
                    <th className="text-left ">Región</th>
                    <th className="text-left ">Comuna</th>
                    <th className="text-left ">Dirección</th>
                    <th className="text-left ">Descripción de la muestra</th>
                    <th className="text-left ">PPM</th>
                    <th className="text-left">Fecha</th>
                  </tr>
                </thead>
          <tbody>
          {
            tar.map(item => (
              <tr className="active" key={item.id}>
                <td>
                  {item.region}   
                </td>
                <td>
                  {item.name}     
                </td>
                <td>
                   {item.adress}  
                </td>
                <td>
                   {item.description}  
                </td>
                <td>
                   {item.ppm}      
                </td>
                  <td>
                    {new Date(item.createAt.seconds * 1000).toLocaleDateString("en-US")}
                  </td>
              </tr>
              
              
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
</div>
  
  );
}

export default App;
