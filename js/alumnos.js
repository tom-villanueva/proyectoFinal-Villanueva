class Cursada {
  constructor(id, name, exams) {
    this.id = id;
    this.name = name;
    this.exams = exams;
    this.students = [];
  }
}

class Student {
  constructor(id, first_name, last_name, email, gender) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.gender = gender;
    this.grades = [];
  }
}

// api/cursadas?include=alumnos,alumnos.notas
const cursadas = [
  {
    id: 1,
    name: "Programación Orientada a objetos",
    exams: 2,
    students: [
      {
        id: 1,
        first_name: "Keven",
        last_name: "Erbain",
        email: "kerbain0@dion.ne.jp",
        gender: "Hombre",
        grades: [{0:10}, {1:5}],
      },
      {
        id: 2,
        first_name: "Rutherford",
        last_name: "Widocks",
        email: "rwidocks1@bbc.co.uk",
        gender: "Hombre",
        grades: [],
      },
      {
        id: 3,
        first_name: "Cherin",
        last_name: "Greenhalgh",
        email: "cgreenhalgh2@forbes.com",
        gender: "Mujer",
        grades: [],
      },
      {
        id: 4,
        first_name: "Shina",
        last_name: "Jory",
        email: "sjory3@weather.com",
        gender: "Mujer",
        grades: [],
      },
      {
        id: 5,
        first_name: "Alphard",
        last_name: "Craigs",
        email: "acraigs4@simplemachines.org",
        gender: "Hombre",
        grades: [],
      },
      {
        id: 6,
        first_name: "Anthe",
        last_name: "Kuhle",
        email: "akuhle5@cam.ac.uk",
        gender: "Mujer",
        grades: [],
      },
      {
        id: 7,
        first_name: "Cherianne",
        last_name: "Broe",
        email: "cbroe6@123-reg.co.uk",
        gender: "Mujer",
        grades: [],
      },
      {
        id: 8,
        first_name: "Jessa",
        last_name: "Greiser",
        email: "jgreiser7@howstuffworks.com",
        gender: "Mujer",
        grades: [],
      },
      {
        id: 9,
        first_name: "Jude",
        last_name: "Dunkerly",
        email: "jdunkerly8@ehow.com",
        gender: "Hombre",
        grades: [],
      },
      {
        id: 10,
        first_name: "Stacy",
        last_name: "Thiolier",
        email: "sthiolier9@phoca.cz",
        gender: "Hombre",
        grades: [],
      },
    ],
  },
  {
    id: 2,
    name: "Introducción a algorítmica II",
    exams: 3,
    students: [
      {
        id: 11,
        first_name: "Frederich",
        last_name: "Furman",
        email: "ffurman0@nba.com",
        gender: "Hombre",
        grades: [],
      },
      {
        id: 12,
        first_name: "Riordan",
        last_name: "Crayden",
        email: "rcrayden1@usnews.com",
        gender: "Hombre",
        grades: [],
      },
      {
        id: 13,
        first_name: "Idalia",
        last_name: "Hardison",
        email: "ihardison2@live.com",
        gender: "Mujer",
        grades: [],
      },
      {
        id: 14,
        first_name: "Felic",
        last_name: "Hofton",
        email: "fhofton3@reference.com",
        gender: "Hombre",
        grades: [],
      },
      {
        id: 15,
        first_name: "Imelda",
        last_name: "Alesi",
        email: "ialesi4@cdc.gov",
        gender: "Mujer",
        grades: [],
      },
      {
        id: 16,
        first_name: "Merrily",
        last_name: "Giacoboni",
        email: "mgiacoboni5@google.cn",
        gender: "Mujer",
        grades: [],
      },
      {
        id: 17,
        first_name: "Garald",
        last_name: "Clubley",
        email: "gclubley6@weebly.com",
        gender: "Hombre",
        grades: [],
      },
      {
        id: 18,
        first_name: "Bibi",
        last_name: "Izkovici",
        email: "bizkovici7@va.gov",
        gender: "Mujer",
        grades: [],
      },
      {
        id: 19,
        first_name: "Codie",
        last_name: "Harflete",
        email: "charflete8@elegantthemes.com",
        gender: "Mujer",
        grades: [],
      },
      {
        id: 20,
        first_name: "Giacobo",
        last_name: "Kitt",
        email: "gkitt9@about.com",
        gender: "Hombre",
        grades: [],
      },
    ],
  },
];

