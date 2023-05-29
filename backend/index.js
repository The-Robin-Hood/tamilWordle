import express from "express";
import cors from "cors";
import { getTamilWords, saveTamilWord } from "./helper.js";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.get("/", function (req, res) {
    res.json({ Message: "Hello World !!" });
});

app.get("/allwords", async function (req, res) {
    const words = await getTamilWords();
    return res.json({ count: words.length, words: words });
});

app.get("/valid", async function (req, res) {
    const word = req.query.word;

    const getllWords = await getTamilWords();
    if (getllWords.includes(word)) {
        return res.json({ valid: true });
    }
    const check = await checkInternetWordIsValid(word);
    if (check) {
        saveTamilWord(word);
        return res.json({ valid: true });
    }
    return res.json({ valid: false });
});

app.listen(port, function () {
    console.log("Server Started");
});