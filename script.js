const componentes = document.querySelectorAll(".componente");
const links = document.querySelectorAll(".lista a");
const toggles = document.querySelectorAll(".toggle");

// ─── ACORDEÓN ────────────────────────────────────────────────────────────────

function seleccionarComponente(componente) {

    const yaSeleccionado = componente.classList.contains("seleccionado");

    componentes.forEach(c => {
        c.classList.remove("seleccionado");
    });

    // MEJORA: sincronizar el link activo en la lista
    links.forEach(l => l.classList.remove("activo"));

    if (!yaSeleccionado) {
        componente.classList.add("seleccionado");

        // MEJORA: marcar el link correspondiente como activo
        const id = componente.getAttribute("id");
        const linkActivo = document.querySelector(`.lista a[href="#${id}"]`);
        if (linkActivo) linkActivo.classList.add("activo");
    }
}

toggles.forEach(toggle => {

    toggle.addEventListener("click", () => {

        const componente = toggle.parentElement;
        seleccionarComponente(componente);

    });

});

links.forEach(link => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        const id = link.getAttribute("href").substring(1);
        const componente = document.getElementById(id);

        componente.scrollIntoView({ behavior: "smooth" });

        // Si ya estaba seleccionado, no lo cerramos al hacer clic desde la lista
        if (!componente.classList.contains("seleccionado")) {
            seleccionarComponente(componente);
        }

    });

});


// ─── MODAL DE IMÁGENES ───────────────────────────────────────────────────────

const imagenes = document.querySelectorAll("img");
const modal = document.getElementById("modal");
const imagenModal = document.getElementById("imagen-modal");
const cerrar = document.querySelector(".cerrar");

function abrirModal(src, alt) {
    imagenModal.src = src;
    // CORRECCIÓN: actualizar el alt de la imagen en el modal
    imagenModal.alt = alt || "Imagen ampliada";

    // MEJORA: usar clase en lugar de manipular style directamente
    modal.classList.add("abierto");

    // MEJORA: bloquear scroll del fondo al abrir modal
    document.body.style.overflow = "hidden";
}

function cerrarModal() {
    modal.classList.remove("abierto");

    // MEJORA: restaurar scroll al cerrar
    document.body.style.overflow = "";
}

imagenes.forEach(imagen => {

    imagen.addEventListener("click", (e) => {

        // CORRECCIÓN: evitar que el click en la imagen propague al acordeón
        e.stopPropagation();

        abrirModal(imagen.src, imagen.alt);

    });

});

// Cerrar con el botón ✕
cerrar.addEventListener("click", cerrarModal);

// CORRECCIÓN: cerrar al hacer clic en el fondo del modal (fuera de la imagen)
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        cerrarModal();
    }
});

// MEJORA: cerrar con la tecla Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("abierto")) {
        cerrarModal();
    }
});

// MAP de la navbar
const secciones = document.querySelectorAll("[id]");
const linksNavbar = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {

    let actual = "";
    let mayorVisible = 0;

    secciones.forEach(seccion => {

        const rect = seccion.getBoundingClientRect();

        const visible =
            Math.min(rect.bottom, window.innerHeight) -
            Math.max(rect.top, 0);

        if (visible > mayorVisible) {

            mayorVisible = visible;
            actual = seccion.id;
        }
    });

    linksNavbar.forEach(link => {

        link.classList.remove("activo");

        if (link.getAttribute("href") === `#${actual}`) {
            link.classList.add("activo");
        }
    });
});