const alumnos = [
  {
    id: 1,
    first_name: "Keven",
    last_name: "Erbain",
    email: "kerbain0@dion.ne.jp",
    gender: "Hombre",
  },
  {
    id: 2,
    first_name: "Rutherford",
    last_name: "Widocks",
    email: "rwidocks1@bbc.co.uk",
    gender: "Hombre",
  },
  {
    id: 3,
    first_name: "Cherin",
    last_name: "Greenhalgh",
    email: "cgreenhalgh2@forbes.com",
    gender: "Mujer",
  },
  {
    id: 4,
    first_name: "Shina",
    last_name: "Jory",
    email: "sjory3@weather.com",
    gender: "Mujer",
  },
  {
    id: 5,
    first_name: "Alphard",
    last_name: "Craigs",
    email: "acraigs4@simplemachines.org",
    gender: "Hombre",
  },
  {
    id: 6,
    first_name: "Anthe",
    last_name: "Kuhle",
    email: "akuhle5@cam.ac.uk",
    gender: "Mujer",
  },
  {
    id: 7,
    first_name: "Cherianne",
    last_name: "Broe",
    email: "cbroe6@123-reg.co.uk",
    gender: "Mujer",
  },
  {
    id: 8,
    first_name: "Jessa",
    last_name: "Greiser",
    email: "jgreiser7@howstuffworks.com",
    gender: "Mujer",
  },
  {
    id: 9,
    first_name: "Jude",
    last_name: "Dunkerly",
    email: "jdunkerly8@ehow.com",
    gender: "Hombre",
  },
  {
    id: 10,
    first_name: "Stacy",
    last_name: "Thiolier",
    email: "sthiolier9@phoca.cz",
    gender: "Hombre",
  },
  {
    id: 11,
    first_name: "Frederich",
    last_name: "Furman",
    email: "ffurman0@nba.com",
    gender: "Hombre",
  },
  {
    id: 12,
    first_name: "Riordan",
    last_name: "Crayden",
    email: "rcrayden1@usnews.com",
    gender: "Hombre",
  },
  {
    id: 13,
    first_name: "Idalia",
    last_name: "Hardison",
    email: "ihardison2@live.com",
    gender: "Mujer",
  },
  {
    id: 14,
    first_name: "Felic",
    last_name: "Hofton",
    email: "fhofton3@reference.com",
    gender: "Hombre",
  },
  {
    id: 15,
    first_name: "Imelda",
    last_name: "Alesi",
    email: "ialesi4@cdc.gov",
    gender: "Mujer",
  },
  {
    id: 16,
    first_name: "Merrily",
    last_name: "Giacoboni",
    email: "mgiacoboni5@google.cn",
    gender: "Mujer",
  },
  {
    id: 17,
    first_name: "Garald",
    last_name: "Clubley",
    email: "gclubley6@weebly.com",
    gender: "Hombre",
  },
  {
    id: 18,
    first_name: "Bibi",
    last_name: "Izkovici",
    email: "bizkovici7@va.gov",
    gender: "Mujer",
  },
  {
    id: 19,
    first_name: "Codie",
    last_name: "Harflete",
    email: "charflete8@elegantthemes.com",
    gender: "Mujer",
  },
  {
    id: 20,
    first_name: "Giacobo",
    last_name: "Kitt",
    email: "gkitt9@about.com",
    gender: "Hombre",
  },
]
