let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];


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
        li.onclick = () => {
    tarefa.concluida = !tarefa.concluida;
    salvar();
    renderizar();
};

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


