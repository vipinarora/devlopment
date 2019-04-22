
(function(){

  var showMenu = document.getElementById('m_menu');
  var classes = [];
  showMenu.addEventListener('click', function () {
    
    classes = showMenu.className.split(" ");
    var i = classes.indexOf("cross");

    if (i >= 0){
      classes.splice(i, 1);
      showMenu.className = classes.join("");
      document.getElementById('m_menu').innerHTML = '&#9776;';
      document.getElementById('menu').classList.add('m_menu_close');
      document.getElementById('menu').classList.remove('m_menu_open');
     
      
    } 
    else{
      classes.push("cross");
      showMenu.className = classes.join(""); 
      document.getElementById('m_menu').innerHTML = '&#10005;';
      document.getElementById('menu').classList.add('m_menu_open');
      document.getElementById('menu').classList.remove('m_menu_close');
      
    } 
  });

  window.addEventListener('resize',function(){
    if(window.innerWidth > 768)
    {
      classes.push("");
      showMenu.className = classes.join("");
      document.getElementById('m_menu').innerHTML = '&#9776;';
      document.getElementById('menu').classList.add('m_menu_open');
      document.getElementById('menu').classList.remove('m_menu_close');
    }
    else
    {
      classes.push("");
      showMenu.className = classes.join("");
      document.getElementById('m_menu').innerHTML = '&#9776;';
      document.getElementById('menu').classList.add('m_menu_close');
      document.getElementById('menu').classList.remove('m_menu_open');
    }
  });
})();
  