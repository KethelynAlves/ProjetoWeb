let dadosFlores = [];

const QUANTIDADES_PEDIDO = {
    "Unitario": 1,
    "Pequeno": 6,
    "Medio": 12,
    "Grande": 20
};

function exibirErroEfocar(idCampo, mensagem){
    const campo = document.getElementById(idCampo);
    alert(mensagem)
    if (campo) {
        campo.focus();
    }
}


/*Validações do Formulário*/

function validarNome() {
    const nomeInput = document.getElementById('nome');
    const valorNome = nomeInput.value.trim();

    if (valorNome === "") {
        exibirErroEfocar('nome', "O campo nome é obrigatório.");
        return false;
    }
    return true;
}



function validarCelular(){
    const celularInput= document.getElementById('celular');
    const valorCelular = celularInput.value.trim();
    if (valorCelular === "") {
        exibirErroEfocar('celular', "O campo Celular é obrigatório.");
        return false;
    }
    const reCelular = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!reCelular.test(valorCelular)) {
        exibirErroEfocar('celular', "Por favor, insira um número de celular válido no formato (XX) XXXXX-XXXX.");
        return false;
    }
    return true; 
}


function validarEmailPura(email) {
    const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reEmail.test(email);
}

function validarEmail() {
    const emailInput = document.getElementById('email');
    const valorEmail = emailInput.value.trim();
    if (valorEmail === "") { 
        exibirErroEfocar('email', "O campo Email é obrigatório."); 
        return false;
    } if (!validarEmailPura(valorEmail)) { 
        exibirErroEfocar('email', "Por favor, insira um email válido."); 
        return false; 
    }
    return true; 
}

function validarEndereco(){
    const enderecoInput= document.getElementById('endereco');
    const valorEndereco = enderecoInput.value.trim();
    if (valorEndereco === "") {
        exibirErroEfocar('endereco', "O campo Endereço é obrigatório.");
        return false;
    }
    return true; 
}


function validarSelecaoFlor(){
    const container = document.getElementById('flores-selecao-container');
    if (!container) return true;
    const selecoes = container.querySelectorAll('input[type="checkbox"]:checked');
    if (selecoes.length === 0) {
        exibirErroEfocar(container.previousElementSibling.id || 'flores-selecao-container', "Por favor, selecione pelo menos uma flor/item para a encomenda.");
        return false;
    }
    return true; 
}


function validarDataRequerida(){
    const dataInput= document.getElementById('dataRequerida');
    const valorData = dataInput.value.trim();
    if (valorData === "") {
        exibirErroEfocar('dataRequerida', "O campo Data Requerida é obrigatório.");
        return false;
    }
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataRequerida = new Date(valorData+'T00:00:00');
    dataRequerida.setHours(0, 0, 0, 0);

    if (dataRequerida < hoje) {
        exibirErroEfocar('dataRequerida', "A data requerida não pode ser no passado.");
        return false;
    }
    return true; 
}

function validarHorarioRequerido(){
    const horarioInput= document.getElementById('horario');
    const valorhorario = horarioInput.value.trim();
    if (valorhorario === "") {
        exibirErroEfocar('horario', "O campo Horario Requerido é obrigatório.");
        return false;
    }
    return true;
}


function validarFormulario(){
    if (!validarNome()) return false;
    if (!validarCelular()) return false;
    if (!validarEmail()) return false;
    if (!validarEndereco()) return false;
    if (!validarSelecaoFlor()) return false
    if (!validarDataRequerida()) return false;
    if (!validarHorarioRequerido()) return false;
    return true;
} 

function validarFormularioContato(){
    if (!validarNome()) return false;
    if (!validarEmail()) return false;
    
    const assunto = document.getElementById('assunto');
    if (assunto && assunto.value === "") {
        exibirErroEfocar('assunto', "O campo Assunto é obrigatório.");
        return false;
    }
    const mensagem = document.getElementById('mensagem');
    if (mensagem && mensagem.value.trim() === "") {
        exibirErroEfocar('mensagem', "O campo Mensagem é obrigatório.");
        return false;
    }
    return true;
}

/*CÁLCULO DO TOTAL E CARREGAMENTO DAS FLORES*/

