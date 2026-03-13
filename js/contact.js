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
    const contactoEstado = document.getElementById('contactoEstado');
    const galeriaElementos = document.getElementById('galeriaElementos');
    const formFeedback = document.getElementById('formFeedback');
    const contactForm = document.getElementById('contactForm');

    const filtroCategoria = document.getElementById('filtroCategoria');
    const filtroEstado = document.getElementById('filtroEstado');

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

        function obtenerNombreCampo(element) {
            const label = document.querySelector(`label[for="${element.id}"]`);
            if (label) return label.textContent.replace(':', '').trim();
            if (element === contactoRadioH || element === contactoRadioM) return 'Género';
            return element.name || 'Campo';
        }

        const nombreCampoLegible = obtenerNombreCampo(element);

        if (element === contactoNombre || element === contactoApellidos) {
            if (valor.length === 0 || !regexTexto.test(valor)) {
                esValido = false;
                if (valor.length === 0) mensajeError(`El campo "${nombreCampoLegible}" no puede estar vacío.`);
                else mensajeError(`El campo "${nombreCampoLegible}" solo debe contener letras.`);
            } else {
                if (errorExistente) errorExistente.remove();
                esValido = true;
            }
        }
        else if (element === contactoCorreo) {
            if (!valor.includes("@") || !valor.includes(".") || valor.length === 0) {
                esValido = false;
                mensajeError(`Revisa el formato del "${nombreCampoLegible}". Debe incluir un un "@" y un dominio válido.`);
            } else {
                if (errorExistente) errorExistente.remove();
                esValido = true;
            }
        }
        else if (element === contactoTelefono) {
            if (valor.length > 0) {
                const partes = valor.split(' ');
                if (!valor.startsWith("+") || partes.length < 3) {
                    esValido = false;
                    mensajeError(`El formato de "${nombreCampoLegible}" debe incluir el prefijo (ej: +34 600 000 000).`);
                } else {
                    if (errorExistente) errorExistente.remove();
                    esValido = true;
                }
            } else {
                 if (errorExistente) errorExistente.remove();
                 esValido = true; 
            }
        }
        else if (element === contactoFecha) {
            if (valor === "") {
                esValido = false;
                mensajeError(`Por favor, selecciona una "${nombreCampoLegible}" válida.`);
            } else {
                if (errorExistente) errorExistente.remove();
                esValido = true;
            }
        }
        else if (element === contactoRadioH || element === contactoRadioM) {
            if (!contactoRadioH.checked && !contactoRadioM.checked) {
                esValido = false;
                mensajeError(`Debes seleccionar una opción para "${nombreCampoLegible}".`);
            } else {
                if (errorExistente) errorExistente.remove();
                esValido = true;
            }
        }
        else if (element === contactoAsunto || element === contactoEstado) {
            if (valor === "") {
                esValido = false;
                mensajeError(`Por favor, selecciona una opción válida para "${nombreCampoLegible}".`);
            } else {
                if (errorExistente) errorExistente.remove();
                esValido = true;
            }
        }
        else if (element === contactoMensaje) {
            if (valor.length < 20) {
                esValido = false;
                mensajeError(`El "${nombreCampoLegible}" debe tener al menos 20 caracteres para aportar contexto suficiente.`);
            } else {
                if (errorExistente) errorExistente.remove();
                esValido = true;
            }
        }

        if (esValido) {
            element.classList.remove('invalid');
            element.classList.add('valid');
        } else {
            element.classList.remove('valid');
            element.classList.add('invalid');
        }
        
        return esValido;
    }

    campos.forEach(element => { if (element) element.addEventListener('input', () => validarCampo(element))});

    function cargarElementosStorage() {
        const data = localStorage.getItem('gestorElementosContactos');
        if (data) {
            try {
                const elementosGuardados = JSON.parse(data);
                elementosGuardados.forEach(item => {
                    crearElementoGaleria(item.id, item.nombre, item.apellido, item.correo, item.telefono, item.fecha, item.genero, item.asunto, item.estado, item.mensaje, false);
                });
            } catch (err) {
                console.error('Error al parsear el localStorage de elementos', err);
            }
        }
    }

    function guardarElementosStorage(elementos) { localStorage.setItem('gestorElementosContactos', JSON.stringify(elementos)); }


    contactoSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        let formularioTodoCorrecto = true;

        campos.forEach(campo => { if (!validarCampo(campo)) formularioTodoCorrecto = false; });

        if (formularioTodoCorrecto) {
            formFeedback.textContent = "¡Elemento añadido con éxito!";
            formFeedback.style.color = "green";
            setTimeout(() => { formFeedback.textContent = ""; }, 3000);

            const idItem = Date.now().toString();

            const nombre = contactoNombre.value.trim();
            const apellido = contactoApellidos.value.trim();
            const correo = contactoCorreo.value.trim();
            const telefono = contactoTelefono.value.trim() || 'No facilitado';
            const fecha = contactoFecha.value;
            const genero = contactoRadioH.checked ? 'Hombre' : 'Mujer';
            const asunto = contactoAsunto.value;
            const estado = contactoEstado.value;
            const mensaje = contactoMensaje.value.trim();

            crearElementoGaleria(idItem, nombre, apellido, correo, telefono, fecha, genero, asunto, estado, mensaje, true);

            contactForm.reset();
            campos.forEach(campo => { 
                if(campo) {
                    campo.classList.remove('invalid');
                    campo.classList.remove('valid');
                }
            });
        } else {
            formFeedback.textContent = "Por favor, corrige los errores antes de enviar.";
            formFeedback.style.color = "red";
        }
    });

    function crearElementoGaleria(id, nombre, apellido, correo, telefono, fecha, genero, asunto, estado, mensaje, guardar = false) {
        const article = document.createElement('article');
        article.classList.add('elemento-card');
        article.dataset.id = id;
        
        article.dataset.categoria = asunto;
        article.dataset.estado = estado;
        article.innerHTML = `
            <h3>${nombre} ${apellido}</h3>
            <div style="font-size: 0.9rem; color: #555; margin-bottom: 0.5rem;">
                <div><strong style="color: black;">Email:</strong> ${correo}</div>
                <div><strong style="color: black;">Tel:</strong> ${telefono}</div>
                <div><strong style="color: black;">Nacimiento:</strong> ${fecha}</div>
                <div><strong style="color: black;">Género:</strong> ${genero}</div>
            </div>
            <p><strong>Asunto:</strong> <span class="badge categoria-${asunto}">${asunto}</span></p>
            <p><strong>Urgencia:</strong> <span class="badge urgencia-${estado}">${estado}</span></p>
            <p class="elemento-msj">${mensaje}</p>
            <button class="btn-eliminar">Eliminar</button>
        `;

        const btnEliminar = article.querySelector('.btn-eliminar');
        btnEliminar.addEventListener('click', (eventoBtn) => {
            const elementoBorrable = eventoBtn.target.closest('.elemento-card');

            if (elementoBorrable) {
                elementoBorrable.classList.add('fade-out');

                setTimeout(() => {
                    elementoBorrable.remove();
                    
                    const stored = JSON.parse(localStorage.getItem('gestorElementosContactos') || '[]');
                    const updated = stored.filter(item => item.id !== id);
                    guardarElementosStorage(updated);
                }, 400); 
            }
        });

        galeriaElementos.appendChild(article);

        if (guardar) {
            const nuevoRegistro = { id, nombre, apellido, correo, telefono, fecha, genero, asunto, estado, mensaje };
            const stored = JSON.parse(localStorage.getItem('gestorElementosContactos') || '[]');
            stored.push(nuevoRegistro);
            guardarElementosStorage(stored);
        }
    }

    function aplicarFiltros() {
        const catFiltro = filtroCategoria.value;
        const estFiltro = filtroEstado.value;
        const elementos = galeriaElementos.querySelectorAll('.elemento-card');

        elementos.forEach(el => {
            const catItem = el.dataset.categoria;
            const estItem = el.dataset.estado;

            const coincideCat = (catFiltro === "todos" || catFiltro === catItem);
            const coincideEst = (estFiltro === "todos" || estFiltro === estItem);

            el.classList.toggle('hidden', !(coincideCat && coincideEst));
        });
    }

    filtroCategoria.addEventListener('change', aplicarFiltros);
    filtroEstado.addEventListener('change', aplicarFiltros);

    cargarElementosStorage();
});