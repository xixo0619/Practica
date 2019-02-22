var express = require("express"); //Importar el framework express
var app = express(); //Inicializar la aplicacion con express
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');

var credenciales = {
    user:"root",
    password:"",
    port:"3306",
    host:"localhost",
    database:"master_code"
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use(express.static("public")); //Publicar un directorio de archivos estaticos


//Enrutadores de la pagina
//Ruta para registrar usuarios
app.post("/crear-usuario", function (request, response) {
    var conexion = mysql.createConnection(credenciales);
    var sql = 'INSERT INTO usuario(nombre,apellido,nombre_usuario, correo, contrasena) VALUES (?,?,?,?,SHA1(?))';
    
    conexion.query(
        sql,
        [request.body.nombre, request.body.apellido,request.body.usuario,request.body.correo, request.body.contrasena,],
        function(err, result){
            if (err) throw err;
            response.send(result);
        }
    );
});
 
//Ruta para agregar archivo
app.post("/agregar-archivo",function (req,res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = "INSERT INTO archivo (nombre_archivo) VALUES (?)";
    conexion.query(
        sql,
        [req.body.nombre_archivo,],
        function (err,result) {
            if(err) throw err;
            res.send(result);
            
        }
    );    
});

//Ruta para agregar carpetas 
app.post("/agregar-carpeta", function (req,res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = "INSERT INTO carpeta (nombre_carpeta,id_usuario) values (?,?)";
    conexion.query(sql,[req.body.nombre_carpeta, req.session.id_usuario],
        function (err,data,fields) {
            if(err) throw err;
            res.send(data);
            res.end();
        });    
})

//RUTAS PARA LAS ACTUALIZACIONES 

//Ruta para actualizar el nombre
app.get("/actualizar-nombre", function (req,res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = "UPDATE usuario SET nombre_usuario = ? WHERE id_usuario = ?";
    conexion.query(sql, [req.query.nombre_usuario,req.session.id_usuario],
        function (err,data,fields) {
            if (err) throw err,
            res.send(data);
            res.end(); 
        }); 
});

//Ruta para actualizar plan
app.post("/actualizar-plan", function (req,res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = "UPDATE usuario SET id_tipo_plan = ? WHERE id_usuario=?";
    conexion.query(sql,[req.body.id_planes,req.session.id_usuario],
        function (err,data,fields) {
            if (err) throw err,
            res.send(data);
            res.end();
        });   
});

//Ruta para actualizar la imagen
app.get("/actualizar-imagen", function (req,res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = "UPDATE usuario SET imagen_url = ? WHERE id_usuario = ?";
    conexion.query(sql,[req.query.imagen_url, req.session.id_usuario],
        function (err,data , fields) {
            if(err) throw err,
            res.send(data),
            res.end();
        })

})


//Ruta para hacer login
app.post("/login", function (req,res) {
    var conexion = mysql.createConnection(credenciales);
    var sql = "SELECT id_usuario, correo, nombre_usuario  FROM usuario WHERE nombre_usuario=? and contrasena=?;";

    conexion.query(
        sql,
    [request.body.usuario, request.body.contrasena],
    function (err, data, fields) {
        if (data.length > 0) {
            request.session.id_usuario = data[0].id_usuario;
            request.session.correo = data[0].correo;
            request.session.nombre_usuario = data[0].nombre_usuario;
            data[0].estatus = 0;
            response.send(data[0]);
        }else{
            response.send({estatus:1, mensaje: "Login fallido"}); 
        }
      }
    );    
});

//Ruta para hacer logout
app.post("/logout", function (request, response) {
    request.session.destroy();
    response.send({isSession: false});    
});

 
app.listen(8001,function(){
    console.log("Servidor iniciado");
});//Levantar el servidor y escuchar en el puerto indicado 