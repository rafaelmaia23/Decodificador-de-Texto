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
const mobileMenu = document.querySelector(".header-navbar-icon");
const svgMenuIcon = document.querySelector(".svg-menu-icon");
const svgCloseIcon = document.querySelector(".svg-close-icon");
const navList = document.querySelector(".header-navbar-list");
const selectElement = document.querySelector(".main-input-encryption-select");
const secretKey = "3A49F78E57E992A998E8214BC852A";

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

const encryptTypes = {
    base64: encryptBase64(),
};

function encrypt(input, type) {
    let encryptedInput;
    switch (type) {
        case "base64":
            encryptedInput = encryptBase64(input);
            break;
        case "AES":
            encryptedInput = encryptAES(input);
            break;
        default:
            encryptedInput = encryptBase64(input);
    }
    return encryptedInput;
}

function decrypt(input, type) {
    let decryptedInput;
    switch (type) {
        case "base64":
            decryptedInput = decryptBase64(input);
            break;
        case "AES":
            decryptedInput = decryptAES(input);
            break;
        default:
            decryptedInput = decryptBase64(input);
    }
    return decryptedInput;
}

function encryptBase64(input) {
    return btoa(input);
}

function decryptBase64(input) {
    return atob(input);
}

function encryptAES(input) {
    return CryptoJS.AES.encrypt(input, secretKey).toString();
}

function decryptAES(input) {
    return CryptoJS.AES.decrypt(input, secretKey).toString(CryptoJS.enc.Utf8);
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
        inputAdjustHeight(inputTextarea)
    );
});

// selectElement.addEventListener("mouseover", (event) => {
//     const options = event.target.children;
//     for (let option of options) {
//         option.addEventListener("mouseover", () => {
//             option.style.backgroundColor = "#00635d";
//             option.style.color = "#e9e9e9";
//         });
//         option.addEventListener("mouseout", () => {
//             option.style.backgroundColor = "#e9e9e9";
//             option.style.color = "#00635d";
//         });
//     }
// });
