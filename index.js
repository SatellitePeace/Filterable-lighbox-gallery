// DARK - LIGHT MODE TOGGLE
const darkModeButton = document.querySelector('.lightMode-btn');
const bodyColor = document.body;
const isDarkModeEnabled = localStorage.getItem('darkMode') === 'true';
if (isDarkModeEnabled) {
  bodyColor.classList.add('dark-mode');
  darkModeButton.innerHTML = "<i class='bi bi-moon-fill'></i>";
} else {
  bodyColor.classList.remove('dark-mode');
  darkModeButton.innerHTML = "<i class='bi bi-brightness-high-fill'></i>";
}
// set darkmode to persist from previous state
darkModeButton.addEventListener('click', () => {
  bodyColor.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', bodyColor.classList.contains('dark-mode'));

  if (bodyColor.classList.contains('dark-mode')) {
    darkModeButton.innerHTML = "<i class='bi bi-moon-fill'></i>";
  } else {
    darkModeButton.innerHTML = "<i class='bi bi-brightness-high-fill'></i>";
  }
});

// LIGHTBOX
const body = document.querySelector("body")
const lightbox = document.querySelector(".image-gallery-container .lightbox");
const lightboxImage = document.querySelector(
  ".image-gallery-container .lightbox img"
);
const lightboxTitle = document.querySelector(
  ".image-gallery-container .lightbox .title"
);
const downloadBtn = document.querySelector(
  ".image-gallery-container .download-btn"
);
const nextBtn = document.querySelector(".image-gallery-container .next-btn");
const previousBtn = document.querySelector(
  ".image-gallery-container .previous-btn"
);
const closeBtn = document.querySelector(".image-gallery-container .close-btn");

let currentImage = "";

const showImage = (data) => {
  currentImage = data;
  lightbox.classList.add("active");
  let image = data.querySelector("img");

  lightboxImage.src = image.src;
  downloadBtn.href = image.src;
};
closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

nextBtn.addEventListener("click", () => {
  if (currentImage.nextElementSibling) {
    currentImage = currentImage.nextElementSibling;
  } else {
    currentImage = currentImage.parentElement.firstElementChild;
  }
  showImage(currentImage);
});

previousBtn.addEventListener("click", () => {
  if (currentImage.previousElementSibling) {
    currentImage = currentImage.previousElementSibling;
  } else {
    currentImage = currentImage.parentElement.lastElementChild;
  }
  showImage(currentImage);
});

//   FILTER IMAGES
const list = document.querySelectorAll(".list")
const itemBox = document.querySelectorAll(".image")

for (let i = 0; i < list.length; i++) {
  list[i].addEventListener("click", function () {
    for (let j = 0; j < list.length; j++) {
      list[j].classList.remove("active")
      // console.log(1)
    }
    this.classList.add("active")

    let dataFilter = this.getAttribute("data-name")

    for (let k = 0; k < itemBox.length; k++) {
      itemBox[k].classList.remove("active")
      itemBox[k].classList.add("hide")

      if (itemBox[k].getAttribute("data-name") === dataFilter || dataFilter === "all") {
        itemBox[k].classList.remove("hide")
        itemBox[k].classList.add("active")
      }
    }
  })
}
// DOWNLOAD IMAGE DIRECTLY FROM THE GALLERY
itemBox.forEach(item => {
  const downloadButton = item.querySelector(".title");
  const image = item.querySelector("img");

  downloadButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const imageUrl = image.src;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = imageUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

// COPYRIGHT DATE
// const copyDate = document.querySelector("span");
// copyDate.innerText = new Date().getFullYear();