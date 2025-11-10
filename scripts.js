const form = document.getElementById('encomenda');
form.addEventListener('submit', function(event){event.preventDefault();
    if (validarFormulario()){
        console.log("Formulário Válidado! Pronto para enviar.");
    } else {
        consele.log("Formulario Inválido! Corrija os erros.");
    }
}) 

function exibirErro(idCampo, mensagem){
    document.getElementById(idCampo).textContent = mensagem;
}

function validarFormulario(){
    let isValid = true;

    const nomeInput = document.getElementById('nome');
    const valorNome = nomeInput.ariaValueMax.trim();
    const erroNome = document.getElementById('erroNome');
    if (valorNome === "") {
        erroNome.textContent = "O campo nome é obrigatório.";
        campoNome.focus();
        formularioValido = false;
    } else {
        erroNome.textContent = "";
    }


    
    const celularInput= document.getElementById('celular');
    const valorCelular = nomeInput.ariaValueMax.trim();
    const erroCelular = document.getElementById('erroCelular');
    if (valorNome === "") {
        erroNome.textContent = "O campo Celular é obrigatório.";
        campoNome.focus();
        formularioValido = false;
    } else {
        erroNome.textContent = "";
    }
    
    
    
    const 
}