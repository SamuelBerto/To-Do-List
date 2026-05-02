let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let filtroAtual = 'todas';

const input = document.getElementById("inputTarefa");
const lista = document.getElementById('listaTarefas');
const contador = document.getElementById('contador');

document.getElementById('btnAdd').onclick = adcionarTarefa;
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') 
        adcionarTarefa();
    
});

function salvar() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function adcionarTarefa() {
    if (input.value.trim() === '') return;

    tarefas.push({ texto: input.value, concluida: false });

}
input.value = '';
salvar();
renderizarTarefas();

function renderizarTarefas() {}
