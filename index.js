"use strict";
let imageContent = document.querySelector('.image-display-block');
let imageInput = document.querySelector('.image-input');
let innerText = document.querySelector('.inner');
imageContent?.addEventListener('click', () => imageInput?.click());
imageInput?.addEventListener('change', (event) => {
    console.log(event.target.files[0]);
    let newImage = document.createElement('img');
    newImage.src = URL.createObjectURL(event.target.files[0]);
    innerText.remove();
    imageContent.appendChild(newImage);
});
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
    let newImage = document.createElement('img');
    newImage.src = URL.createObjectURL(files[0]);
    newImage.style.height = '100%';
    newImage.style.width = '100%';
    newImage.style.objectFit = 'contain';
    innerText.remove();
    imageContent.appendChild(newImage);
}
console.log(imageContent);
