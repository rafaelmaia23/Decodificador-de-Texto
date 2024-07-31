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
function encrypt(input) {
    const cryptKeys = getCryptKeys();
    let encryptedInput = input;
    for (const [key, value] of Object.entries(cryptKeys)) {
        const regex = new RegExp(key, "g");
        encryptedInput = encryptedInput.replace(regex, value);
    }
    return encryptedInput;
}

function decrypt(input) {
    const cryptKeys = getCryptKeys();
    let decryptedInput = input;
    for (const [key, value] of Object.entries(cryptKeys)) {
        const regex = new RegExp(value, "g");
        decryptedInput = decryptedInput.replace(regex, key);
    }
    return decryptedInput;
}

function getCryptKeys() {
    return {
        e: "enter",
        i: "imes",
        a: "ai",
        o: "ober",
        u: "ufat",
    };
}

//Validação de entrada de texto
function isInputValid(input) {
    const regex = /^(?!\s*$)[a-z\s:,;!.?]+$/;
    return regex.test(input);
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
    if (!isInputValid(input)) {
        writeOutput(
            "Input invalido! Texto não pode ser vazio, deve conter apenas letras minusculas e não ter acentos."
        );
        return;
    }
    const encryptedMsg = encrypt(input);
    writeOutput(encryptedMsg);
    copyBtn.style.display = "block";
});

decryptBtn.addEventListener("click", () => {
    const input = inputTextarea.value;
    if (!isInputValid(input)) {
        writeOutput(
            "Input invalido! Texto não pode ser vazio, deve conter apenas letras minusculas e não ter acentos."
        );
        return;
    }
    const decryptedMsg = decrypt(input);
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
