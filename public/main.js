async function renderList(data) {
  let userListEl = document.getElementById("users-list");
  userListEl.innerHTML = "";
  data.forEach((d) => {
    const li = document.createElement("li");
    li.textContent = `${d.username} - ${d.email}`;
    userListEl.appendChild(li);
  });
}

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(formEl);
  const userData = Object.fromEntries(formData);

  fetch("http://localhost:2828/user", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => renderList(data))
    .catch((err) => console.log(err));
}

const formEl = document.querySelector("form");
formEl.addEventListener("submit", handleSubmit);
fetch("http://localhost:2828/users")
  .then((res) => res.json())
  .then((data) => renderList(data))
  .catch((err) => console.log(err));
