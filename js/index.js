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
  if (name.value.lenght() < 3) {
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

  if (!image.value.startsWith("https://")) {
    alert("Rasm url manzilini to'g'ri kiriting");
    image.focus();
    image.style.outlineColor = "red";
    return false;
  }
  return true;
}

function getUsers() {
  let users = [];
  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }

  return users;
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
      img: img.value,
      id: Date.now(),
    };

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    form.reset();
  });
