//-----------Socket.IO----------------
const socket = io();

socket.on("toClient", (msg) => {
  console.log(msg);
});

socket.emit("toExpress", "socketIO is on !! index page listening...");

//-----------------Tensorflow.js---------------
// const tf = require("@tensorflow/tfjs");
// console.log(tf.versioj.tfjs);

//------------------------------------------------
let imageContent = document.querySelector(".image-display-block");
let cameraContent = document.querySelector(".camera-display-block");
let imageInput = document.querySelector(".image-input");
let innerText = document.querySelector(".inner");
let image;
let newImage;

imageContent?.addEventListener("click", () => imageInput?.click());

//-----------on click input----------------------
imageInput?.addEventListener("change", (event) => {
  console.log(event.target.files[0]);
  if (imageContent.getElementsByTagName("img").length < 1) {
    image = document.createElement("img");
    image.src = URL.createObjectURL(event.target.files[0]);
    image.style.height = "100%";
    image.style.width = "100%";
    image.style.objectFit = "contain";
    innerText.remove();
    imageContent.appendChild(image);
    console.log(imageInput.files[0]);
  } else {
    let image = document.querySelector("img");
    newImage = document.createElement("img");
    newImage.src = URL.createObjectURL(event.target.files[0]);
    newImage.style.height = "100%";
    newImage.style.width = "100%";
    newImage.style.objectFit = "contain";
    image.remove();
    imageContent.appendChild(newImage);
    console.log(imageInput.files[0]);
  }
});
//-----------drag and drop input-----------------------
imageContent.addEventListener("dragenter", dragenter, false);
imageContent.addEventListener("dragover", dragover, false);
imageContent.addEventListener("drop", drop, false);
function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}
function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}
function drop(e) {
  e.stopPropagation();
  e.preventDefault();
  var dt = e.dataTransfer;
  var files = dt.files;
  console.log(files[0]);
  if (imageContent.getElementsByTagName("img").length < 1) {
    image = document.createElement("img");
    image.src = URL.createObjectURL(files[0]);
    image.style.height = "100%";
    image.style.width = "100%";
    image.style.objectFit = "contain";
    innerText.remove();
    imageContent.appendChild(image);
    console.log(imageInput.files[0]);
  } else {
    let image = document.querySelector("img");
    newImage = document.createElement("img");
    newImage.src = URL.createObjectURL(files[0]);
    newImage.style.height = "100%";
    newImage.style.width = "100%";
    newImage.style.objectFit = "contain";
    image.remove();
    imageContent.appendChild(newImage);
    console.log(imageInput.files[0]);
  }
}
console.log(imageContent.getElementsByTagName("img").length);

let submit = document.querySelector("button.submit");
submit.addEventListener("click", async (event) => {
  event.preventDefault();
  let formData = new FormData();
  formData.append("image", imageInput.files[0]);
  await fetch("/upload", {
    method: "POST",
    body: formData,
  });
  console.log("Sending image...");
});

let content = document.querySelector(".result-content");

// let response = fetch("/post");
// response.then((res) => {
//   console.log(res);
// });

let fileButton = document.querySelector(".file");
let camButton = document.querySelector(".cam");

fileButton.addEventListener("click", () => {
  cameraContent.style.display = "none";
  imageContent.style.display = "inline-block";
  submit.style.display = "inline-block";
});

camButton.addEventListener("click", () => {
  cameraContent.style.display = "inline-block";
  imageContent.style.display = "none";
  submit.style.display = "none";
});
