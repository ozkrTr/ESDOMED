const userSelect = document.querySelector(".user__input");
const userIcon = document.querySelector(".user__icon");
const expNumber = document.querySelector("#expNumber");
const card = document.querySelector(".card");
const form = document.querySelector(".form");
const btnSave = document.querySelector(".section__btn");

let users = [
  "Lisseth Lazo",
  "Milton Martinez",
  "Johanna Orellana",
  "Amanda Rosales",
  "Rosa Guzmán",
  "Mayra de Zuniga",
  "Bessy de Flores",
  "Iracema Dominguez",
  "Olga de Bautista",
  "Sandra de Pineda",
  "Oscar Torres",
  "William Guzmán",
];

function cargarUsuarios(users) {
  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user; // Asigna el valor del usuario al option
    option.textContent = user; // Asigna el nombre del usuario como texto del option
    option.classList.add("user__option");
    // Agrega el option al select
    userSelect.appendChild(option);
  });
}

cargarUsuarios(users);

userSelect.addEventListener("focus", (e) => {
  userIcon.classList.add("opened");
});

userSelect.addEventListener("click", (e) => {
  expNumber.focus();
});

// Escuchar el evento 'blur' en el select
userSelect.addEventListener("blur", (e) => {
  userIcon.classList.remove("opened");
});

// card.addEventListener("click", (e) => {
//   e.stopPropagation();
//   console.log("card click");
//   expNumber.focus();
// });

btnSave.addEventListener("click", (e) => {
  const prevError = document.querySelector(".error");
  e.preventDefault();
  try {
    const user = userSelect.value;
    const expNumb = expNumber.value;
    const name = document.querySelector("#name").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = document.querySelector("#age").value;
    const address = document.querySelector("#adress").value;
    const expedient = document.querySelector('input[name="expedient"]');

    const datos = {
      user: user,
      expNumber: expNumb,
      name: name,
      gender: gender,
      age: age,
      address: address,
      expedient: expedient.checked ? "con expediente" : "sin expediente",
    };

    if (
      user != "default" &&
      expNumb != "" &&
      name != "" &&
      gender != "" &&
      age != "" &&
      address != ""
    ) {
      if (prevError) {
        prevError.remove();
      }

      google.script.run.validarDatos(datos);
      form.reset();
    } else {
      if (!prevError) {
        const error = document.createElement("span");
        error.innerText = "por favor llenar todos los datos requeridos";
        error.classList.add("error");
        card.append(error);
      }
    }
  } catch (e) {
    if (!prevError) {
      const error = document.createElement("span");
      error.innerText = "por favor llenar todos los datos requeridos";
      error.classList.add("error");
      card.append(error);
    }
  }
});
