/**
 * Guarda un objeto en Local Storage con una key
 * @param {string} key 
 * @param {*} object 
 */
const saveLocalStorage = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
}

/**
 * Devuelve un objeto desde Local Storage con una key
 * @param {string} key 
 * @returns JSON válido
 */
const loadLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * Elimina un elemento del Local Storage con una key
 * @param {string} key 
 */
const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
}

/**
 * Guarda un objeto en Local Storage con una key
 * @param {string} key 
 * @param {*} object 
 */
const saveSessionStorage = (key, object) => {
  sessionStorage.setItem(key, JSON.stringify(object));
}

/**
 * Devuelve un objeto desde session Storage con una key
 * @param {string} key 
 * @returns JSON válido
 */
const loadSessionStorage = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
}

/**
 * Elimina un elemento del session Storage con una key
 * @param {string} key 
 */
const removeSessionStorage = (key) => {
  sessionStorage.removeItem(key);
}

// export {saveLocalStorage, loadLocalStorage};