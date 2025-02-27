import { promises as fs } from "node:fs";

import characters from "./characters.json" with {type: "json" };

// function to read all the characters from the JSON file. Try and catch statements handle errors 
async function readCharacters() {
    try {
      return characters
    } catch (error) {
      console.error("Error reading file:", error);
      return null;
    }
  }

// const characterData = await fs.readFile(characters, "utf8");
//       return JSON.parse(characterData);


  // function to create a new character and turn it into JSON format. Try and catch statements handle errors 
  async function writeCharacter(characters) {
    try {
      await fs.writeFile("./characters.json", JSON.stringify(characters), "utf8");
      return true;
    } catch (error) {
      console.error("Error writing file:", error);
      return false;
    }
  }

  // function to get all characters 
  export async function getAllCharacters() {
    const characters = await readCharacters();
    return characters;
  }


  export async function getCharacterByName(name){
    const characters = await readCharacters();
    const retrieval = characters.find((character) => character.name === name);
    console.log('Character retrieved:', retrieval);
    return retrieval || { message: "Character not found" };
  }

export async function addNewCharacter(name,
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
  imageLink){
  const newCharacter = {name,
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
  imageLink
  }
  const characters = await readCharacters();
  characters.push(newCharacter);
  await writeCharacter(characters);
  return newCharacter;
  }


  export async function editCharacter(name, updates ) {
    const characters = await readCharacters();
    const character = characters.find((character) => character.name === name);
    if (!character) {
      return null;
    }

    for (const [key, value] of Object.entries(updates)) {
      if (character.hasOwnProperty(key)) {
        character[key] = value;  // Update the character's property
      }
    }
    await writeCharacter(characters);
    return character;
  }

  export async function deleteCharacter(name) {
    const characters = await readCharacters();
    const index = characters.findIndex((character) => character.name === name);
    if (index === -1) {
      return null;
    }
    const deleted = characters.splice(index, 1);
    await writeCharacter(characters);
    return deleted[0];
  }