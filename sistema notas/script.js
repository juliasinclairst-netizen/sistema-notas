
const formulario = document.getElementById("formNotas");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const nota1 = document.getElementById("nota1").value.replace(",", ".");
    const nota2 = document.getElementById("nota2").value.replace(",", ".");
    const nota3 = document.getElementById("nota3").value.replace(",", ".");

    if (nome === "") {
        resultado.innerHTML = '<p class="erro">Digite o nome do estudante.</p>';
        return;
    }

    if (nota1 === "" || nota2 === "" || nota3 === "") {
        resultado.innerHTML = '<p class="erro">Preencha todas as notas.</p>';
        return;
    }

    const n1 = Number(nota1);
    const n2 = Number(nota2);
    const n3 = Number(nota3);

    if (
        !Number.isFinite(n1) || !Number.isFinite(n2) ||
        !Number.isFinite(n3) ||
        n1 < 0 || n1 > 10 ||
        n2 < 0 || n2 > 10 ||
        n3 < 0 || n3 > 10
    ) {
        resultado.innerHTML = '<p class="erro">Digite notas válidas entre 0 e 10.</p>';
        return;
    }

    const media = (n1 + n2 + n3) / 3;

    let situacao = "";
    let classe = "";

    if (media >= 7) {
        situacao = "Aprovado";
        classe = "aprovado";
    } else if (media >= 5) {
        situacao = "Recuperação";
        classe = "recuperacao";
    } else {
        situacao = "Reprovado";
        classe = "reprovado";
    }

    resultado.innerHTML = `
        <h3>Resultado do estudante</h3>
        <p><strong>Nome:</strong> ${nome.replace(/[&<>"']/g, function(letra) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            }[letra];
        })}</p>
        <p><strong>Média:</strong> ${media.toFixed(2).replace(".", ",")}</p>
        <p class="${classe}">Situação: ${situacao}</p>
    `;
});

formulario.addEventListener("reset", function() {
    resultado.innerHTML = "";
});
