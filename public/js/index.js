// Menu Lateral 
document.getElementById('menu-btn').addEventListener('change', function () {
    var menu = document.querySelector('.itensNavMobile');
    if (this.checked) {
        menu.style.left = '0';
    } else {
        menu.style.left = '-1500px';
    }
});

function fecharMenu() {
    var menu = document.querySelector('.itensNavMobile');
    var checkbox = document.getElementById('menu-btn');

    if (this.checked) {
        menu.style.left = '0';
        checkbox.checked = true;
    } else {
        menu.style.left = '-1500px';
        checkbox.checked = false;

    }
}


//Rolagem suave 
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
    });
    this.checked = false;
    fecharMenu()
}


function redirecionarLogin(){
    window.location.href = "/login";
}

function redirecionarCadastro(){
    window.location.href = "/cadastro";
}


//Menu rolagem 
let prevScrollPos = window.pageYOffset;
const navBar = document.getElementById('navBar');

window.addEventListener('scroll', function() {
  let currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    navBar.style.top = '0';
  } else {
    navBar.style.top = `-${navBar.offsetHeight}px`;
  }
  prevScrollPos = currentScrollPos;
});

// modal suporte
var modalSuporte = document.getElementById("modalSuporte");
var btnModalSuporte = document.getElementById("abrirModalSuporte");
var spanModalSuporte = document.getElementsByClassName("fecharModalSuporte")[0];

btnModalSuporte.onclick = function() {
  modalSuporte.style.display = "flex";
}

spanModalSuporte.onclick = function() {
  modalSuporte.style.display = "none";
}