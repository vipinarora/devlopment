var showMenu = document.getElementById('m_menu');
var hideMenu = document.getElementById('closebtn');
showMenu.addEventListener('click', function () {
    document.getElementById("main_header__menu").style.width = "50%";
});
hideMenu.addEventListener('click', function () {
    document.getElementById("main_header__menu").style.width = "0";
});