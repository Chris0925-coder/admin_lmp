const addArticleBTN = document.getElementById("add-btn");
const addNewArticleBTN = document.getElementById("add-new-article");
const textAreaPara = document.getElementsByName("paragraph");
const formB = document.getElementById("form-b");
const formUpdate = document.getElementById("form-update");
const fileInput = document.getElementById("filename");
const input = document.getElementsByTagName("input");
const token = getCookie("token");

let imgs = [];
const reader = new FileReader();
fileInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  // const preview = document.getElementById("preview");
  // const errorMsg = document.getElementById("errorMsg");

  // Reset previous state
  // preview.style.display = "none";
  // preview.src = "";
  // errorMsg.textContent = "";

  if (!file) {
    return; 
  }

  // Validate file type
  // if (!file.type.startsWith("image/")) {
  //   errorMsg.textContent = "Please select a valid image file.";
  //   return;
  // }

  // Validate file size (example: max 2MB)
  const maxSizeMB = 4.5;
  if (file.size > maxSizeMB * 1024 * 1024) {
    errorMsg.textContent = `File size must be less than ${maxSizeMB} MB.`;
    return;
  }

  // Create a preview using FileReader
  
  reader.onload = function (e) {
    preview.src = e.target.result;
    preview.style.display = "block";
  };
  reader.onerror = function () {
    errorMsg.textContent = "Error reading file.";
  };
  // reader.readAsDataURL(file);
  reader.readAsDataURL(file);
  // console.log();
});

// const btnAddParagraph = document.getElementById("add-paragraph");
// const btnAddList = document.getElementById("add-list");

let paragraphs = [];

// let blogList = [];

let urlAddArticle = "https://visits-christian-guardias-projects.vercel.app/lovingmypets";

// const blobUrl =
// "https://visits-christian-guardias-projects.vercel.app/lovingmypets";
// "/webs";
// "https://visits-christian-guardias-projects.vercel.app/lovingmypets";

const deleteBTN = document.getElementById("content-delete-btns");
// const addForm = document.getElementById("form");
const updateBTN = document.getElementById("content-btns");
let item = updateBTN.querySelector(".item:nth-child(2)");
let item2 = deleteBTN.querySelector(".item:nth-child(2)");
let newDiv = document.createElement("div");
let newDivDelete = document.createElement("div");

const opciones = {
  timeZone: "America/Panama",
  year: "numeric",
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

let articles = {
  title: "",
  paragraph: "",
  filename: "",
  origin: "",
  link: "",
  paragraphs: "",
};
let newArticle = [];

function addNewArticle(e) {
  
    e.preventDefault();

    let formData = new FormData(formB);
    articles = {
      title: formData.get("title"),
      paragraph: formData.get("paragraph"),
      filename: formData.get("filename"),
      origin: formData.get("origin"),
      link: formData.get("link"),
      paragraphs: "",
    };    
    newArticle.push(articles);

    input[2].value = "";
    textAreaPara[0].value = "";
  // });
}
// addNewArticle();
addNewArticleBTN.addEventListener("click", addNewArticle);

const dateNow = new Intl.DateTimeFormat("es-PA", opciones).format(d);

// btnAddParagraph.addEventListener("click", (e) => {
//   e.preventDefault();
//   paragraphs.push(`<p>${textAreaPara[0].value}</p>`);

//   textAreaPara[0].value = "";
// });

// btnAddList.addEventListener("click", (e) => {
//   e.preventDefault();

//   let listSplit = textAreaPara[0].value.split("•");
//   if (!textAreaPara[0].value.includes("•"))
//     listSplit = textAreaPara[0].value.split(",");

//   listSplit.forEach((l) => {
//     console.log(l);

//     let ul = `<li>${l}</li>`;
//     console.log(ul);
//     paragraphs.push(ul);
//   });

//   textAreaPara[0].value = "";

// });

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

async function getHome() {
  let result = await fetch(urlAddArticle, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Methods": "GET,HEAD,POST,OPTIONS",
    },
  })
    .then((resp) => resp.json())
    .catch((error) => {
      console.error("Error:", error);
      message.style.color = "#990000";
      message.innerText = error;
    });



  if (result.message === "Invalid token") {
    removeCookie("token");
    window.location.reload();
  }

  result.forEach((btn) => {
    let parse = btn.title;

    if (parse.includes("[")) parse = JSON.parse(btn.title)[0];
    newDiv.innerHTML += `
            <button value='${btn.id}'>Update: ${parse}</button>
          `;

    updateBTN.insertBefore(newDiv, item);

    newDivDelete.innerHTML += `
            <button value='${btn.id}'>Delete: ${parse}</button>
          `;

    deleteBTN.insertBefore(newDivDelete, item2);
  });
}
// deleteArticle();

getHome();

async function update(id) {
  let formData = new FormData(formUpdate);

  formData.append("update", dateNow);

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

// updateBTN.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (e.target.tagName === "BUTTON") {
//     e.target.disabled = true;
//     update(e.target.value);
//   }
// });

deleteBTN.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "BUTTON") {
    e.target.disabled = true;
    deleteArticle(e.target.value);
  }
});




function addArticle() {
  formB.addEventListener("submit", async function (event) {
    event.preventDefault();

    let formData = new FormData();
    
    // addArticleBTN.disabled = true;

        // console.log(newArticle.length === 0);
    if (newArticle.length === 0) {
      console.log("single");
      formData = new FormData(formB);
      // formData.append("title", formData.get("title"));
      // formData.append("paragraph", formData.get("paragraph"));
      // formData.append("filename", formData.get("filename"));
      // formData.append("link", formData.get("link"));
      // formData.get("filename")
    } else {
      console.log("array");
      

      for (let j = 0; j < newArticle.length; j++) {
        console.log(newArticle[j].title);
        let articleTitles = newArticle[j].title;

        console.log(articleTitles);

        let articleParagraph = newArticle[j].paragraph;
        console.log(articleParagraph);
        let articleFiles = newArticle[j].filename;
        console.log(articleFiles);
        formData.append("title", articleTitles);
        formData.append("paragraph", articleParagraph);
        console.log(newArticle.length);

        // for (let i = 0; i < newArticle.length; i++) {
          console.log(articleFiles);
          formData.append("filename", articleFiles);
        // }
          formData.append("link", newArticle[0].link);
      }
      urlAddArticle = urlAddArticle+"/array";
    }

    // console.log(urlAddArticle);
    
    formData.append('date', dateNow);
    formData.append("paragraphs", []);
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

        let res = response.json(); 
        console.log(response);
        console.log(res);

        if(response.status === 500) {
          message.innerText = res.message;
          // alert("File size too large. MAX SIZE = 4.5mb");
          // window.location.reload();
        }

        if(response.status === 413) {
          message.innerText = "File size too large. MAX SIZE = 4.5mb";
          alert("File size too large. MAX SIZE = 4.5mb");
          window.location.reload();
        }
        
        if (res.message === "LIMIT_FILE_SIZE") {
            alert("File size too large. MAX SIZE = 4.5mb");
            window.location.reload();
        }

        if (res.message === "Invalid token") {
          removeCookie("token");
          sectionB.setAttribute("class", "hidden");
          sectionA.removeAttribute("class", "hidden");
          return (message.innerText = res.message + " Inicia sesion");
        }

        console.log(response.ok);

        if (response.ok) {
          message.innerText = "Upload Successfully";
          alert("Upload Successfully");
          window.location.reload();
        }

      })
      .catch((error) => console.error("Error: ", error));

      console.log(result);
      
  });
    
}

addArticle();