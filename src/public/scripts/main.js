"use strict";

const encryptBtn = document.querySelector(".btn-encrypt");
const decryptBtn = document.querySelector(".btn-decrypt");
const copyBtn = document.querySelector(".btn-copy");
const inputTextArea = document.querySelector(".main-input-textarea");
const outputTextArea = document.querySelector(".main-output-textarea");
const outputImg = document.querySelector(".main-output-img");
const outputHeading = document.querySelector(".main-output-text");

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

function writeOutput(output) {
    outputImg.style.display = "none";
    outputHeading.style.display = "none";
    outputTextArea.value = output;
}

encryptBtn.addEventListener("click", () => {
    const input = inputTextArea.value;
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
    const input = inputTextArea.value;
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
    const inputTextArea = document.querySelector(".main-input-textarea");
    const outputTextArea = document.querySelector(".main-output-textarea");

    const adjustHeight = (textarea) => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    };

    inputTextArea.addEventListener("input", () => adjustHeight(inputTextArea));
    outputTextArea.addEventListener("input", () =>
        adjustHeight(outputTextArea)
    );

    // adjustHeight(inputTextArea);
    // adjustHeight(outputTextArea);
});
