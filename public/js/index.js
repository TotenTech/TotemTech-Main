// Menu Lateral 
document.getElementById('menu-btn').addEventListener('change', function () {
    var menu = document.querySelector('.itensNavMobile');
    if (this.checked) {
        menu.style.left = '0';
    } else {
        menu.style.left = '-500px';
    }
});

document.getElementById('menu-btn').addEventListener('change', function () {
    var menu = document.querySelector('.itensNavMobile2');
    var checkbox = document.getElementById('menu-btn');

    if (this.checked) {
        menu.style.left = '0';
        checkbox.checked = true;
    } else {
        menu.style.left = '-500px';
        checkbox.checked = false;
    }
});

function fecharMenu() {
    var menu = document.querySelector('.itensNavMobile');
    var checkbox = document.getElementById('menu-btn');

    if (this.checked) {
        menu.style.left = '0';
        checkbox.checked = true;
    } else {
        menu.style.left = '-500px';
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