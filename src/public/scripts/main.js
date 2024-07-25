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
}

function outputAdjustHeight(textarea) {
    if (!(window.innerWidth < 1024)) return;
    textarea.style.height = "auto";
    const currentHeight = textarea.scrollHeight;
    const newHeight = Math.max(currentHeight, outputInitialHeight);
    textarea.style.height = newHeight + "px";
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
    inputTextarea.addEventListener("input", () =>
        inputAdjustHeight(inputTextarea)
    );
});
