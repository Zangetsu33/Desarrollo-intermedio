const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const cors = require('cors');

const app = express();

// IMPORTANDO ROUTERS
const usersRoutes = require('./routers/userRouter');

// CONFIGURACIONES
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARES
app.use(morgan('dev'));

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Reemplaza con la URL de tu frontend en Nuxt.js
  optionsSuccessStatus: 200 // Algunas versiones de navegador (Safari) requieren 200
};
app.use(cors(corsOptions));

// Conexión a MySQL usando express-myconnection
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'fotosintesis'
}, 'single'));

app.use(express.urlencoded({ extended: false }));

// ARCHIVOS ESTÁTICOS
app.use(express.static('public'));

// RUTAS
app.use('/', usersRoutes);

// INICIANDO EL SERVIDOR
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}!`);
});