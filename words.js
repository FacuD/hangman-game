// TODO: API Connection
// const getRandomWord = async () => {
//   let url = "https://random-words-api.vercel.app/word";
//   await fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       return data[0].word;
//     })
//     .catch((err) => console.log(err));
// };

// TODO: API Connection V2
// const getRandomWord = async () => {
//   let url = "https://random-words-api.vercel.app/word";
//   await fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       return data[Math.floor(Math.random() * data.length)].word.toUpperCase();
//     })
//     .catch((err) => console.log(err));
// };

const words = ["meat", "hammer", "angry", "lemon"];
