function initStorage() {
  if (!localStorage.getItem("contacts")) {
    localStorage.setItem("contacts", JSON.stringify([]));
  }
}
initStorage();

function getContactsFromLs() {
  const contacts = JSON.parse(localStorage.getItem("contacts"));
  return contacts;
}

function setContactsToLS(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

const addBtn = document.querySelector(".add-contact button");
const container = document.querySelector(".contacts");
const nameInput = document.querySelector("#name");
const lastNameInput = document.querySelector("#lastName");
const phoneInput = document.querySelector("#phone");
const photoInput = document.querySelector("#photo");
const modal = document.querySelector("#modal");
const saveContactBtn = document.querySelector("#saveContact");
const closeBtn = document.querySelector(".closeBtn");
const modalTitle = document.querySelector(".modal-header h2");

function render(contacts = getContactsFromLs()) {
  container.innerHTML = "";
  const contactsHeader = document.createElement("h2");
  contactsHeader.textContent = "Список контактов";
  container.appendChild(contactsHeader);
  contacts.forEach((item, index) => {
    const element = document.createElement("div");
    element.classList.add("contact");
    element.innerHTML = `
      <span>${item.name}</span>
      <div>
        <button id="${index}" class="editBtn">Изменить</button>
        <button id="${index}" class="delBtn">Удалить</button>
      </div>
    `;
    container.appendChild(element);
  });
}

addBtn.addEventListener("click", () => {
  modalTitle.innerText = "Добавить контакт";
  modal.style.display = "block";
});

saveContactBtn.addEventListener("click", () => {
  createContact();
});

closeBtn.addEventListener("click", () => {
  closeModal();
});

function createContact() {
  const name = nameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const phone = phoneInput.value.trim();
  const photo = photoInput.value.trim();

  if (!name || !phone || !photo || !lastName) {
    alert("Заполните все поля");
    return;
  }

  const newContact = {
    name,
    lastName,
    phone,
    photo,
  };

  const contacts = getContactsFromLs();
  if (modalTitle.innerText === "Добавить контакт") {
    contacts.push(newContact);
  } else {
    const index = Number(id.split("-")[1]);
    contacts[index] = newContact;
  }
  setContactsToLS(contacts);



  nameInput.value = "";
  lastNameInput.value = "";
  phoneInput.value = "";
  photoInput.value = "";

  closeModal();
  render();
}

function closeModal() {
  modal.style.display = "none";
}

document.getElementById("photo").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const url = reader.result;
    document.getElementById("file").style.backgroundImage = `url(${url})`;
  };

  reader.readAsDataURL(file);
});

render();

// edit

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("editBtn")) {
    console.log(e.target.id.index);
    const index = parseInt(e.target.id);
    console.log(index);
    const contacts = getContactsFromLs();
    const foundContact = contacts[index];
    console.log(contacts);

    console.log(photoInput)

    nameInput.value = foundContact.name;
    lastNameInput.value = foundContact.lastName;
    phoneInput.value = foundContact.phone;
    // photoInput.value = foundContact.photo;

    id = index

    modal.style.display = "block";
    modalTitle.innerText = "Edit contact";
    saveContactBtn.style.display = "block";
    addBtn.style.display = "none";
  }
});

saveContactBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const phone = phoneInput.value.trim();
  const photo = photoInput.value.trim();

  if (!name || !phone || !photo || !lastName) {

    return;
  }

  const editedContact = {
    name: name,
    lastName: lastName,
    phone: phone,
    photo: photo,
  };

  const contacts = getContactsFromLs();
  contacts.splice(id, 1, editedContact);
  setContactsToLS(contacts);

  nameInput.value = "";
  lastNameInput.value = "";
  phoneInput.value = "";
  photoInput.value = "";

  closeModal();

  render();
});

// delete

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delBtn")) {
    let answer = confirm("Are you sure?");
    if (!answer) {
      return;
    }
    const index = parseInt(e.target.id);
    const contacts = getContactsFromLs();
    contacts.splice(index, 1);
    setContactsToLS(contacts);
    render();
  }
});
