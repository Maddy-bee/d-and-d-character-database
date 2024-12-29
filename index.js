import express from "express";

const index = express();

index.use(express.json());

const PORT = 3000;

import {
    getAllCharacters,
    getCharacterByName,
} from "./functions.js";


index.listen(PORT, function () {
    console.log(`Server is now listening on http://localhost:${PORT}`);
});

index.get("/", async function (req, res){
    res.send("Welcome to your Dungeons and Dragons Character API")
});

index.get("/characters", async function (req, res) {
    const allCharacters = await getAllCharacters(); 
    res.json(allCharacters); 
});

index.get("/characters/:name", async function (req, res){
    const {name} = req.params;
    console.log(name);
    const character = await getCharacterByName(name);
    res.json(character);
  } )