const componentes = document.querySelectorAll(".componente");

componentes.forEach(componente => {

    componente.addEventListener("click", () => {

        componente.classList.toggle("activo");

    });

});

const links = document.querySelectorAll(".lista a");

links.forEach(link => {

    link.addEventListener("click", () => {

        const id = link.getAttribute("href").substring(1);

        const componente = document.getElementById(id);

        document.querySelectorAll(".componente").forEach(c => {
            c.classList.remove("seleccionado");
        });

        componente.classList.add("seleccionado");

    });

});