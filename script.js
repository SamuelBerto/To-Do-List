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


input.value = '';
salvar();
renderizar();
}

function renderizar() {
    lista.innerHTML = '';
     
    let tarefasFiltradas = tarefas.filter (t =>{
        if (filtroAtual === 'ativas') return !t.concluida;
        if (filtroAtual === 'concluidas') return t.concluida;
        return true;
    });

    tarefasFiltradas.forEach((tarefa, index)) => {
        const li =document.createElement('li');

        li.innerHTML = `
         <span class="${tarefa.concluida ? 'concluida' : ''}">${tarefa.texto}</span>
         <button onclick="removerTarefa(${index})">x</button>
         `;

         li.querySelector("span").onclick =() => {
            tarefa.concluida = !tarefa.concluida;
            salvar();
            renderizar();
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

    function filtrar(tipo){
        filtroAtual = tipo;
        renderizar();  
    }

    function limparConcluidas() {
        tarefas = tarefas.filter (t => !t.concluida);
        salvar();
        renderizar();
    }
    function atualizarContador() {
        const restantes = tarefas.filter(t => !t.concluida).length;
        contador.textContent = `${restantes} tarefas restantes`;
    }

renderizar();


