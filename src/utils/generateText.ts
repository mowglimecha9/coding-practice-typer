import words from './words';

export function getRandomWord(wordsToGenerate: number) {
    const wordCollection = [...words]
    const generatedWord = new Array(wordsToGenerate).fill('');
    let i = 0;
    if (wordsToGenerate) {
        while (i < wordsToGenerate) {
            let randomNumber = Math.floor(Math.random() * wordCollection.length);
            generatedWord[i] = wordCollection[randomNumber];
            wordCollection.splice(randomNumber, 1)
            i++;
        }
    } else {
        throw new Error("No number");
        
    }


    return generatedWord.join(' ')
}