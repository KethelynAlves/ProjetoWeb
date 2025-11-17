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



