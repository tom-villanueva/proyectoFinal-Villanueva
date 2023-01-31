/**
 * Valida que el input no sea vacío
 * @param {string} id
 * @returns boolean
 */
const validateInput = (id) => {
  const input = document.getElementById(id);

  if (input.value.trim() === "") {
    document.getElementById(`alert-${id}`).className = "text-danger fs-6";
    input.classList.add("border-danger");
    return false;
  }

  return true;
};

/**
 * En el onchange del input, resetea el mensaje de error
 * @param {string} id
 */
const setResetInput = (id) => {
  const input = document.getElementById(id);

  input.onchange = () => {
    document.getElementById(`alert-${id}`).className = "d-none";
    input.classList.remove("border-danger");
  };
};

/**
 * Setea el focus del input dentro del modal en apertura y quita los mensajes de error en el cierre.
 * https://getbootstrap.com/docs/5.3/components/modal/#how-it-works
 * @param {string} modalId
 * @param {string} inputToFocusId
 */
const setModalInputEvents = (modalId, inputToFocusId) => {
  const myModal = document.getElementById(modalId);
  const myInput = document.getElementById(inputToFocusId);

  myModal.addEventListener("shown.bs.modal", () => {
    myInput.focus();
  });

  myModal.addEventListener("hidden.bs.modal", () => {
    const inputs = document.querySelectorAll(".form-control");

    inputs.forEach((input) => {
      input.value = "";
      document.getElementById(`alert-${input.id}`).className = "d-none";
      input.classList.remove("border-danger");
    });
  });
};

/**
 * Genera un alert del tipo especificado en el placeholder
 * https://getbootstrap.com/docs/5.3/components/alerts/#live-example
 * @param {string} message 
 * @param {string} type 
 * @param {string} alertPlaceholderId 
 */
const alert = (message, type, alertPlaceholderId) => {
  const alertPlaceholder = document.getElementById(alertPlaceholderId);

  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

/**
 * Genera un toast con fondo verde y el texto de parámetro
 * @param {string} text 
 */
const toastSuccess = (text) => {
  Toastify({
    text: `✔️ ${text}`,
    duration: 2000,
    gravity: "top",
    position: "center",
    style: {
      background: "linear-gradient(to right, #7bdf2c, #28900a)",
    },
    offset: {
      x: 50,
      y: 10,
    },
  }).showToast();
}

/**
 * Genera un toast con fondo rojo y el texto de parámetro
 * @param {string} text 
 */
const toastError = (text) => {
  Toastify({
    text: `⚠️ ${text}`,
    duration: 3000,
    gravity: "top",
    position: "center",
    style: {
      background: "linear-gradient(to right, #fc0000, #900a0a)",
    },
    offset: {
      x: 50,
      y: 10,
    },
  }).showToast();
}

/**
 * Renderiza paginación según key y actualiza la vista con el callback del onclick
 * @param {string} key 
 * @param {function} renderCallback 
 */
const renderPagination = (key, renderCallback) => {
  const entities = loadLocalStorage(key);
  const entitiesPerPage = loadSessionStorage(`${key}-per-page`);
  const numPages = Math.ceil(entities.length / entitiesPerPage);

  const paginationNode = document.getElementById(`${key}-pagination`);
  paginationNode.innerHTML = "";

  const entitiesPage = loadSessionStorage(`${key}-page`);

  for(let i = 1; i <= numPages; i++) {
    const pageLi = document.createElement('li');
    pageLi.className = "page-item";
    pageLi.id = `page-${i}`;

    pageLi.innerHTML = `<a class="page-link" href="#">${i}</a>`; 

    if(i === entitiesPage) {
      pageLi.className += " active";
    } 

    pageLi.onclick = () => {
      const currentPageLi = document.querySelector(".page-item.active");
      currentPageLi.classList.remove("active");
      
      saveSessionStorage(`${key}-page`, i);
      document.getElementById(`page-${i}`).classList.add("active");

      renderCallback();
    }

    paginationNode.appendChild(pageLi);
  }
}
