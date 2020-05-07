const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('REST API listening on port ', port);
});

app.get('/', async (req, res) =>  {
    res.json({
        status: 'success',
        data: "se ha conectado satisfactoriamente"
    })
});

// prueba con un añadido a la url 
app.get('/:id', async (req, res) =>  {
    const id = parseInt(req.params.id);
    console.log("entro en el metodo para traer a los usuarios ", {
        req: req,
        res:res
    })
    const user = await getUsers(id);
    res.json({
        status: 'success',
        data: {user:user},
        message: "esta funcionando esta monda"
    })
});

// app.get('/:id', async(req, res) => {
//   const id = parseInt(req.params.id);
//   const dessert = await getDessert(id); //TODO: write getDessert
//   res.json({status:'success', data: {dessert: dessert}});
// });

// app.post('/', async(req, res) => {
//   const id = await createDessertFromDb(req.body); //TODO: write createDessertFromDb
//   const dessert = await getDessert(id);
//   res.json({status: 'success', data: {dessert: dessert}});
// });

// function createDessertFromDb(fields) {
//   return new Promise(function(resolve, reject) {
//     const sql = 'INSERT INTO desserts SET ?';
//     getDbPool().query(sql, fields, (err, results) => {
//       resolve(results.insertId);
//     });
//   });
// }

let user = "mesasdb";
let password = "mesasdb123";
let database = "mesas_interactivas";
let const_name = "mesas-interactivas:southamerica-east1:bd-mesas-interactivas";
let cachedDbPool;
function getDbPool() {
  if(!cachedDbPool) {
      console.log("entro en el metodo que debe de conectar con la base de datos")
    cachedDbPool = mysql.createPool({
      connectionLimit: 1,
    //   user:process.env.SQL_USER,
    //   password:process.env.SQL_PASSWORD,
    //   database:process.env.SQL_NAME,
    //   socketPath:`/cloudsql/${process.env.INST_CON_NAME}`
        
    
        user: user,
        password:password,
        database: database,
        socketPath: const_name
    });

    
  }
  return cachedDbPool;
}

async function getUsers(id) {
    console.log("entro en el metodo que trae los datos de los usuarios");
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM usuario WHERE id_usuario=?'
    getDbPool().query(sql,[id],(err, results) => {
        resolve(results);
        console.log("datos que se deben de estar mostrando ahora,", results);
    });
  });
}