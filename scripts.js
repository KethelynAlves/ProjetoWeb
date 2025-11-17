const form = document.getElementById('encomenda');
if (form){
    form.addEventListener('submit', function(event){
        event.preventDefault();
        if (!validarFormulario()){
            console.log("Formulario Inválido! Corrija os erros.");
        } else {
            console.log("Formulário Válidado! Pronto para enviar.");
            const dados = {
                nome: document.getElementById('nome').value.trim(),
                celular: document.getElementById('celular').value.trim(),
                email: document.getElementById('email').value.trim(),
                endereco: document.getElementById('endereco').value.trim(),
                flor: document.getElementById('nomeFlor').value.trim(),
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
                Flor/Item: ${dados.flor} (${dados.pedidoTamanho})
                Data Requerida: ${dados.data} às ${dados.horario}
                Pagamento: ${dados.pagamento}
                Pedido Especial: ${dados.pedido || 'Nenhum'}
                
                Aperte OK para finalizar.
            `
            alert(mensagem);
            form.reset();
        }
    });
} else {
    console.error("Formulário não encontrado no documento.");
}


function exibirErroEfocar(idCampo, mensagem){
    const campo = document.getElementById(idCampo);
    alert(mensagem)
    campo.focus();
}



function validarNome() {
    const nomeInput = document.getElementById('nome');
    const valorNome = nomeInput.value.trim();

    if (valorNome === "") {
        exibirErroEfocar('nome', "O campo nome é obrigatório.");
        return false;
    }
    return true;
}


const inputCelular = document.getElementById('celular');
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

function validarFlor(){
    const florInput= document.getElementById('nomeFlor');
    const valorFlor = florInput.value.trim();
    if (valorFlor === "") {
        exibirErroEfocar('nomeFlor', "O campo Nome da flor é obrigatório.");
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
    if (!validarFlor()) return false;
    if (!validarDataRequerida()) return false;
    if (!validarHorarioRequerido()) return false;
    return true;
} 

//Função para carregar a tabela do arquivo tabela.json
// Aguarda o DOM (estrutura da página) ser completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleciona os elementos da tabela pelo ID
    const corpoTabela = document.getElementById('corpo-tabela');
    const mensagemErro = document.getElementById('mensagem-erro');

    // Função assíncrona para buscar e popular os dados
    async function carregarDadosTabela() {
        try {
            // Faz a requisição AJAX para o arquivo JSON
            // Isso assume que 'tabela.json' está na MESMA pasta que o HTML
            // Se 'tabela.json' estiver na raiz, mude para '../tabela.json'
            const response = await fetch('tabela.json');

            // Verifica se a requisição foi bem-sucedida (status 200-299)
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }

            // Converte a resposta em JSON
            const dados = await response.json();

            // Limpa a tabela (remove a mensagem "Carregando...")
            corpoTabela.innerHTML = '';

            // Verifica se há dados para exibir
            if (dados.length === 0) {
                corpoTabela.innerHTML = '<tr><td colspan="3" class="text-center">Nenhum dado encontrado.</td></tr>';
                return;
            }

            // Itera sobre cada item nos dados e cria uma linha na tabela
            dados.forEach(item => {
                // Cria uma nova linha (tr)
                const linha = document.createElement('tr');

                // Adiciona as células (td) à linha com os dados corretos
                // Sem classes de estilo, pois o Bootstrap (table-striped) já cuida disso
                linha.innerHTML = `
                    <td>${item.nome}</td>
                    <td>${item.definicao}</td>
                    <td>R$ ${item.valor}</td> 
                `; // Adicionamos 'R$' para formatar o valor
                
                // Adiciona a linha ao corpo da tabela
                corpoTabela.appendChild(linha);
            });

        } catch (error) {
            // Em caso de erro na requisição ou processamento
            console.error('Falha ao carregar dados da tabela:', error);
            
            // Limpa a tabela
            corpoTabela.innerHTML = '';

            // Exibe a mensagem de erro na tela
            // Adicionando classes do Bootstrap para estilizar o erro
            mensagemErro.className = 'alert alert-danger mt-3';
            mensagemErro.textContent = `Erro ao carregar os dados: ${error.message}. Verifique o console para mais detalhes.`;
        }
    }

    // Chama a função para carregar os dados
    // Verifica se os elementos existem antes de tentar carregar
    if (corpoTabela && mensagemErro) {
        carregarDadosTabela();
    }
})


