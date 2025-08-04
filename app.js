// Cria uma lista(array) para guardar os amigos
let amigos = []
let nome = ''
let sorteado = ''

// Função para verificar e atualizar o estado do botão de sortear
function atualizarBotaoSortear() {
    const botaoSortear = document.querySelector('.button-draw');
    if (amigos.length < 3) {
        botaoSortear.disabled = true;
        botaoSortear.style.opacity = '0.5';
        botaoSortear.style.cursor = 'not-allowed';
    } else {
        botaoSortear.disabled = false;
        botaoSortear.style.opacity = '1';
        botaoSortear.style.cursor = 'pointer';
    }
}

//Criando função para adicionar amigos
function adicionarAmigo() {
    // Seleciona o valor do imput e removes os possiveis espaços
    let inputNome = document.querySelector('input');
    let nome = inputNome.value.trim();      // Remove espaços

    // Caso o input estivar vazio, emite um alerta
    if (!nome) {
        alert('Por favor, digite um nome!');
        return
    }

    // Verifica se o nome já existe na lista
    if (amigos.includes(nome)) {
        alert('Este nome já foi adicionado!');
        return;
    }                                 

    // Adiciona o nome a lista amigos
    amigos.push(nome)                   

    // Mostra a lista no console (fins de consulta)
    console.log('Lista de amigos:', amigos)           

    limparCampo()         // Limpa o input
    verAmigos()           // Mostra a lista
    atualizarBotaoSortear() // Atualiza o estado do botão de sortear                          
}

// Função para remover um amigo da lista
function removerAmigo(index) {
    amigos.splice(index, 1);
    console.log('Lista atualizada:', amigos);
    verAmigos();
    atualizarBotaoSortear();
    
    // Limpa o resultado se não há mais amigos suficientes
    if (amigos.length < 3) {
        let resultado = document.getElementById('resultado');
        resultado.textContent = '';
    }
}

function sortearAmigo() {
    if (amigos.length < 3 ) {
        alert('Adicione ao menos três pessoas antes de sortear.');
        return;
    }

    // Sorteio Simples - cada pessoa recebe um amigo único
    const resultados = sortearSimples();
    
    mostrarResultados(resultados);
}

//Sorteio Simples - Cada pessoa recebe um amigo único
function sortearSimples() {
    // Cria uma cópia da lista para não alterar a original
    let amigosDisponiveis = [...amigos];
    let resultados = [];
    
    // Para cada pessoa, sorteia um amigo diferente
    amigos.forEach(pessoa => {
        // Remove a própria pessoa das opções (ninguém pode ser amigo secreto de si mesmo)
        let opcoes = amigosDisponiveis.filter(amigo => amigo !== pessoa);
        
        // Se não há opções, reorganiza o sorteio
        if (opcoes.length === 0) {
            return sortearSimples(); // Tenta novamente
        }
        
        // Sorteia um amigo aleatório das opções disponíveis
        let indiceAleatorio = Math.floor(Math.random() * opcoes.length);
        let amigoSorteado = opcoes[indiceAleatorio];
        
        // Adiciona o resultado
        resultados.push({
            pessoa: pessoa,
            amigoSecreto: amigoSorteado
        });
        
        // Remove o amigo sorteado da lista de disponíveis
        amigosDisponiveis = amigosDisponiveis.filter(amigo => amigo !== amigoSorteado);
    });
    
    return resultados;
}


function mostrarResultados(resultados) {
    console.log('=== RESULTADO DO SORTEIO ===');
    
    // Limpa a lista de amigos da tela
    let ul = document.getElementById('listaAmigos');
    ul.innerHTML = '';
    
    // Mostra todos os resultados na tela
    let ulResultado = document.getElementById('resultado');
    ulResultado.innerHTML = '<h3 style="color: #4B69FD; margin-bottom: 15px;">🎉 Sorteio Realizado!</h3>';
    
    resultados.forEach(resultado => {
        console.log(`${resultado.pessoa} → ${resultado.amigoSecreto}`);
        
        let li = document.createElement('li');
        li.innerHTML = `
            <div class="resultado-item">
                <strong>${resultado.pessoa}</strong> vai dar presente para <strong>${resultado.amigoSecreto}</strong>
            </div>
        `;
        ulResultado.appendChild(li);
    });
    
    // Adiciona botão para novo sorteio
    let botaoNovoSorteio = document.createElement('button');
    botaoNovoSorteio.textContent = '🔄 Sortear Novamente';
    botaoNovoSorteio.className = 'button-novo-sorteio';
    botaoNovoSorteio.onclick = () => {
        ulResultado.innerHTML = '';
        verAmigos();
    };
    
    ulResultado.appendChild(botaoNovoSorteio);
}

function verSorteado(sorteado) {
    let ul = document.getElementById('resultado');     // Seleciona a <ul> do resultado
    ul.textContent = `Amigo sorteado: ${sorteado}`;
}

function limparCampo() {
    nome = document.querySelector('input');
    nome.value = '';    
}

// Função para vizualizar os nomes na tela
function verAmigos() {
    let ul = document.getElementById('listaAmigos');     // Seleciona a <ul> da lista
    ul.innerHTML = '';

    amigos.forEach((nome, index) => {        //Cria o elemento 
        let li = document.createElement('li');
        li.className = 'friend-item';
        
        // Cria o container para nome e botão
        let friendContainer = document.createElement('div');
        friendContainer.className = 'friend-container';
        
        // Cria o span para o nome
        let nameSpan = document.createElement('span');
        nameSpan.textContent = nome;
        nameSpan.className = 'friend-name';
        
        // Cria o botão de remover
        let removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.className = 'button-remove';
        removeButton.onclick = () => removerAmigo(index);
        removeButton.setAttribute('aria-label', `Remover ${nome}`);
        
        // Adiciona nome e botão ao container
        friendContainer.appendChild(nameSpan);
        friendContainer.appendChild(removeButton);
        
        // Adiciona o container ao li
        li.appendChild(friendContainer);
        ul.appendChild(li);
    })
}

// Função para lidar com a tecla Enter
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        adicionarAmigo();
    }
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona o event listener para a tecla Enter no input
    const input = document.querySelector('input');
    input.addEventListener('keypress', handleKeyPress);
    
    // Inicializa o estado do botão de sortear
    atualizarBotaoSortear();
});