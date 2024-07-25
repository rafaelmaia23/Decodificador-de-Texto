"use strict";

const encryptBtn = document.querySelector(".btn-encrypt");
const decryptBtn = document.querySelector(".btn-decrypt");
const copyBtn = document.querySelector(".btn-copy");
const inputTextarea = document.querySelector(".main-input-textarea");
const initialHeight = inputTextarea.clientHeight;
const outputTextarea = document.querySelector(".main-output-textarea");
const outputImg = document.querySelector(".main-output-img");
const outputText = document.querySelector(".main-output-text");

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

function adjustHeight(textarea) {
    if (!window.innerWidth < 1024) return;

    textarea.style.height = "auto";
    if (textarea.scrollHeight > initialHeight) {
        textarea.style.height = textarea.scrollHeight + "px";
    } else {
        textarea.style.height = initialHeight + "px";
    }
}

function updateOutputHeight() {
    adjustHeight(outputTextarea);
}

function writeOutput(output) {
    outputImg.style.display = "none";
    outputText.style.display = "none";
    outputTextarea.value = output;
    updateOutputHeight();
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
});

document.addEventListener("DOMContentLoaded", (event) => {
    const inputTextarea = document.querySelector(".main-input-textarea");
    inputTextarea.addEventListener("input", () => adjustHeight(inputTextarea));

    adjustHeight(inputTextarea);
    adjustHeight(outputTextarea);
});
