const express = require("express");
const _sequelize = require("sequelize");
const ip = require("ip");

const Sequelize = _sequelize.Sequelize;
const DataTypes = _sequelize.DataTypes;

require('dotenv').config();

const port = process.env.PORT || 8080;;
const pg_host = process.env.POSTGRES_HOST || "localhost";
const pg_user = process.env.POSTGRES_USER || "bit";
const pg_pass = process.env.POSTGRES_PASSWORD || "mysecretpassword";
const pg_db = process.env.POSTGRES_DB || "exemplo";
const msg = process.env.MSG || "Hello world!";

let sequelize;

if (process.env.DB === "sqlite") {
  sequelize = new Sequelize('sqlite::memory');
} else {
  // sequelize =  new Sequelize(`postgres://${pg_user}:${pg_pass}@${pg_host}:5432/${pg_db}`);
  sequelize =  new Sequelize(`postgres://${pg_user}:${pg_pass}@${pg_host}:5432/${pg_db}`);
}

const Notes = sequelize.define('notes', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: DataTypes.STRING,
});

(async () =>{
  try {
    await sequelize.authenticate({logging: false});
    console.log("Connection with database stablished.");
    await sequelize.sync({logging: false});
  } catch (error) {
    console.error('Unable to stablish connection with database.');
    process.exit(1)
  }
})();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.send(msg);
});

app.get('/notes', async (req, res) => {
  let allnotes = await Notes.findAll();
  res.json(allnotes);
});
app.post('/notes', async (req, res) => {
  let { text } = req.body

  const note = await Notes.create({ text: text });
  console.log(`New note added: ${note.text}`);

  res.sendStatus(200);
});

app.get('/notes/:id', async (req, res) => {})
app.delete('/notes/:id', async (req, res) => {})

app.listen( port, () => {
  console.log(`Server running on http://${ip.address()}:${port}`);
});
