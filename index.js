import express from "express";

const index = express();

index.use(express.json());

const PORT = 3000;


index.listen(PORT, function () {
    console.log(`Server is now listening on http://localhost:${PORT}`);
});

index.get("/", async function (req, res){
    res.send("Welcome to your Dungeons and Dragons Character API")
});