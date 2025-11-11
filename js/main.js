import { convert, validate } from "./convert.js";
import {domElements} from "./dom.js"

function printConvert() {
    const bases = { "Decimal": 10, "Binario": 2, "Octal": 8, "Hexadecimal": 16 };
    const sistem = domElements.select.value;
    let base = bases[sistem];
    let num = domElements.input.value;

    if(validate(num, base)) {
        const converted = convert(num, base)
        domElements.outputs["Bin"].innerText = converted["bin"];
        domElements.outputs["Hexa"].innerText = converted["hex"];
        domElements.outputs["Oct"].innerText = converted["oct"];
        domElements.outputs["Dec"].innerText = converted["dec"];
    }
    else renderError(base)
};

function renderError(base) {
    const errs = {
        2: "El número no es binario. Solo puede contener 1 y 0.",
        8: "El número no es octal. Solo puede contener números del 0 al 7.",
        10: "El número no es decimal. Solo puede contener 0 al 9.",
        16: "El número no es hexadecimal. Solo puede contener 0 al 9 y letras de la A a la F.",
    }
    domElements.err.innerText = errs[base]
};

function clear() {
    domElements.input.value = "";
    domElements.outputs["Bin"].innerText = "-";
    domElements.outputs["Oct"].innerText = "-";
    domElements.outputs["Hexa"].innerText = "-";
    domElements.outputs["Dec"].innerText = "-";
    clearErr();
};

function clearErr() {
    if (domElements.err.textContent !== "") domElements.err.textContent = "";
};

function changeSistemEx() {
    const ex = {
        Decimal: "Ej: 123456789",
        Binario: "Ej: 1001",
        Octal: "Ej: 1234567",
        Hexadecimal: "Ej: 2b",
    };
    let sistem = domElements.select.value;
    domElements.input.placeholder = ex[sistem];
};

async function copyClipBoard(base) {
    let num = domElements.outputs[base].textContent;
    try {
        await navigator.clipboard.writeText(num);
    } catch (err) {
        console.error(err);
        alert("Hubo un error en la copia del numero.");
    };
};

function managementEvent() {
    if (domElements.input.value == "") {
        domElements.err.textContent = "El campo esta vacio.";
        return;
    };
    clearErr();
    printConvert();
};

window.addEventListener("load", () => {

    domElements.form.addEventListener("submit", (e) => {
        e.preventDefault();
        let target = e.submitter;
        if (e.submitter.id == "convert") {
            managementEvent();
        }
        else if (target.id == "clear") {
            clear();
        };
    });

    domElements.select.addEventListener("change", (e) => {
        changeSistemEx();
    });
    domElements.answerSection.addEventListener("click", (e) => {
        let button = e.target.closest("button");
        if (button) copyClipBoard(button.id);
    });
})
