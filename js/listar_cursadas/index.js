// Funciones render
const renderCursadas = () => {
  const cursadas = loadLocalStorage("cursadas");
  const cursadasPerPage = loadSessionStorage("cursadas-per-page");
  const cursadasPage = loadSessionStorage("cursadas-page");

  const cursadasNode = document.getElementById("cursadas");
  cursadasNode.innerHTML = "";

  // Calculo desde y hasta de paginación
  let cursadasFrom = 0;
  
  if(cursadasPage !== 1) {
    cursadasFrom += cursadasPerPage * (cursadasPage - 1);
  }

  const paginatedCursadas = cursadas.slice(cursadasFrom, cursadasFrom + cursadasPerPage);

  let listHTML = "";

  paginatedCursadas.forEach(cursada => {

    let listItem = document.createElement("a");

    listItem.href = "./detail_cursada.html";
    listItem.className = "list-group-item d-flex justify-content-between align-items-center";
    
    listHTML = `${cursada.name}
                <div class="d-flex">
                  <span class="badge bg-secondaryMine rounded-pill">${cursada.exams} exámenes</span>
                  <span class="badge bg-primaryMine rounded-pill">${cursada.students.length} alumnos</span>
                </div>
               `

    listItem.innerHTML = listHTML;

    listItem.onclick = () => {
      saveSessionStorage("cursadaId", cursada.id);
    };

    cursadasNode.appendChild(listItem);
  });
}

const onSubmitAddCursada = (event) => {
  event.preventDefault();
  const inputNota = document.getElementById("cursada-exams");

  if(!validateInput("cursada-name") || !validateInput("cursada-exams")) {
    return;
  }

  if (
    inputNota.value.trim() !== "" &&
    (inputNota.value <= 0 || inputNota.value > 4)
  ) {
    inputNota.value = "";
    toastError("Las exámenes tiene que ser de 1 a 4");

    return;
  }

  const cursadaNameInput = document.getElementById("cursada-name");
  const cursadaExamsInput = document.getElementById("cursada-exams");

  const cursadas = loadLocalStorage("cursadas");

  const newCursada = new Cursada(
    cursadas.length + 1,
    cursadaNameInput.value,
    cursadaExamsInput.value
  );
    
  cursadas.push(newCursada);

  saveLocalStorage("cursadas", cursadas);

  // Cierro el modal
  const cursadaModal = document.getElementById('addCursadaModal');
  const modal = bootstrap.Modal.getInstance(cursadaModal);
  modal.hide();

  toastSuccess("Cursada guardada con éxito");

  // Vuelvo a renderizar las cursadas
  renderCursadas();
  renderPagination("cursadas", renderCursadas);
};

const setEventSubmit = () => {
  const form = document.getElementById("addCursadaForm");

  form.addEventListener('submit', onSubmitAddCursada);
}

/**
 * Programa principal
 */

renderCursadas();
renderPagination("cursadas", renderCursadas);

setEventSubmit();

setModalInputEvents('addCursadaModal', 'cursada-name');
setResetInput("cursada-name");
setResetInput("cursada-exams");