function calcularTotal() {
    const selecoes = document.querySelectorAll('#flores-selecao-container input[type="checkbox"]:checked');
    let precoTotalUnitario = 0;
    let itensSelecionados = [];
    
    selecoes.forEach(checkbox => {
        const nomeFlor = checkbox.value;
        const flor = dadosFlores.find(f => f.nome === nomeFlor);
        if (flor) {
            const preco = parseFloat(flor.valor);
            if (!isNaN(preco)) {
                precoTotalUnitario += preco;
            }
            itensSelecionados.push(`${nomeFlor} (R$ ${parseFloat(flor.valor).toFixed(2).replace('.', ',')})`);
        }
    });
    
    const pedidoTamanhoRadio = document.querySelector('input[name="Pedido"]:checked');
    let multiplicador = 1;

    if (pedidoTamanhoRadio) {
        const tamanho = pedidoTamanhoRadio.value;
        multiplicador = QUANTIDADES_PEDIDO[tamanho] || 1; 
    }
    
    const valorTotalFinal = precoTotalUnitario * multiplicador;

    const valorTotalElemento = document.getElementById('valor-total');
    if (valorTotalElemento) {
        valorTotalElemento.textContent = `Valor Total: R$ ${valorTotalFinal.toFixed(2).replace('.', ',')}`;
    }
    
    return {
        total: valorTotalFinal.toFixed(2).replace('.', ','),
        itens: itensSelecionados.length > 0 ? itensSelecionados.join('\n\t\t\t\t\t') : 'Nenhum item selecionado'
    };
}

function carregarFloresEncomenda(dados) {
    const container = document.getElementById('flores-selecao-container');
    if (!container) return; 

    container.innerHTML = '';
    const pontoMedio = Math.ceil(dados.length / 2);
    const row = document.createElement('div');
    row.className = 'row';

    const col1 = document.createElement('div');
    col1.className = 'col-md-6';
    
    const col2 = document.createElement('div');
    col2.className = 'col-md-6';
    
    row.appendChild(col1);
    row.appendChild(col2);
    container.appendChild(row);

    dados.forEach((flor, index) => {
        const targetCol = index < pontoMedio ? col1 : col2;
        const divItem = document.createElement('div');
        divItem.className = 'form-check'; 

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `flor-${flor.nome.replace(/\s/g, '-')}`;
        checkbox.name = 'floresSelecionadas';
        checkbox.value = flor.nome;
        checkbox.className = 'form-check-input'; 

        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        
        label.textContent = `${flor.nome} (R$ ${parseFloat(flor.valor).toFixed(2).replace('.', ',')})`;
        label.className = 'form-check-label';

        divItem.appendChild(checkbox);
        divItem.appendChild(label);
        targetCol.appendChild(divItem);
    });
    container.addEventListener('change', calcularTotal);
    calcularTotal();
}


/*DA BUSCA*/

function removeHighlights() {
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(span => {
        const parent = span.parentNode;
        parent.replaceChild(document.createTextNode(span.textContent), span);
        parent.normalize();
    });
}

