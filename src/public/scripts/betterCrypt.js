"use strict";

//Seletores
const encryptBtn = document.querySelector(".btn-encrypt");
const decryptBtn = document.querySelector(".btn-decrypt");
const copyBtn = document.querySelector(".btn-copy");
const inputTextarea = document.querySelector(".main-input-textarea");
const outputTextarea = document.querySelector(".main-output-textarea");
const outputImg = document.querySelector(".main-output-img");
const outputText = document.querySelector(".main-output-text");
const body = document.querySelector("body");
const mobileMenu = document.querySelector(".header-navbar-icon");
const svgMenuIcon = document.querySelector(".svg-menu-icon");
const svgCloseIcon = document.querySelector(".svg-close-icon");
const navList = document.querySelector(".header-navbar-list");
const selectElement = document.querySelector(".main-input-encryption-select");

const secretKey = "3A49F78E57E992A998E8214BC852A";
const inputInitialHeight = inputTextarea.scrollHeight;
const outputInitialHeight = outputTextarea.scrollHeight;

//Config Toastr
toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-top-center",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
};

//Funções de criptgrafia e decriptografia
const encryptFunctions = {
    base64: encryptBase64,
    AES: encryptAES,
};

const decryptFunctions = {
    base64: decryptBase64,
    AES: decryptAES,
};

//Funções de entrada
function encrypt(input, type) {
    const encryptFunction = encryptFunctions[type] || encryptFunctions.base64;
    return encryptFunction(input);
}

function decrypt(input, type) {
    const decryptFunction = decryptFunctions[type] || decryptFunctions.base64;
    return decryptFunction(input);
}

//Base 64
function encryptBase64(input) {
    return btoa(input);
}

function decryptBase64(input) {
    return atob(input);
}

//AES
function encryptAES(input) {
    return CryptoJS.AES.encrypt(input, secretKey).toString();
}

function decryptAES(input) {
    return CryptoJS.AES.decrypt(input, secretKey).toString(CryptoJS.enc.Utf8);
}

//Funções de ajuste de altura Textarea e Body
function AdjustTextareaHeight(textarea, initialHeight, isOutput = false) {
    if (window.innerWidth < 1024) {
        textarea.style.height = "auto";
        const newHeight = Math.max(textarea.scrollHeight, initialHeight);
        textarea.style.height = newHeight + "px";
    } else if (isOutput) {
        textarea.style.height = "100%";
    }
    AdjustBodyHeight();
}

function AdjustBodyHeight() {
    if (window.innerWidth < 1024) {
        body.style.height =
            inputTextarea.scrollHeight > inputInitialHeight ||
            outputTextarea.scrollHeight > outputInitialHeight
                ? "100%"
                : "100vh";
    }
}

//Escrita de saida de texto
function writeOutput(output) {
    outputImg.style.display = "none";
    outputText.style.display = "none";
    outputTextarea.value = output;
    AdjustTextareaHeight(outputTextarea, outputInitialHeight, true);
}

//Event listeners
encryptBtn.addEventListener("click", () => {
    const input = inputTextarea.value;
    const type = selectElement.value;
    const encryptedMsg = encrypt(input, type);
    writeOutput(encryptedMsg);
    copyBtn.style.display = "block";
});

decryptBtn.addEventListener("click", () => {
    const input = inputTextarea.value;
    const type = selectElement.value;
    const decryptedMsg = decrypt(input, type);
    writeOutput(decryptedMsg);
    copyBtn.style.display = "block";
});

copyBtn.addEventListener("click", async () => {
    const textToCopy = outputTextarea.value;
    try {
        await navigator.clipboard.writeText(textToCopy);
        toastr["success"]("o texto foi copiado com sucesso!", "Texto Copiado");
    } catch (err) {
        toastr["error"]("o texto não foi copiado!", "Erro");
    }
});

mobileMenu.addEventListener("click", () => {
    console.log("clicou");
    navList.classList.toggle("active");
    svgMenuIcon.classList.toggle("svg-close");
    svgCloseIcon.classList.toggle("svg-close");
});

document.addEventListener("DOMContentLoaded", () => {
    inputTextarea.addEventListener("input", () =>
        AdjustTextareaHeight(inputTextarea, inputInitialHeight)
    );
});
