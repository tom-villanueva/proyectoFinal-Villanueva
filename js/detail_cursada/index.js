const calcularPromedio = (notas) => {
  if (notas.length === 0) {
    return 0;
  }

  let notasTotal = 0;
  let cantidadNotas = notas.length;

  notas.forEach((nota) => {
    const key = Object.keys(nota)[0];
    notasTotal += nota[key];
  });

  return notasTotal / cantidadNotas;
};

/**
 * Valida si las notas son números válidos y si son, actualiza las notas del alumno
 * @param {Student} alumno
 * @param {number} exams
 * @returns
 */
const onSubmitNotasAlumno = (alumno, exams) => {
  let notas = [];

  // Busca los inputs de notas que tengan valor, y si es válido lo guarda
  for (let i = 0; i < exams; i++) {
    const inputNota = document.getElementById(`nota-${i}`);

    if (
      inputNota.value.trim() !== "" &&
      (inputNota.value <= 0 || inputNota.value > 10)
    ) {
      inputNota.value = "";

      toastError("Las notas tienen que ser de 1 a 10");

      return;
    }

    if (inputNota.value.trim() !== "") {
      notas.push({
        [i]: Number(inputNota.value),
      });
    }
  }

  const cursadas = loadLocalStorage("cursadas");
  const cursadaId = loadSessionStorage("cursadaId");

  const cursada = cursadas.find((cursada) => cursada.id === cursadaId);
  const cursadaIndex = cursadas.findIndex(
    (cursada) => cursada.id === cursadaId
  );
  const alumnos = cursada.students;
  const alumnoIndex = alumnos.findIndex((al) => al.id === alumno.id);

  alumnos[alumnoIndex].grades = notas;

  cursada.students = alumnos;

  cursadas[cursadaIndex] = cursada;

  saveLocalStorage("cursadas", cursadas);

  toastSuccess("Notas guardadas con éxito");

  renderAlumnosCursadas();
};

const renderDetalleAlumno = (alumno, exams) => {
  const detailAlumnoNode = document.getElementById("detailAlumno");
  detailAlumnoNode.innerHTML = "";

  const gender = alumno.gender === "Mujer" ? "women" : "men";

  const outerDiv = document.createElement("div");
  outerDiv.className = "card d-flex align-items-center";
  outerDiv.innerHTML = `<img class="mt-2 rounded-circle" src="https://randomuser.me/api/portraits/${gender}/${alumno.id}.jpg" alt="student-image" width="128px" heigth="128px"/>`;

  const innerDiv = document.createElement("div");
  innerDiv.className = "card-body";
  innerDiv.innerHTML = `<ul class="list-group list-group-flush">
                          <li class="list-group-item d-flex justify-content-between align-items-center"><b>Nombre:</b> ${alumno.first_name} ${alumno.last_name}</li>
                          <li class="list-group-item d-flex justify-content-between align-items-center"><b>Email:</b> ${alumno.email}</li>
                          <li class="list-group-item d-flex justify-content-between align-items-center"><b>Género:</b> ${alumno.gender}</li>
                        </ul>`;

  // Inicio de la creación del formulario de notas
  const examsForm = document.createElement("form");
  examsForm.noValidate = true;

  for (let i = 0; i < exams; i++) {
    const formDiv = document.createElement("div");
    formDiv.className = "mb-3";

    formDiv.innerHTML = `<label for="nota-${i}" class="col-form-label">Nota ${
      i + 1
    }:</label>`;

    const input = document.createElement("input");
    input.className = "form-control";
    input.id = `nota-${i}`;
    input.type = "number";

    formDiv.appendChild(input);

    examsForm.appendChild(formDiv);
  }

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.className = "btn btn-primaryMine";
  submitBtn.innerText = "Guardar";

  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    onSubmitNotasAlumno(alumno, exams);
  });

  examsForm.appendChild(submitBtn);
  // Fin creación del formulario

  innerDiv.appendChild(examsForm);
  outerDiv.appendChild(innerDiv);

  detailAlumnoNode.appendChild(outerDiv);

  // Para cada nota cargada del alumno, la pongo en el value del input
  alumno.grades.forEach((nota) => {
    const key = Object.keys(nota)[0];
    const input = document.getElementById(`nota-${key}`);

    if (input) {
      input.value = nota[key];
    }
  });
};

