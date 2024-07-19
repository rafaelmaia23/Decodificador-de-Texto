"use strict";

const encryptBtn = document.querySelector(".btn-criptografar");
const decryptBtn = document.querySelector(".btn-descriptografar");
const inputTextArea = document.querySelector(".input-text");
const outputTextArea = document.querySelector(".output-text");

function encrypt(input) {}

function decrypt(input) {}

function isInputValid(input) {
    const regex = /^[a-z]+$/;
    return regex.test(input);
}

function writeOutput(output) {
    //TODO sumir com img e h2
    outputTextArea.value = output;
}

encryptBtn.addEventListener(() => {
    const input = inputTextArea.value;
    if (!isInputValid(input)) {
        writeOutput(
            "Input invalido! Testo deve ser apenas letras minusculas e não conter acentos."
        );
        return;
    }
    const encryptedMsg = encrypt(input);
    writeOutput(encryptedMsg);
});

decryptBtn.addEventListener(() => {
    const input = inputTextArea.value;
    if (!isInputValid(input)) {
        writeOutput(
            "Input invalido! Testo deve ser apenas letras minusculas e não conter acentos."
        );
        return;
    }
    const decryptedMsg = decrypt(input);
    writeOutput(decryptedMsg);
});
