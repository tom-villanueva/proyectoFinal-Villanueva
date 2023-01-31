// Funciones render
const renderAlumnos = () => {
  const alumnos = loadLocalStorage("alumnos");
  const alumnosPerPage = loadSessionStorage("alumnos-per-page");
  const alumnosPage = loadSessionStorage("alumnos-page");

  const alumnosNode = document.getElementById("alumnos");
  alumnosNode.innerHTML = "";

  // Calculo desde y hasta de paginación
  let alumnosFrom = 0;
  
  if(alumnosPage !== 1) {
    alumnosFrom += alumnosPerPage * (alumnosPage - 1);
  }

  const paginatedAlumnos = alumnos.slice(alumnosFrom, alumnosFrom + alumnosPerPage);

  let listHTML = "";

  paginatedAlumnos.forEach((alumno) => {
    let listItem = document.createElement("a");

    listItem.href = "./detail_alumno.html";
    listItem.className =
      "list-group-item d-flex justify-content-between align-items-center";

    listHTML = `${alumno.first_name} ${alumno.last_name}
                <div class="d-flex">
                  <span class="badge bg-secondaryMine rounded-pill">${alumno.gender}</span>
                </div>
               `;

    listItem.innerHTML = listHTML;

    listItem.onclick = () => {
      saveSessionStorage("alumnoId", alumno.id);
    };

    alumnosNode.appendChild(listItem);
  });
};

const onSubmitAddAlumno = (event) => {
  event.preventDefault();

  if (
    !validateInput("alumno-firstName") ||
    !validateInput("alumno-lastName") ||
    !validateInput("alumno-email")
  ) {
    return;
  }

  const alumnoFirstNameInput = document.getElementById("alumno-firstName");
  const alumnoLastNameInput = document.getElementById("alumno-lastName");
  const alumnoEmailInput = document.getElementById("alumno-email");
  const alumnoGenderInput = document.getElementById("alumno-gender");

  const alumnos = loadLocalStorage("alumnos");

  const newAlumno = new Student(
    alumnos.length + 1,
    alumnoFirstNameInput.value,
    alumnoLastNameInput.value,
    alumnoEmailInput.value,
    alumnoGenderInput.value
  );

  alumnos.push(newAlumno);

  saveLocalStorage("alumnos", alumnos);

  // Cierro el modal
  const alumnoModal = document.getElementById('addAlumnoModal');
  const modal = bootstrap.Modal.getInstance(alumnoModal);
  modal.hide();

  toastSuccess("Alumno agregado con éxito");
  
  renderAlumnos();
  renderPagination("alumnos", renderAlumnos);
};

const setEventSubmit = () => {
  const form = document.getElementById("addAlumnoForm");

  form.addEventListener('submit', onSubmitAddAlumno);
}

/**
 * Programa principal
 */

renderAlumnos();
renderPagination("alumnos", renderAlumnos);

setEventSubmit();

setModalInputEvents('addAlumnoModal', 'alumno-firstName');

setResetInput("alumno-firstName");
setResetInput("alumno-lastName");
setResetInput("alumno-email");
