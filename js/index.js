const form = document.querySelector("#form");
const name = document.querySelector("#name");
const surname = document.querySelector("#surname");
const number = document.querySelector("#number");
const image = document.querySelector("#image");
const nationality = document.querySelector("#nationality");
const button = document.querySelector("#button");

const wrapper = document.querySelector(".wrapper");

const img = document.querySelector(".card img");
const h4 = document.querySelector(".card h4");
const p = document.querySelector(".card p");
const h = document.querySelector(".card h");

const editButton = document.querySelector(".edit_button");
const deleteButton = document.querySelector(".delete_button");

function validate() {
  if (name.value.lenght < 3) {
    alert("Ism kamida 3 ta belgidan iborat bo'lishi kerak");
    name.focus();
    name.style.outlineColor = "red";
    return false;
  }

  if (surname.value.lenght < 3) {
    alert("Familiya kamida 3 ta belgidan iborat bo'lishi kerak");
    surname.focus();
    surname.style.outlineColor = "red";
    return false;
  }

  if (!age.value || age.value > 150 || age.value < 0) {
    alert("Yoshni to'g'ri kiriting");
    age.focus();
    age.style.outlineColor = "red";
    return false;
  }

  // if (!image.value.startsWith("https://")) {
  //   alert("Rasm url manzilini to'g'ri kiriting");
  //   image.focus();
  //   image.style.outlineColor = "red";
  //   return false;
  // }
  return true;
}

function getUsers() {
  let users = [];
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }

  return users;
}

function creatcard(user) {
  console.log(user);
  return `
  <div class="card">
    <img width="300" height="300" src="${user.image}" alt="user picture" />
    <h4>${user.name + "" + user.surname}</h4>
    <p>${user.age + " yosh"}</p>
    <h>${user.nationality}</h>

   <span>
      <button data-id="${
        user.id
      }" class="edit_button"><i class="fa-regular fa-pen-to-square"></i>Edit</button>
      <button data-id="${
        user.id
      }" class="delete_button"><i class="fa-solid fa-trash-can"></i>Delete</button>
    </span>
  </div>
  `;
}

function save(value) {
  const cardInfo = {
    name: value.name,
    surname: value.surname,
    age: value.age,
    nationality: value?.nationality,
    image: value.image,
    id: Date.now(),
  };

  let user = [];
  if (localStorage.getItem("users")) {
    user = JSON.parse(localStorage.getItem("users"));
  }

  user.push(cardInfo);
  localStorage.setItem("users", JSON.stringify(user));
}

button &&
  button.addEventListener("click", function (event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    let users = getUsers();
    let user = {
      name: name.value,
      surname: surname.value,
      age: age.value,
      nationality: nationality.value,
      image: image.value,
      id: Date.now(),
    };

    let card = creatcard(user);
    save(user);
    name.focus();
    wrapper.innerHTML += card;

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    form.reset();
  });

document.addEventListener("DOMContentLoaded", function () {
  let users = getUsers();
  users.lenght > 0 &&
    users.forEach((element) => {
      const card = creatcard(
        element.name,
        element.surname,
        element.age,
        element.nationality,
        element.img,
        element.id
      );
      wrapper.innerHTML += card;
    });

  const deleteButtons = document.querySelectorAll(".delete_button");

  deleteButtons.lenght > 0 &&
    deleteButtons.forEach(function (element) {
      element.addEventListener("click", function () {
        let id = this.getAttribute("data-id");

        let idDelete = confirm("Rostdan ham o'chirmoqchimisiz");
        if (idDelete && id) {
          let copied = JSON.parse(JSON.stringify(users));
          copied.filter(function (value) {
            return value.id != id;
          });

          localStorage.setItem("users", JSON.stringify(copied));
          window.location.reload();
        }
      });
    });
});
