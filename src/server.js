import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const dbPromise = open({
  filename: "./data/db.sqlite",
  driver: sqlite3.Database,
});

app.get("/users", async (req, res) => {
  const db = await dbPromise;
  const result = await db.all("select * from users");
  res.json(result);
});

app.post("/user", async (req, res) => {
  const db = await dbPromise;
  const { username, email } = req.body;
  const result = await db.run(
    `
    INSERT INTO users (username, email)
    VALUES (?, ?)
  `,
    [username, email]
  );

  res.status(201).redirect("/users");
});

app.listen(2828, () => console.log("server is runnning"));

async function createUserTable() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `);
}

await createUserTable();
