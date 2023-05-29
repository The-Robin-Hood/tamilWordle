import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getTamilWords() {
    const getTamilWords = await prisma.words.findUnique({
        where: {
            id: "1",
        },
        select: {
            wordlist: true,
        }
    }
    );
    return getTamilWords.wordlist;
}

async function saveTamilWord(word) {
    const countLetters = word.match(/[\u0b80-\u0bff][\u0bbe-\u0bcd\u0bd7]?/gi).length;
    if (countLetters != 4) return;
    const existingWords = await getTamilWords();
    if (existingWords.includes(word)) return;
    await prisma.words.update({
        where: {
            id: "1",
        },
        data: {
            wordlist: [...existingWords, word]
        },
    });
    return;
}

async function checkInternetWordIsValid(word) {
    try {
        const resp = await fetch(`https://iapi.glosbe.com/iapi3/wordlist?l1=ta&l2=en&q=${word}&after=1`);
        const data = await resp.json(); // Expected output structure : { after: [ { phrase: 'கன்னம்' } ], success: true }
        const phrase = data.after[0].phrase;
        if (phrase.split(" ").includes(word)) {
            saveTamilWord(word);
            return true;
        }
        return false;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

export { getTamilWords, saveTamilWord, checkInternetWordIsValid };