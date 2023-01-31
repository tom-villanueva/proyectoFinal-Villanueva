// Simulación de notas de alumno

class Alumno {
  constructor(nombre, notas = []) {
    this.nombre = nombre;
    this.notas = notas;
  }

  /**
   *  Devuelve el promedio de las notas del alumno
   *  */
  promedioNotas() {
    let notasTotal = 0;
    let cantidadNotas = this.notas.length;
    
    notasTotal = this.notas.reduce(
      (acumulador, nota) => acumulador + nota,
      notasTotal
    );

    // for (let i = 0; i < cantidadNotas; i++) {
    //   notasTotal += this.notas[i];
    // }

    return notasTotal / cantidadNotas;
  }

}

/**
 * Pregunta por prompt una nota que tiene que ser mayor que 1 y menor que 10
 * y distinta de 0
 * */
function getNota(idNota) {
  let nota;

  do {
    nota = parseFloat(prompt(`Ingrese nota para parcial N° ${idNota + 1} (mínimo 1 | máximo 10)`));
  } while (nota === 0 || isNaN(nota) || nota < 1 || nota > 10);

  return nota;
}

/**
 * Pregunta por prompt el nombre del alumno
 * */
function getNombreAlumno() {
  let nombre;

  do {
    nombre = prompt("Ingrese nombre de alumno", "");
  } while (nombre === "" || nombre === null);

  return nombre;
}

/**
 * Recibe el promedio e indica si está aprobado o no
 */
function aprobado(promedio) {
  return promedio >= 6;
}

/**
 * Recibe el promedio e indica si está promocionado o no
 */
 function promocionado(promedio) {
  return promedio >= 8;
}

function logAlumnos(arrayAlumnos) {
  for(const alumno of arrayAlumnos) {
    console.log(`${alumno.nombre} ${alumno.promedio}`);
  }
}

/*********************************************/
/*             Procesamiento                 */
/******************************************* */
// Variables
let cantidadParciales;
let cantidadAlumnos;
let alumnos = [];
let notas = [];
let promedio;
let nombreAlumno;

// Pregunto la cantidad de alumnos a cargar
do {
  cantidadAlumnos = parseInt(
    prompt("Ingrese cantidad de Alumnos a ingresar")
  );
} while (cantidadAlumnos === 0 || isNaN(cantidadAlumnos));

// Pregunto por la cantidad de parciales a cargar en esta cursada
do {
  cantidadParciales = parseInt(
    prompt("Ingrese cantidad de Parciales (mínimo 2 | máximo 4)")
  );
} while (cantidadParciales === 0 || isNaN(cantidadParciales) || cantidadParciales < 2 || cantidadParciales > 4);


for(let i = 0; i < cantidadAlumnos; i++) {
  notas = [];

  // Cargo nombre del alumno
  nombreAlumno = getNombreAlumno();

  // Cargo las notas
  for (let i = 0; i < cantidadParciales; i++) {
    notas.push(getNota(i));
  }

  alumnos.push(new Alumno(nombreAlumno, notas));
}

// Creo un nuevo array de alumnos con sus promedio para después filtrarlos
const promediosAlumnos = alumnos.map((alumno) => {
  return {
    ...alumno,
    promedio: alumno.promedioNotas(),
  }
});

const alumnosAprobados = promediosAlumnos.filter((alumno) => aprobado(alumno.promedio));
const alumnosDesaprobados = promediosAlumnos.filter((alumno) => !aprobado(alumno.promedio));
const alumnosPromocionados = promediosAlumnos.filter((alumno) => promocionado(alumno.promedio));

console.log("Alumnos aprobados | promedio")
logAlumnos(alumnosAprobados);

console.log("Alumnos promocionados | promedio")
logAlumnos(alumnosPromocionados);

console.log("Alumnos Desaprobados | promedio")
logAlumnos(alumnosDesaprobados);
