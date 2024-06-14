import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize, Model, DataTypes } from 'sequelize';
import { config } from 'dotenv';

const app = express();
const port = 3000;

config();
const filename = process.env.FILENAME
console.log(filename)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: filename
});

class Book extends Model { }
Book.init({
    autor: DataTypes.STRING,
    isbn: DataTypes.STRING,
    editorial: DataTypes.STRING,
    paginas: DataTypes.STRING
}, { sequelize, modelName: 'book' });

sequelize.sync();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/book', async (req, res) => {
    const book = await Book.findAll();
    res.json(book);
});

app.get('/book/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.json(book);
});

app.post('/book', async (req, res) => {
    const book = await Book.create(req.body);
    res.json(book);
});

app.put('/book/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        await book.update(req.body);
        res.json(book);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.delete('/book/:id', async (req, res) => {
    const user = await Book.findByPk(req.params.id);
    if (book) {
        await book.destroy();
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});