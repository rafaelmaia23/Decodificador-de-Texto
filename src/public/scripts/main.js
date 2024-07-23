"use strict";

const encryptBtn = document.querySelector(".btn-criptografar");
const decryptBtn = document.querySelector(".btn-descriptografar");
const inputTextArea = document.querySelector(".input-text");
const outputTextArea = document.querySelector(".output-text");
const outputImg = document.querySelector(".output-area-img");
const outputHeading = document.querySelector(".output-area-heading");

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
    //TODO sumir com img e h2
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
