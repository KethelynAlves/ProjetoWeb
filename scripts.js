function exibirErroEfocar(idCampo, idErro, mensagem){
    const campo = document.getElementById(idCampo);
    document.getElementById(idErro).textContent = mensagem;
    campo.focus();
}



function validarNome() {
    const nomeInput = document.getElementById('nome');
    const valorNome = nomeInput.value.trim();
    const erroID = 'erroNome';
    if (valorNome === "") {
        exibirErroEfocar('nome', erroID, "O campo nome é obrigatório.");
        return false;
    }
    return true;
}

function validarCelular(){
    const celularInput= document.getElementById('celular');
    const valorCelular = celularInput.value.trim();
    const erroID = 'erroCelular';
    document.getElementById(erroID).textContent = "";
    const reCelular = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    if (!reCelular.test(valorCelular)) {
        exibirErroEfocar('celular', erroID, "Por favor, insira um número de celular válido no formato (XX) XXXXX-XXXX.");
        return false;
    }
    if (valorCelular === "") {
        exibirErroEfocar('celular', erroID, "O campo Celular é obrigatório.");
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
    const erroID = 'erroEmail';
    document.getElementById(erroID).textContent = "";
    if (valorEmail === "") { 
        exibirErroEfocar('email', erroID, "O campo Email é obrigatório."); 
        return false;
    } if (!validarEmailPura(valorEmail)) { 
        exibirErroEfocar('email', erroID, "Por favor, insira um email válido."); 
        return false; 
    }
    return true; 
}

function validarEndereco(){
    const enderecoInput= document.getElementById('endereco');
    const valorEndereco = enderecoInput.value.trim();
    const erroID = 'erroEndereco';
    if (valorEndereco === "") {
        exibirErroEfocar('endereco', erroID, "O campo Endereço é obrigatório.");
        return false;
    }
    return true; 
}

function validarFlor(){
    const florInput= document.getElementById('nomeFlor');
    const valorFlor = florInput.value.trim();
    const erroID = 'erroFlor';
    if (valorFlor === "") {
        exibirErroEfocar('nomeFlor', erroID, "O campo Nome da flor é obrigatório.");
        return false;
    }
    return true; 
}

function validarDataRequerida(){
    const dataInput= document.getElementById('dataRequerida');
    const valorData = dataInput.value.trim();
    const erroID = 'erroData';
    if (valorData === "") {
        exibirErroEfocar('data', erroID, "O campo Data Requerida é obrigatório.");
        return false;
    }
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataRequerida = new Date(valorData+'T00:00:00');
    dataRequerida.setHours(0, 0, 0, 0);

    if (dataRequerida < hoje) {
        exibirErroEfocar('data', erroID, "A data requerida não pode ser no passado.");
        return false;
    }
    return true; 
}

function validarHorarioRequerido(){
    const horarioInput= document.getElementById('horario');
    const valorhorario = horarioInput.value.trim();
    const erroID = 'erroHorario';
    if (valorhorario === "") {
        exibirErroEfocar('horario', erroID, "O campo Horario Requerido é obrigatório.");
        return false;
    }  
    return true;
}

function validarFormulario(){
    document.querySelectorAll('span[id^="erro"]').forEach(span => span.textContent = '');

    let valido = true;
    const nomeValido = validarNome();
    const celularValido = validarCelular();
    const emailValido = validarEmailComFeedback();
    const enderecoValido = validarEndereco();
    const florValida = validarFlor();
    const dataValida = validarDataRequerida();
    const horarioValido = validarHorarioRequerido(); 

    valido = nomeValido && celularValido && emailValido && enderecoValido && florValida && dataValida && horarioValido;
    
    return valido;
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


const form = document.getElementById('encomenda');
if (form){
    form.addEventListener('submit', function(event){
        if (!validarFormulario()){
            event.preventDefault();
            console.log("Formulario Inválido! Corrija os erros.");
        } else {
            console.log("Formulário Válidado! Pronto para enviar.");
        }
    });
} else {
    console.error("Formulário não encontrado no documento.");
}


