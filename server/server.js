const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const dotenv = require("dotenv");
dotenv.config();

const pg = require("pg");
const { Pool } = pg;
const pool = new Pool({connectionString: process.env.DATABASE_URL});
pool.connect();

app.use(express.json());

app.get('/api/discs', (req, res) => {
    pool.query("SELECT * FROM disc").then((result) => {
        res.send(result.rows);
    })
})

app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
})