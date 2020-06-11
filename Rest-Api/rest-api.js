const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
var api = express.Router();


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('REST API listening on port ', port);
});

app.get('/', async (req, res) => {
    res.json({
        status: 'success',
        data: "se ha conectado satisfactoriamente"
    })
});

// se trae el usuario por su id 
api.get('/user/:correo/:password', async (req, res) => { 
    let parametros ={
        correo:req.params.correo,
        contraseña: req.params.password
    }   
    const user = await GetUser(parametros);
    console.log("datos de que esta mostrando el usuario ",req.params.id);
    res.json({
        status: "success",
        data: user,
        message: "esta nonda esta funcionando"
    })
});

// esto es para definir las rutas de la api 
app.use(api);


// funcion que se encarga de hacer conexión con la base de datos
let cachedDbPool;
function getDbPool() {
    if (!cachedDbPool) {
        console.log("entro en el metodo que debe de conectar con la base de datos")
        cachedDbPool = mysql.createPool({
            // nada mas se puede descomentar cuando se va subir a google cloud
            // (cuando se suba hay que montar una nueva imagen que contenga los nuevos cambios)
            // connectionLimit: 1,
            // user: process.env.SQL_USER,
            // password: process.env.SQL_PASSWORD,
            // database: process.env.SQL_NAME,
            // socketPath: `/cloudsql/${process.env.INST_CON_NAME}`


            // esto nada mas se descomenta cuando se estan haciendo pruebas locales
            host: "34.95.157.90",
            user: "mesasdb",
            password: "mesasdb123",
            database: 'mesas_interactivas'
        });


    }
    return cachedDbPool;
}

// funcion que se encarga de traer a a un usuario en especifico;
async function GetUser(req, res) {

    console.log("entron en el metodo de GetrUser");
    // Devolvemos una respuesta en JSON
    return new Promise(function (resolve, reject) {
        getDbPool().query("SELECT * FROM usuario WHERE correo= '"+req.correo+"' AND password = '"+req.contraseña+"'", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });

    })
}

