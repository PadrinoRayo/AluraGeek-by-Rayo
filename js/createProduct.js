import { connectAPI } from "./index.js"

const form = document.querySelector("[dataForm]");
const btnClear = document.querySelector("[dataClear]");

function validateForm() {
    const title = document.querySelector("[dataTitle]");
    const price = document.querySelector("[dataPrice]");
    const image = document.querySelector("[dataImage]");
    let valid = true;

    if (title.value.trim() === "") {
        valid = false;
        showError(title, "El nombre es obligatorio");
    } else {
        const error = title.parentElement.querySelector(".error");
        if (error) {
            error.remove();
        }
    }

    if (price.value.trim() === "" || isNaN(price.value) || Number(price.value) <= 0) {
        valid = false;
        showError(price, "El precio debe ser un número válido mayor que 0");
    } else {
        const error = price.parentElement.querySelector(".error");
        if (error) {
            error.remove();
        }
    }

    if (image.value.trim() === "" || !isValidURL(image.value)) {
        valid = false;
        showError(image, "La URL de la imagen no es válida");
    } else {
        const error = image.parentElement.querySelector(".error");
        if (error) {
            error.remove();
        }
    }

    return valid;
}

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

function showError(input, message) {

    const error = input.parentElement.querySelector(".error");

    if (error) {

        error.textContent = message;

    } else {
        const newError = document.createElement("span");
        newError.className = "error";
        newError.textContent = message;
        input.parentElement.insertBefore(newError, input)
    }
}

async function createProduct(e) {

    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const title = document.querySelector("[dataTitle]").value;
    const price = document.querySelector("[dataPrice]").value;
    const image = document.querySelector("[dataImage]").value;

    try {
        await connectAPI.sendProduct(title, price, image);

    } catch (e) {
        alert(e)
    }
}

form.addEventListener("submit", createProduct)

btnClear.addEventListener("click", () => {
    form.reset()
})