const renderAlumnosCursadas = () => {
  const cursadas = loadLocalStorage("cursadas");
  const cursadaId = loadSessionStorage("cursadaId");
  const alumnoId = loadSessionStorage("alumnoId");

  const cursada = cursadas.find((cursada) => cursada.id === cursadaId);
  const alumnos = cursada.students;

  const alumnosNode = document.getElementById("alumnos-list");
  alumnosNode.innerHTML = "";

  let listHTML = "";

  alumnos.forEach((alumno) => {
    let listItem = document.createElement("a");
    listItem.id = `list-item-${alumno.id}`;
    listItem.href = "#";
    listItem.className =
      "list-group-item d-flex justify-content-between align-items-center";

    listHTML = `${alumno.first_name} ${alumno.last_name}
                <div class="d-flex">
                  <span class="badge bg-primaryMine rounded-pill">${calcularPromedio(
                    alumno.grades
                  ).toFixed(2)}</span>
                </div>
               `;

    if (alumno.id === alumnoId) {
      listItem.classList.add("active");
    }

    listItem.innerHTML = listHTML;

    listItem.onclick = () => {
      const currentActiveLi = document.querySelector(".list-group-item.active");
      currentActiveLi?.classList.remove("active");
      document.getElementById(`list-item-${alumno.id}`).classList.add("active");

      saveSessionStorage(`alumnoId`, alumno.id);
      renderDetalleAlumno(alumno, cursada.exams);
    };

    alumnosNode.appendChild(listItem);
  });
};

const renderTitle = () => {
  const cursadas = loadLocalStorage("cursadas");
  const cursadaId = loadSessionStorage("cursadaId");
  const cursada = cursadas.find((cursada) => cursada.id === cursadaId);

  document.getElementById(
    "titleCursadas"
  ).innerText = `Detalle Cursada: ${cursada.name}`;
};

renderSelectOptions = () => {
  const cursadas = loadLocalStorage("cursadas");
  const allAlumnos = loadLocalStorage("alumnos");
  const cursadaId = loadSessionStorage("cursadaId");

  const cursada = cursadas.find((cursada) => cursada.id === cursadaId);

  const alumnos = cursada.students;

  // Solo muestro los alumnos que NO están inscriptos en esta cursada
  const diferencia = allAlumnos.filter(
    (alumno) => !alumnos.find((al) => al.id === alumno.id)
  );

  const selectAlumnos = document.getElementById("alumnos-select");

  selectAlumnos.innerHTML = `<option value="" selected>Elegir alumno</option>`;

  diferencia.forEach((alumno) => {
    selectAlumnos.innerHTML += `<option value=${alumno.id}>${alumno.first_name} ${alumno.last_name}</option>`;
  });
};

const handleAddAlumno = () => {
  const selectAlumnos = document.getElementById("alumnos-select");
  const selectValue = selectAlumnos.value;

  if (selectValue === "") {
    toastError("Debe seleccionar un alumno del listado");

    return;
  }

  const cursadas = loadLocalStorage("cursadas");
  const allAlumnos = loadLocalStorage("alumnos");
  const cursadaId = loadSessionStorage("cursadaId");

  const cursada = cursadas.find((cursada) => cursada.id === cursadaId);
  const cursadaIndex = cursadas.findIndex(
    (cursada) => cursada.id === cursadaId
  );

  const selectedAlumno = allAlumnos.find(
    (alumno) => alumno.id === Number(selectValue)
  );

  cursada.students.push({
    ...selectedAlumno,
    grades: [],
  });

  cursadas[cursadaIndex] = cursada;

  saveLocalStorage("cursadas", cursadas);

  renderSelectOptions();
  renderAlumnosCursadas();

  toastSuccess("Alumno agregado con éxito");
};

const setAddAlumno = () => {
  const addAlumnoBtn = document.getElementById("addAlumnoBtn");

  addAlumnoBtn.onclick = () => {
    handleAddAlumno();
  };
};

/**
 * Programa principal
 */
saveSessionStorage(`alumnoId`, null);
renderTitle();

setAddAlumno();
renderSelectOptions();
renderAlumnosCursadas();
