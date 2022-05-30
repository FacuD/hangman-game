const url = "https://random-words-api.vercel.app/word";

async function fetchRandomWord() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data[0].word;
  } catch (error) {
    // If failed to fetch get random word from a predefined list
    console.log(error);
    return getRandomWord();
  }
}

const getRandomWord = () => {
  const words = ["meat", "hammer", "angry", "lemon"];
  const word = words[Math.floor(Math.random() * words.length)];
  return word;
};
