console.log("connected to review page");
const reviewForm = document.getElementById("review-form");
const reviewBtn = document.getElementById("review-btn");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const reviewDate = document.getElementById("date");
const reviewDesc = document.getElementById("my-review");
const list = document.getElementById("review-container");

const createCard = (review) => {
  let reviewCard = document.createElement("div");
  reviewCard.classList.add("appt-card");
  let reviewHeader = document.createElement("div");
  reviewHeader.classList.add("appt-header");
  let reviewName = document.createElement("h3");
  reviewName.textContent = `${review.first_name}, ${review.last_name}, ${review.date}`;
  let option = document.createElement("div");
  option.classList.add("appt-option");

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("del-btn");
  deleteBtn.textContent = `❌`;
  deleteBtn.addEventListener("click", () => deleteReview(review.id));

  let description = document.createElement("p");
  description.textContent = review.description;

  reviewCard.appendChild(reviewHeader);
  reviewCard.appendChild(description);
  reviewHeader.appendChild(reviewName);
  reviewHeader.appendChild(option);
  option.appendChild(deleteBtn);
  list.appendChild(reviewCard);
};

const addReview = (event) => {
  event.preventDefault();
  let newReview = {
    first_name: firstName.value,
    last_name: lastName.value,
    date: reviewDate.value,
    description: reviewDesc.value,
  };
  console.log(newReview);

  axios
    .post("http://localhost:5000/api/addReview", newReview)
    .then((res) => {
      console.log(res.data);
      res.data.forEach(createCard);
      alert(`Hi ${firstName.value}, thanks for your feedback!`);
    })
    .catch((err) => {
      console.log(err);
    });
};
reviewForm.addEventListener("submit", addReview);

const deleteReview = (id) => {
  console.log(id);
  axios
    .delete(`http://localhost:5000/api/deleteReview/${id}`)
    .then((res) => {
      list.innerHTML = "";
      res.data.forEach(createCard);
      alert(`We'd really appreciate your feedback. 🙂`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getReview = () => {
  axios
    .get("http://localhost:5000/api/getReview")
    .then((res) => {
      console.log(res.data);
      res.data.forEach(createCard);
    })
    .catch((err) => {
      console.log(err);
    });
};

getReview();