function searchInPage(searchTerm) {
    if (!searchTerm) return;
    removeHighlights();
    const regex = new RegExp(searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
    const mainContent = document.querySelector('main');
    if (!mainContent) return;
    let matchesFound = false;

    function traverseAndHighlight(node) {
        if (node.nodeType === 3) { 
            const text = node.nodeValue;
            if (regex.test(text)) {
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;
                
                text.replace(regex, (match, offset) => {
                    fragment.appendChild(document.createTextNode(text.substring(lastIndex, offset)));
                    const span = document.createElement('span');
                    span.className = 'highlight';
                    span.textContent = match;
                    fragment.appendChild(span);
                    lastIndex = offset + match.length;
                    matchesFound = true;
                });
                
                fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
                node.parentNode.replaceChild(fragment, node);
            }
        } else if (node.nodeType === 1) { 
            if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.tagName !== 'BUTTON' && node.className !== 'highlight') {
                for (let i = node.childNodes.length - 1; i >= 0; i--) {
                    traverseAndHighlight(node.childNodes[i]);
                }
            }
        }
    }

    traverseAndHighlight(mainContent);
    
    if (matchesFound) {
        const firstHighlight = document.querySelector('.highlight');
        if (firstHighlight) {
            firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } else {
        alert(`Nenhuma ocorrência encontrada para "${searchTerm}".`);
    }
}








/*CARREGAR DADOS DA TABELA E FLORES*/

document.addEventListener('DOMContentLoaded', () => {
    const corpoTabela = document.getElementById('corpo-tabela');
    const mensagemErro = document.getElementById('mensagem-erro');
    const floresContainer = document.getElementById('flores-selecao-container');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const inputCelular = document.getElementById('celular');
    const formEncomenda = document.getElementById('encomenda');
    const formContato = document.getElementById('contato');

    async function carregarDados() {
        try {
            const response = await fetch('tabela.json'); 
            
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            
            const dados = await response.json();
            dadosFlores = dados; 

            if (corpoTabela) {
                corpoTabela.innerHTML = ''; 
                if (dados.length === 0) {
                    corpoTabela.innerHTML = '<tr><td colspan="3" class="text-center">Nenhum dado encontrado.</td></tr>';
                    return;
                }
                dados.forEach(item => {
                    const linha = document.createElement('tr');
                    linha.innerHTML = `
                        <td>${item.nome}</td>
                        <td>${item.definicao}</td>
                        <td>R$ ${parseFloat(item.valor).toFixed(2).replace('.', ',')}</td> 
                    `; 
                    corpoTabela.appendChild(linha);
                });
            }

            if (floresContainer) {
                carregarFloresEncomenda(dados);
            }

        } catch (error) {
            console.error('Falha ao carregar dados:', error);
            
            if (corpoTabela) {
                corpoTabela.innerHTML = '';
                mensagemErro.className = 'alert alert-danger mt-3';
                mensagemErro.textContent = `Erro ao carregar os dados: ${error.message}. Verifique o console para mais detalhes.`;
            }
            if (floresContainer) {
                 floresContainer.textContent = `Erro ao carregar opções: ${error.message}`;
            }
        }
    }

    if (corpoTabela || floresContainer) {
        carregarDados();
    }

    /*DO FORMULÁRIO DE ENCOMENDA*/
    if (formEncomenda){
        formEncomenda.addEventListener('submit', function(event){
            event.preventDefault();
            if (!validarFormulario()){
                console.log("Formulario Inválido. Corrija os erros.");
            } else {
                console.log("Formulário Válidado. Pronto para enviar.");
                const detalhesFlores = calcularTotal();
                const dados = {
                    nome: document.getElementById('nome').value.trim(),
                    celular: document.getElementById('celular').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    endereco: document.getElementById('endereco').value.trim(),
                    data: document.getElementById('dataRequerida').value.trim(),
                    horario: document.getElementById('horario').value.trim(),
                    pagamento: document.getElementById('pagamento').value,
                    pedido: document.getElementById('pedido').value.trim(),
                    pedidoTamanho: document.querySelector('input[name="Pedido"]:checked').value
                }
                const mensagem = `
                Pedido Confimardo!

                Dados da encomenda:
                ---------------------------------------------
                Nome: ${dados.nome}
                Celular: ${dados.celular}
                Email: ${dados.email}
                Endereço: ${dados.endereco}                    
                Detalhes da Encomenda:
                -------------------------------------
                Flor/Item:
                ${detalhesFlores.itens} 
                
                Tamanho do Pedido: ${dados.pedidoTamanho}(x${QUANTIDADES_PEDIDO[dados.pedidoTamanho]})
                Data Requerida: ${dados.data} às ${dados.horario}
                Pagamento: ${dados.pagamento}
                Valor Total: R$ ${detalhesFlores.total}
                Pedido Especial: ${dados.pedido || 'Nenhum'}
                    
                Aperte OK para finalizar.
                `
                alert(mensagem);
                formEncomenda.reset();
                calcularTotal();
            }
        });
    }

    /*DO FORMULARIO DE CONTATO*/
    if (formContato){
        formContato.addEventListener('submit', function(event){
            event.preventDefault();
            if (!validarFormularioContato()){
                console.log("Formulario Inválido! Corrija os erros.");
            } else {
                console.log("Formulário Válidado! Pronto para enviar.");
                const dadosC = {
                    nome: document.getElementById('nome').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    celular: document.getElementById('celular').value.trim(),
                    assunto: document.getElementById('assunto').value,
                    mensagem: document.getElementById('mensagem').value.trim()
                }
                const texto = `
                Mensagem enviada com sucesso!
                
                Dados do Contato:
                ------------------------------
                Nome: ${dadosC.nome}
                E-mail: ${dadosC.email}
                Celular: ${dadosC.celular || 'Não informado'}
                Assunto: ${dadosC.assunto}
                Mensagem:
                ${dadosC.mensagem}
                
                Obrigado por entrar em contato! Responderemos em breve.
                        `;
                
                        alert(texto);
                        formContato.reset();
            }
                    });
    }

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            searchInPage(searchTerm);
        });
        searchInput.addEventListener('input', removeHighlights);
    }

    if (corpoTabela || floresContainer) {
        carregarDados();
    }

    if (inputCelular){
        inputCelular.addEventListener('input', function (e) {
            let valor = e.target.value;
            valor = valor.replace(/\D/g, ""); 
            valor = valor.substring(0, 11);

            let valorFormatado = "";
            if (valor.length > 0) {
                valorFormatado = "(" + valor.substring(0, 2); 
            }
            if (valor.length > 2) {
                valorFormatado += ") " + valor.substring(2, 7); 
            }
            if (valor.length > 7) {
                valorFormatado += "-" + valor.substring(7, 11); 
            }
            e.target.value = valorFormatado;
        });
    }

    
});