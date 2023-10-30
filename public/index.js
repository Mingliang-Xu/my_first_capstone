console.log("connected to home page");
const apptForm = document.getElementById("appt-form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const apptDate = document.getElementById("date");
const numberOfPeople = document.getElementById("number");

const AllApptBtn = document.getElementById("all-appt-btn");

const list = document.getElementById("appt-container");

const createCard = (appt) => {
  let apptCard = document.createElement("div");
  apptCard.classList.add("appt-card");
  let apptHeader = document.createElement("div");
  apptHeader.classList.add("appt-header");
  let apptName = document.createElement("h3");
  apptName.textContent = `${appt.first_name}, ${appt.last_name}, ${appt.date}`;
  let option = document.createElement("div");
  option.classList.add("appt-option");

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("del-btn");
  deleteBtn.textContent = `❌`;
  deleteBtn.addEventListener("click", () => deleteAppt(appt.id));

  let numberOfPeople = document.createElement("h3");
  numberOfPeople.textContent = `Part of: ${appt.number_of_people}`;

  apptCard.appendChild(apptHeader);
  apptCard.appendChild(numberOfPeople);
  apptHeader.appendChild(apptName);
  apptHeader.appendChild(option);
  option.appendChild(deleteBtn);
  list.appendChild(apptCard);
};

const addAppt = (event) => {
  event.preventDefault();
  let newAppt = {
    first_name: firstName.value,
    last_name: lastName.value,
    date: apptDate.value,
    number_of_people: numberOfPeople.value,
  };
  console.log(newAppt);
  axios
    .post("http://localhost:5000/api/addAppt", newAppt)
    .then((res) => {
      console.log(res.data);
      res.data.forEach(createCard);
      alert(`Hi ${firstName.value}, thanks for choosing us!`);
      firstName.value = "";
      lastName.value = "";
      apptDate.value = "";
      numberOfPeople.value = "";
    })
    .catch((err) => {
      console.log(err);
    });
};
apptForm.addEventListener("submit", addAppt);

const deleteAppt = (id) => {
  console.log(id);
  axios
    .delete(`http://localhost:5000/api/deleteAppt/${id}`)
    .then((res) => {
      list.innerHTML = "";
      res.data.forEach(createCard);
      alert(`You've canceled your appointment.`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAppt = () => {
  axios
    .get("http://localhost:5000/api/getAppt")
    .then((res) => {
      list.innerHTML = "";
      console.log(res.data);
      res.data.forEach(createCard);
    })
    .catch((err) => {
      console.log(err);
    });
};

AllApptBtn.addEventListener("click", getAppt);
// getAppt();
