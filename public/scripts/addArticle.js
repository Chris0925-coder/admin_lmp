const addArticleBTN = document.getElementById("add-btn");
const formB = document.getElementById("form-b");
const formUpdate = document.getElementById("form-update");
const token = getCookie("token");
// const fileInput = document.getElementById("images-update");
// const fileInput = document.querySelector("#filename");

// const files = fileInput.files;
const urlAddArticle =
  "https://visits-christian-guardias-projects.vercel.app/lovingmypets";

// const addForm = document.getElementById("form");
const updateBTN = document.getElementById("content-btns");
let item = updateBTN.querySelector(".item:nth-child(2)");
let newDiv = document.createElement("div");



function deleteArticle() {
  deleteBTN.forEach((btn) => {
    // console.log(btn);
    btn.addEventListener("click", async function (event) {
      // const formData = new FormData(form);
      // console.log(formData);
      // console.log(updateBTN);
      // console.log(formData.get("filename-b"));
      event.preventDefault();

      // console.log("Delete " + btn.value);
      let result = await fetch(`/upload/${btn.value}`, {
        method: "DELETE",
        // headers: {
        //   "Content-Type": "application/json; charset=utf-8",
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Methods": "GET,HEADERS,POST,OPTIONS",
        // },
        body: JSON.stringify({
          id: btn.value,
          // title: formData.get("title"),
          // paragraph: formData.get("paragraph"),
          // images: formData.get("filename-b"),
        }),
      })
        .then((response) => {
          if (response.ok) {
            alert("DELETE article successfully!");
            window.location.reload();
          } else {
            alert("Failed to delete the form submission.");
          }
        })
        .catch((error) => console.error("Error:", error));

      // console.log(result);
    });
  });
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

    updateBTN.innerHTML += `
            <button value='${btn.id}'>Update: ${btn.title}</button>
          `;
  });

}



// deleteArticle();
addArticle();
getHome();

async function update(id) {

  let formData = new FormData(formUpdate);

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
      }
    })
    .catch((error) => console.error("Error:", error));
  
}

updateBTN.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "BUTTON") {
    update(e.target.value);
  }
});
