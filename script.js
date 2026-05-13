const componentes = document.querySelectorAll(".componente");
const links = document.querySelectorAll(".lista a");
const toggles = document.querySelectorAll(".toggle");

function seleccionarComponente(componente) {

    const yaSeleccionado = componente.classList.contains("seleccionado");

    componentes.forEach(c => {
        c.classList.remove("seleccionado");
    });

    if (!yaSeleccionado) {
        componente.classList.add("seleccionado");
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

        componente.scrollIntoView({
            behavior: "smooth"
        });

        seleccionarComponente(componente);

    });

});

const imagenes = document.querySelectorAll("img");
const modal = document.getElementById("modal");
const imagenModal = document.getElementById("imagen-modal");
const cerrar = document.querySelector(".cerrar");

imagenes.forEach(imagen => {

    imagen.addEventListener("click", () => {

        modal.style.display = "flex";

        imagenModal.src = imagen.src;

    });

});

cerrar.addEventListener("click", () => {

    modal.style.display = "none";

});