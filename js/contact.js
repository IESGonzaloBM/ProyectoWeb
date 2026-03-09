'use strict';

document.addEventListener('DOMContentLoaded', e => {
    const contactoNombre = document.getElementById('contactoNombre');
    const contactoApellidos = document.getElementById('contactoApellidos');
    const contactoCorreo = document.getElementById('contactoCorreo');
    const contactoTelefono = document.getElementById('contactoTelefono');
    const contactoFecha = document.getElementById('contactoFecha');
    const contactoRadioH = document.getElementById('contactoRadioH');
    const contactoRadioM = document.getElementById('contactoRadioM');
    const contactoAsunto = document.getElementById('contactoAsunto');
    const contactoMensaje = document.getElementById('contactoMensaje');
    const contactoSubmit = document.getElementById('contactoSubmit');
    console.log(e)
    const campos = [contactoNombre, contactoApellidos, contactoCorreo, contactoTelefono, contactoFecha, contactoRadioH, contactoRadioM, contactoAsunto, contactoMensaje];

    function validarCampo(element) {
        if (!element) return false;

        let esValido = true;
        const valor = element.value.trim();
        const regexTexto = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
        const errorExistente = element.parentElement.querySelector(".mensaje-error");

        function mensajeError(msg) {
            if (!errorExistente) {
                const divError = document.createElement("div");
                divError.textContent = msg;
                divError.classList.add("mensaje-error");
                divError.style.color = "red";
                divError.style.fontSize = "12px";
                element.parentElement.appendChild(divError);
            }
        }

        if (element === contactoNombre || element === contactoApellidos) {
            if (valor.length === 0 || !regexTexto.test(valor)) {
                esValido = false;
                if (element === contactoNombre) mensajeError(`Campo ${contactoNombre} vacio`);
                else mensajeError(`Campo ${contactoApellidos} incorrecto`);
            } else {
                if (errorExistente) errorExistente.remove();
                esValido = true;
            }
        }
        else if (element === contactoCorreo) {
            if (!valor.includes("@") || !valor.includes(".") || valor.length === 0) {
                esValido = false;
                mensajeError(`Campo ${contactoCorreo} incorrecto`);
            } else {
                if (errorExistente) errorExistente.remove();
                esValido = true;
            }
        }
        else if (element === contactoTelefono) {
            const partes = valor.split(' ');
            if (!valor.startsWith("+") || partes.length !== 4) {
                esValido = false;
                mensajeError(`Campo ${contactoTelefono} incorrecto, respeta el formato telefonico`);
            } else {
                if (errorExistente) errorExistente.remove();
                esValido = true;
            }
        }
        else if (element === contactoFecha) {
            if (valor === "") {
                esValido = false;
                mensajeError(`Campo ${contactoFecha} incorrecto, respeta el formato fecha`);
            } else {
                if (errorExistente) errorExistente.remove();
                esValido = true;
            }
        }
        else if (element === contactoRadioH || element === contactoRadioM) {
            if (!contactoRadioH.checked && !contactoRadioM.checked) {
                esValido = false;
                if (!contactoRadioH.checked) mensajeError(`Campo ${contactoRadioH} incorrecto`);
                else mensajeError(`Campo ${contactoRadioM} incorrecto`);
            } else {
                if (errorExistente) errorExistente.remove();
                esValido = true;
            }
        }
        else if (element === contactoAsunto) {
            if (valor === "") {
                esValido = false;
                mensajeError(`Campo ${contactoAsunto} incorrecto`);
            } else {
                if (errorExistente) errorExistente.remove();
                esValido = true;
            }
        }
        else if (element === contactoMensaje) {
            if (valor.length < 50) {
                esValido = false;
                mensajeError(`Campo ${contactoAsunto} incorrecto`);
            } else {
                if (errorExistente) errorExistente.remove();
                esValido = true;
            }
        }

        element.style.borderColor = esValido ? "#028090" : "red";
        return esValido;
    }

    campos.forEach(element => {
        if (element) element.addEventListener('input', () => validarCampo(element));
    });

    contactoSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        let formularioTodoCorrecto = true;

        campos.forEach(campo => {
            if (!validarCampo(campo)) formularioTodoCorrecto = false;
        });
    });
});