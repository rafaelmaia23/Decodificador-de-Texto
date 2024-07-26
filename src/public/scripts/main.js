"use strict";

const encryptBtn = document.querySelector(".btn-encrypt");
const decryptBtn = document.querySelector(".btn-decrypt");
const copyBtn = document.querySelector(".btn-copy");
const inputTextarea = document.querySelector(".main-input-textarea");
const inputInitialHeight = inputTextarea.scrollHeight;
const outputTextarea = document.querySelector(".main-output-textarea");
const outputInitialHeight = outputTextarea.scrollHeight;
const outputImg = document.querySelector(".main-output-img");
const outputText = document.querySelector(".main-output-text");
const body = document.querySelector("body");
const mobileMenu = document.querySelector("header-navbar-icon");
const navLinks = document.querySelector("header-navbar-list");

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

function isInputValid(input) {
    const regex = /^(?!\s*$)[a-z\s:,;!.?]+$/;
    return regex.test(input);
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

function inputAdjustHeight(textarea) {
    if (!(window.innerWidth < 1024)) return;
    textarea.style.height = "auto";
    const currentHeight = textarea.scrollHeight;
    const newHeight = Math.max(currentHeight, inputInitialHeight);
    textarea.style.height = newHeight + "px";
    AdjustBodyHeight();
}

function outputAdjustHeight(textarea) {
    if (window.innerWidth < 1024) {
        textarea.style.height = "auto";
        const currentHeight = textarea.scrollHeight;
        const newHeight = Math.max(currentHeight, outputInitialHeight);
        textarea.style.height = newHeight + "px";
    } else {
        textarea.style.height = "100%";
    }

    AdjustBodyHeight();
}

function AdjustBodyHeight() {
    if (!(window.innerWidth < 1024)) return;
    if (
        inputTextarea.scrollHeight > inputInitialHeight ||
        outputTextarea.scrollHeight > outputInitialHeight
    ) {
        body.style.height = "100%";
    } else {
        body.style.height = "100vh";
    }
}

function writeOutput(output) {
    outputImg.style.display = "none";
    outputText.style.display = "none";
    outputTextarea.value = output;
    outputAdjustHeight(outputTextarea);
}

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
    navLinks.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", () => {
    inputTextarea.addEventListener("input", () =>
        inputAdjustHeight(inputTextarea)
    );
});
