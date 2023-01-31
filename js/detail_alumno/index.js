const renderAlumnoDetail = () => {
  const cursadas = loadLocalStorage("cursadas");
  const alumnos = loadLocalStorage("alumnos");
  const alumnoId = loadSessionStorage("alumnoId");

  const alumno = alumnos.find((alumno) => alumno.id === Number(alumnoId));
  const gender = alumno.gender === "Mujer" ? "women" : "men";

  const image = document.getElementById("studentImage");
  image.src = `https://randomuser.me/api/portraits/${gender}/${alumno.id}.jpg`;

  document.getElementById("cardTitle").innerText = `${alumno.first_name} ${alumno.last_name}`;
  document.getElementById("alumnoEmail").innerText = alumno.email;
  document.getElementById("alumnoGender").innerText = alumno.gender;

  const inscriptoList = document.getElementById("cursadas");

  const cursadasInscripto = cursadas.filter((cursada) =>
    cursada.students.some((alumno) => alumno.id === Number(alumnoId))
  );

  cursadasInscripto.forEach((cursada) => {
    let listItem = document.createElement("li");
    listItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    listItem.innerText = cursada.name;

    inscriptoList.appendChild(listItem);
  });
};

renderAlumnoDetail();
