const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');  // POR SI TENEMOS PROBLEMAS CON LAS POLITICAS DE LOS NAVEGADORES, HAGO "NPM INSTALL CORS" EN LA TERMINAL DE VISUAL. 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // o la contraseña que tengas configurada
  database: 'proyectoT' // cambia por tu nombre real de base
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

module.exports = connection;


/////// ENDPOINT POST - Registrar datos EJEMPLO-
app.post('/api/clientes', (req, res) => {

  const { nombre, contacto, email, computadora, problema, diagnostico } = req.body;  // ACÁ SE EXTRAEN LOS VALORES DEL CUERPO DEL FORMULARIO.

    // ACÁ SE PIDEN LOS VALORES DE LA CONSULTA SQL PARA REGISTRAR LOS DATOS EN LA BASE DE DATOS. 

  const sql = `INSERT INTO clientes (nombre, contacto, email, computadora, problema, diagnostico)
               VALUES (?, ?, ?, ?, ?, ?)`;

    // ACÁ SE EJECUTA LA CONSULTA SQL QUE ACTIVA EL REGISTRO EN LA BASE DE DATOS.
  connection.query(sql, [nombre, contacto, email, computadora, problema, diagnostico], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al registrar el cliente');
    } else {
      res.status(201).send('Cliente registrado con éxito');
    }
  });
});

// GET - Obtener todos los clientes
app.get('/api/clientes', (req, res) => {
  const sql = 'SELECT * FROM clientes';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener los clientes');
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
