// restauranteService.js

const express = require('express');
const app = express();
const port = process.env.PORT | 8080;

//Agregamos el menú por defecto
let inventario = [
  { id: 1, nombre: "Hamburguesa", cantidad: 3 },
  { id: 2, nombre: "Pizza", cantidad: 1 },
  { id: 3, nombre: "Ensalada", cantidad: 5}
]

//Agregamos a trabajadores 
let trabajadores = [
  { id: 1, nombre: "Juan Alberto Peredo Ramos", puesto: "Chef" },
  { id: 2, nombre: "Berenice Islas Castillo", puesto: "Programador" },
  { id: 3, nombre: "Carlos Tomás Cervantes Alcaraz", puesto: "Mercadologo"}
]

app.use(express.json());

// Rutas relacionadas al inventario de comidas
app.get('/inventario', (req, res) => {//Pasar el listado de todos los trabajadores
  res.status(200).json(inventario);
})

app.get('/inventario/:id', (req, res) => {//Pasar la información de un trabajador
  const producto = inventario.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" })
  res.status(200).json(producto)
})

app.post('/inventario', (req, res) => { //Agrega un nuevo trabajador
  console.log(req.body)
  const nuevoProducto = { id: inventario.length + 1, ...req.body }
  inventario.push(nuevoProducto);
  res.status(201).json(nuevoProducto)
})

app.put('/inventario/:id', (req, res) => { //Actualizar un trabajador
  const producto = inventario.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" })
  
  producto.cantidad = req.body.cantidad
  res.status(200).json(producto)
})

app.delete('/inventario/:id', (req, res) => { //Eliminar a un trabajador
  inventario = inventario.filter(p => p.id !== parseInt(req.params.id))
  res.status(200).json({mensaje: "Producto eliminado"})
})

//Rutas orientadas a trabajadores del restaurante
app.get('/trabajadores', (req, res) => {//Pasar el listado de todos los trabajadores
  res.status(200).json(trabajadores);
})

app.get('/trabajadores/:id', (req, res) => {//Pasar la información de un trabajador
  const trabajador = trabajadores.find(t => t.id === parseInt(req.params.id));
  if (!trabajador) return res.status(404).json({ mensaje: "Trabajador no encontrado" })
  res.status(200).json(trabajador)
})

app.post('/trabajadores', (req, res) => { //Agrega un nuevo trabajador
  const nuevoTrabajador = { id: trabajadores.length + 1, ...req.body }
  trabajadores.push(nuevoTrabajador);
  res.status(201).json(nuevoTrabajador)
})

app.put('/trabajadores/:id', (req, res) => { //Actualizar un trabajador
  const trabajador = trabajadores.find(t => t.id === parseInt(req.params.id));
  if (!trabajador) return res.status(404).json({ mensaje: "Trabajador no encontrado" })
  
  Object.assign(trabajador, req.body)
  res.status(200).json(trabajador)
})

app.delete('/trabajadores/:id', (req, res) => { //Eliminar a un trabajador
  trabajadores = trabajadores.filter(t => t.id !== parseInt(req.params.id))
  res.status(200).json({mensaje: "Trabajador eliminado"})
})



app.listen(port, () => {
    console.log(`Restaurante escuchando en http://localhost:${port}`);
});
