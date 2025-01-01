import express from "express";

const index = express();

index.use(express.json());

const PORT = 3000;

import {
    getAllCharacters,
    getCharacterByName,
    addNewCharacter,
    editCharacter,
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

  index.post("/characters", async function (req, res){
    const {name,
        characterClass,
        subClass,
        species,
        subSpecies,
        primaryAbility,
        hitPointDie,
        strengthSave,
        dexteritySave,
        constitutionSave,
        intelligenceSave,
        wisdomSave,
        charismaSave,
        background,
        backstory,
        startingEquipment,
        imageLink}= req.body;
    const character = await addNewCharacter(name,
        characterClass,
        subClass,
        species,
        subSpecies,
        primaryAbility,
        hitPointDie,
        strengthSave,
        dexteritySave,
        constitutionSave,
        intelligenceSave,
        wisdomSave,
        charismaSave,
        background,
        backstory,
        startingEquipment,
        imageLink);
    res.json(character);
  })

  index.patch("/characters/:name", async function (req, res) {
    const { name } = req.body;
    const updates = req.body;
    const character = await editCharacter(name, updates);
    if (!character) {
      res.status(404).send("Quote not found");
      return;
    }
    res.json(character);
  });