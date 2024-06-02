let PhoneData;
async function getData(phone) {
  document.querySelector(".search-results").innerHTML =
    "<div> <img src='22.gif'></div>";
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phone}`
  );

  PhoneData = await res.json();
  if (!PhoneData.status) {
    console.log("hello");
    document.querySelector(".search-results").innerHTML = "No result found";
    return;
  }

  document.querySelector(".search-results").innerHTML = "";
  PhoneData.data.map((phone, index) => {
    const phone_box = document.createElement("div");
    phone_box.classList.add("phone-box");
    phone_box.innerHTML = `<img src=${phone.image}> <div>${phone.phone_name}</div> <p>${phone.brand}</p> <button onclick="show(${index})">Details</button>`;
    document.querySelector(".search-results").appendChild(phone_box);
  });
  document.querySelector(
    ".phone_heading"
  ).innerHTML = ` Latest  ${phone.toUpperCase()} ${
    phone.includes("phone") ? "" : "phones"
  }`;
}
getData("iphone");

function remove() {
  const existingModal = document.querySelector(".modal-box");
  if (existingModal) {
    existingModal.remove();
  }
}
async function show(index) {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${PhoneData.data[index].slug}`
  );

  PhoneDetails = await res.json();
  console.log(PhoneDetails.status);
  const modal_box = document.createElement("div");
  modal_box.classList.add("modal-box");
  modal_box.innerHTML = `<dialog open>
    <div class ="container">
    <img src=${PhoneDetails.data.image}>
    <div class = "features">
      Name:  ${PhoneDetails.data.name} 
    <span> Brand: ${PhoneDetails.data.brand}</span>
    Features: 
    <span class="space">Chip Set:${
      PhoneDetails.data.mainFeatures.chipSet
    } </span>
    <span class="space">Display:${
      PhoneDetails.data.mainFeatures.displaySize
    } </span>
    <span class="space">Memory Sets: ${PhoneDetails.data.mainFeatures.memory
      .split(", ")
      .map((e) => {
        return `<p>${e}</p>`;
      })
      .join("")}
    </span>
    <span class="date">Release Date: ${PhoneDetails.data.releaseDate} </span>
    </div>
    
    <form method="dialog">
      <button onclick="remove()">Close</button>
    </form>
    </div>
  </dialog>`;
  console.log(
    PhoneDetails.data.mainFeatures.memory.split(", ").map((e) => {
      return `${e}`;
    })
  );
  document.querySelector(".search-results").appendChild(modal_box);
}
document
  .querySelector(".material-symbols-outlined")
  .addEventListener("click", () => {
    getData(document.querySelector("input").value);
  });
