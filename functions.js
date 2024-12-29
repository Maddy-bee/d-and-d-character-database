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
  async function writeCharacter(characterData) {
    try {
      await fs.writeFile(characters, JSON.stringify(characterData), "utf8");
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
