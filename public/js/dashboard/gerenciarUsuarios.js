window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location.href = "/erro";
    }
});


//Definir o nome do usuário e empresa
const nameUser = document.getElementById('spanNameUser');
const nameCompany = document.getElementById('spanNameCompany');
nameUser.innerHTML = `${sessionStorage.NOME_USUARIO}`;
nameCompany.innerHTML = `${sessionStorage.NOME_EMPRESA}`;


// Tela de editar as informações do usuario
const screenEditBox = document.getElementById('screenEditBox');

// Mensagem de alerta
const alertMessage = document.getElementById('alertMessage');


function screenEdit(visivel){
    if(visivel){
        screenEditBox.style.display = "none";
    }else{
        screenEditBox.style.display = "block";
    }
}

function mostrarAlerta() {
    alertMessage.style.right = '2%';
    alertMessage.style.opacity = '1';
}

function esconderAlerta() {
    alertMessage.style.right = '-100%';
    alertMessage.style.opacity = '0';
}

function mostrarSenha(visivel) {
    const inputGrupoSenha = document.getElementById('inputGrupoSenhaBox');
    inputGrupoSenha.innerHTML = '';
    if (visivel) {
        inputGrupoSenha.innerHTML = `
        <input type="text" placeholder="banana" >
        <label for="">Senha</label>
        <i class="bi bi-eye-fill" id="olhoImg" onclick="mostrarSenha(false)"></i>`;
    } else {
        inputGrupoSenha.innerHTML = `
        <input type="text" placeholder="*******" >
        <label for="">Senha</label>
        <i class="bi bi-eye-slash-fill" id="olhoImg" onclick="mostrarSenha(true)"></i>`;
    }
    
}

document.getElementById("btn_sair").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "/";
});