// SEMPRE USAR O CONSOLE DO F12 PARA SABER ONDE ESTÁ O ERRO.


// Querys para pegar os valores no HTML e declaração da minha lista de tarefas


const formTarefa = document.querySelector("#form-tarefa"); // form-tarefa é o ID do form do HTML
const inputTarefa = document.querySelector("#tarefa");
const inputObservacao = document.querySelector("#observacoes");
const listaTarefas = document.querySelector("#lista-tarefas");

let tarefas = [];


// Function para adicionar uma nova tarefa

formTarefa.addEventListener("submit", function (event) {
    event.preventDefault(); // previni que a página recarrega

    const nome = inputTarefa.value;
    const observacao = inputObservacao.value;

    const novaTarefa = {
        id: Date.now(),
        nome: nome,
        observacao: observacao,
        concluida: false
    };  

    tarefas.push(novaTarefa);

    renderizarTarefas(); // recarregar página || Sim é possível chamar a function antes de criá-la

    inputTarefa.value= "";
    inputObservacao.value= "";
});

function renderizarTarefas() {
  listaTarefas.innerHTML = "";

  tarefas.map(function (tarefa) {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>
        <strong>${tarefa.nome}</strong>
        <br>
        <small>${tarefa.observacao}</small>
      </td>

      <td>
        <span class="${tarefa.concluida ? "status-concluido" : "status-pendente"}">
          ${tarefa.concluida ? "Concluído" : "Pendente"}
        </span>
      </td>

      <td>
        <button onclick="marcarConcluida(${tarefa.id})" class="botao">
          Concluir
        </button>

        <button onclick="deletarTarefa(${tarefa.id})" class="botao">
          Deletar
        </button>
      </td>
    `;

    listaTarefas.appendChild(linha);
  });
}

    /* 
        MAP -  serve para percorrer as tarefas
        innerHTML - para criar conteúdo
        appendChild - para jogar na tabela.
    
    */

function marcarConcluida (id) {
    tarefas = tarefas.map(function (tarefa){
        if (tarefa.id === id) {
            return {
                ...tarefa,
                concluida: !tarefa.concluida
            };
        }

        return tarefa;
    });

    renderizarTarefas();
}


function deletarTarefa(id) {
    tarefas = tarefas.filter(function (tarefa) {
        return tarefa.id !== id;
    });

    renderizarTarefas();
}


