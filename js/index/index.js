/**
 * Checkea que el valor que se quiere guardar 
 * no está guardado en Local Storage y entonces guarda
 * @param {string} key 
 * @param {any} value 
 */
const checkLocalStorageSave = (key, value) => {
  if(loadLocalStorage(key) === null) {
    saveLocalStorage(key, value);
  }
}

/**
 * Checkea que el valor que se quiere guardar 
 * no está guardado en Session Storage y entonces guarda
 * @param {string} key 
 * @param {any} value 
 */
const checkSessionStorageSave = (key, value) => {
  if(loadSessionStorage(key) === null) {
    saveSessionStorage(key, value);
  }
}

const renderPhrase = (phrase) => {
  const quoteDiv = document.getElementById("quote");
  const authorDiv = document.getElementById("author");

  if(quoteDiv && authorDiv) {
    quoteDiv.innerHTML = phrase.content.trim();
    authorDiv.innerHTML = phrase.author.trim();
  }
}

/**
 * Llamado a la API de frases
 * https://github.com/lukePeavey/quotable#get-random-quote
 */
const fetchPhrase = () => {
  fetch(
    "https://api.quotable.io/random",
  ).then((response) => {
    return response.json();
  }).then((data) => {
    renderPhrase(data);
  }).catch((error) => {
    renderPhrase({
      content: "La duda es uno de los nombres de la inteligencia.",
      author: "Jorge Luis Borges"
    });
  }); 
}

checkLocalStorageSave("cursadas", cursadas);
checkLocalStorageSave("alumnos", alumnos);

checkSessionStorageSave("alumnos-page", 1);
checkSessionStorageSave("alumnos-per-page", 10);

checkSessionStorageSave("cursadas-page", 1);
checkSessionStorageSave("cursadas-per-page", 10);

fetchPhrase();