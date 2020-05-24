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
app.use(api);


app.get('/', async (req, res) => {
    res.json({
        status: 'success',
        data: "se ha conectado satisfactoriamente"
    })
});

// para hacer rutas hay que utilizar la variable api 
api.get('/users', async (req, res) => {
    console.log("entro en metodo de los usuarios");
    const user = await GetUser();
    res.json({
        status: "success",
        data: user,
        message: "esta nonda esta funcionando"
    })
});




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
            // socketPath: `/cloudsql/${process.env.INST_CON_NAME}`,
            // socketPath: `/cloudsql/mesas-interactivas:southamerica-east1:bd-mesas-interactivas`,
            

            // esto nada mas se descomenta cuando se estan haciendo pruebas locales
            host: "34.95.157.90",
            user: "mesasdb",
            password: "mesasdb123",
            database: 'mesas_interactivas'
        });


    }
    return cachedDbPool;
}

// funcion que se encarga de traer a todos los usuarios;
async function GetUser(req, res) {

    console.log("entron en el metodo de GetrUser");
    // Devolvemos una respuesta en JSON
    return new Promise(function (resolve, reject) {
        getDbPool().query("SELECT * FROM  usuario", function (err, result) {
            if (err) resolve(err);
            resolve(result);
            console.log("datos que se deben de estar mostrando ahora,", result);
        });

    })
}

