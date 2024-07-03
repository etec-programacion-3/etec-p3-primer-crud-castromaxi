import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { config } from 'dotenv';

const app = express();
const port = 3000;

/**
 * @file Una simple API CRUD para gestionar libros usando Express y Sequelize con SQLite
 * @version 1.0.0
 * @requires express
 * @requires body-parser
 * @requires sequelize
 * @requires dotenv/config
 */

/**
 * Cargar configuración de variables de entorno
 * @external dotenv
 * @function config
 */
config();

/**
 * Nombre del archivo de la base de datos obtenido de las variables de entorno
 * @type {string}
 */
const filename = process.env.FILENAME;
console.log(filename);

/**
 * Inicializar Sequelize con la configuración de la base de datos SQLite
 * @external Sequelize
 * @function Sequelize
 */
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: filename
});

/**
 * Modelo de Book que representa una tabla en la base de datos
 * @class Book
 * @extends Model
 */
class Book extends Model {}

Book.init({
    autor: DataTypes.STRING,
    isbn: DataTypes.STRING,
    editorial: DataTypes.STRING,
    paginas: DataTypes.STRING
}, { sequelize, modelName: 'book' });

/**
 * Sincronizar el modelo Book con la base de datos
 */
sequelize.sync();

/**
 * Middleware para analizar los cuerpos de las solicitudes entrantes como JSON
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Ruta para manejar las solicitudes GET y obtener todos los libros
 * @name GET /book
 * @function
 * @memberof app
 * @inner
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @returns {Promise<void>} Promesa sin valor de retorno
 */
app.get('/book', async (req, res) => {
    const book = await Book.findAll();
    res.json(book);
});

/**
 * Ruta para manejar las solicitudes GET y obtener un libro por su ID
 * @name GET /book/:id
 * @function
 * @memberof app
 * @inner
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 * @returns {Promise<void>} Promesa sin valor de retorno
 */
app.get('/book/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.json(book);
});

/**
 * Ruta para manejar las solicitudes POST y crear un nuevo libro
 * @name POST /book
 * @function
 * @memberof app
 * @inner
 * @param {Object} req.body - Datos del libro que se desea crear
 * @param {Object} res - Objeto de respuesta
 * @returns {Promise<void>} Promesa sin valor de retorno
 */
app.post('/book', async (req, res) => {
    const book = await Book.create(req.body);
    res.json(book);
});

/**
 * Ruta para manejar las solicitudes PUT y actualizar un libro por su ID
 * @name PUT /book/:id
 * @function
 * @memberof app
 * @inner
 * @param {Object} req.params.id - ID del libro que se desea actualizar
 * @param {Object} req.body - Datos actualizados del libro
 * @param {Object} res - Objeto de respuesta
 * @returns {Promise<void>} Promesa sin valor de retorno
 */
app.put('/book/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.update(req.body);
        res.json(book);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

/** 
 * Ruta para manejar las solicitudes DELETE y eliminar un libro por su ID
 * @name DELETE /book/:id
 * @function
 * @memberof app
 * @inner
 * @param {Object} req.params.id - ID del libro que se desea eliminar
 * @param {Object} res - Objeto de respuesta
 * @returns {Promise<void>} Promesa sin valor de retorno
 */
app.delete('/book/:id', async (req, res) => {
    const user = await Book.findByPk(req.params.id);
    if (book) {
        await book.destroy();
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

/**
 * Iniciar el servidor y escuchar en el puerto especificado
 * @function
 * @param {number} port - Número de puerto en el que escuchar
 * @returns {void}
 */
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});