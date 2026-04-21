const addArticleBTN = document.getElementById("add-btn");
const formB = document.getElementById("form-b");
const formUpdate = document.getElementById("form-update");
const token = getCookie("token");
// const fileInput = document.getElementById("images-update");
// const fileInput = document.querySelector("#filename");

// const files = fileInput.files;
const urlAddArticle =
  "https://visits-christian-guardias-projects.vercel.app/lovingmypets";

const deleteBTN = document.getElementById("content-delete-btns");
// const addForm = document.getElementById("form");
const updateBTN = document.getElementById("content-btns");
let item = updateBTN.querySelector(".item:nth-child(2)");
let item2 = deleteBTN.querySelector(".item:nth-child(2)");
let newDiv = document.createElement("div");
let newDivDelete = document.createElement("div");

const opciones = {
    timeZone: "America/Panama",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true
};

const date = new Intl.DateTimeFormat("es-PA", opciones).format(ahora);

async function deleteArticle(id) {
      let result = await fetch(`${urlAddArticle}/${id}`, {
        method: "DELETE",

        body: JSON.stringify({
          id: id,
        }),
      })
        .then((response) => {
          if (response.ok) {
            alert(`DELETE article successfully!`);
            window.location.reload();
          } else {
            alert("Failed to delete the form submission.");
            window.location.reload();
          }
        })
        .catch((error) => console.error("Error:", error));
}

// function content(id, title) {
//   newDiv.setAttribute("class", "btns-id");
//   newDiv.innerHTML += `
//             <button value='${id}'>Update: ${title}</button>
//           `;
  //   console.log(newDiv);
//   updateBTN.insertBefore(newDiv, item);
//   newDiv.addEventListener("click", (e) => {

//     if (e.target.tagName == "BUTTON") {
//       update(e.target.value);
//     }
//   });
// }

function addArticle() {
  formB.addEventListener("submit", async function (event) {
    event.preventDefault();
    addArticleBTN.disabled = true;
    let formData = new FormData(formB);

    formData.append('date', date);

    console.log(formData);

    let result = await fetch(urlAddArticle, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Methods": "GET,HEAD,POST,OPTIONS",
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Added article successfully!");
          window.location.reload();
        } else {
          alert("Failed to send the form submission.");
          window.location.reload();
        }
      })
      .catch((error) => console.error("Error:", error));

    if (result.message === "Invalid token") {
      removeCookie("token");
      sectionB.setAttribute("class", "hidden");
      sectionA.removeAttribute("class", "hidden");
      return (message.innerText = result.message + " Inicia sesion");
    }
  });
}

async function getHome() {
  let result = await fetch(urlAddArticle, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Methods": "GET,HEAD,POST,OPTIONS",
    },
  }).then((resp) => resp.json());

  result.forEach((btn) => {

    newDiv.innerHTML += `
            <button value='${btn.id}'>Update: ${btn.title}</button>
          `;

    updateBTN.insertBefore(newDiv, item);

    newDivDelete.innerHTML += `
            <button value='${btn.id}'>Delete: ${btn.title}</button>
          `;

    deleteBTN.insertBefore(newDivDelete, item2);
  });
}



// deleteArticle();
addArticle();
getHome();

async function update(id) {

  let formData = new FormData(formUpdate);

  formData.append('update', date);

  let result = await fetch(`${urlAddArticle}/${id}`, {
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Methods": "GET,PUT,HEAD,POST,OPTIONS",
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        alert("Update article successfully!");
        window.location.reload();
      } else {

        alert("Failed to update the form submission.");
        window.location.reload();

      }
    })
    .catch((error) => console.error("Error:", error));
  
}

updateBTN.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "BUTTON") {
    e.target.disabled = true;
    update(e.target.value);
  }
});

deleteBTN.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "BUTTON") {
    e.target.disabled = true;
    deleteArticle(e.target.value);
  }
});