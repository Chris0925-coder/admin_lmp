const form = document.querySelector('#form');
let date = document.querySelector('.date');

const ulr = "https://visits-christian-guardias-projects.vercel.app/lovingmypets/login";
const message = document.getElementById("message");
const sectionA = document.querySelector('.submit');
const sectionB = document.querySelector('.articles');

function submit() {
	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		message.style.color = "#009900";
	    message.innerText = "Iniciando sesion...";
	    const formData = new FormData(form);

		let result = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
		        username: formData.get("username"),
		        password: formData.get("password"),
		    }),		
		})
		.then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
        message.style.color = "#990000";
        message.innerText = error;
      });

      console.log(result);

      if (!result.error) {
	      setCookie("token", result, 30);
	      window.location.reload();
	     // window.location.replace("https://www.crcvpanama.org/pages/admin.html")
	    } else {
	      message.style.color = "#990000";
	      message.innerText = result.error;
	    }
	})
}

submit();
// sectionA.setAttribute("class", "hidden");
// sectionB.removeAttribute("class", "hidden");

if(detectCookie("token")) {
	sectionA.setAttribute("class", "hidden");
	sectionB.removeAttribute("class", "hidden");
} 


date.append(d.getFullYear ());
