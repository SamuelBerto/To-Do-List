let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let clickTimer = null; // 🔥 ISSO FALTAVA

const input = document.getElementById("inputTarefa");
const lista = document.getElementById('listaTarefas');
const contador = document.getElementById('contador');

document.getElementById('btnAdd').onclick = adicionarTarefa;
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') adicionarTarefa();
});

function salvar() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function adicionarTarefa() {
    if (input.value.trim() === '') return;

    tarefas.push({ texto: input.value, concluida: false });


    input.value = '';
    salvar();
    renderizar();
}

function renderizar() {
    lista.innerHTML = '';

    let tarefasFiltradas = tarefas;

    tarefasFiltradas.forEach((tarefa) => {
        const indexReal = tarefas.indexOf(tarefa);

        const li = document.createElement('li'); 

     li.innerHTML = `
    <span>
        ${tarefa.concluida ? '✔️ ' : ''}${tarefa.texto}
    </span>
    <button class="remover">x</button>
`;

// ✔ CLIQUE (concluir)

li.onclick = (e) => {
    if (e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") return;

    if (clickTimer !== null) return;

    clickTimer = setTimeout(() => {
        tarefa.concluida = !tarefa.concluida;
        salvar();
        renderizar();
        clickTimer = null;
    }, 200);
};


//// ✏️ DUPLO CLIQUE (editar)

li.ondblclick = (e) => {
    e.stopPropagation(); // 🔥 impede conflito

    clearTimeout(clickTimer);
    clickTimer = null;

    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = tarefa.texto;

    li.innerHTML = "";
    li.appendChild(inputEdit);

    inputEdit.focus();

    inputEdit.onkeypress = (e) => {
        if (e.key === "Enter") {
            tarefa.texto = inputEdit.value;
            salvar();
            renderizar();
        }
    };

    inputEdit.onblur = () => {
        renderizar();
    };
};

//remover tarefa

li.querySelector(".remover").onclick = (e) => {
    e.stopPropagation(); 
    removerTarefa(indexReal);
};

        lista.appendChild(li);
    });



    atualizarContador();
}

function removerTarefa(index) {
    tarefas.splice(index, 1);
    salvar();
    renderizar();
}

function atualizarContador() {
    const restantes = tarefas.filter(t => !t.concluida).length;
    contador.textContent = `${restantes} tarefas restantes`;
}
function limparTudo() {
    if (confirm("Tem certeza que deseja apagar tudo?")) {
        tarefas = [];
        salvar();
        renderizar();
    }
}


renderizar();


