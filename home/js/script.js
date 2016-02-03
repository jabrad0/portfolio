

var menu = document.querySelector('#menu');
var container = document.querySelector('.container');
var drawer = document.querySelector('.nav');

menu.addEventListener('click', function(e) {
  drawer.classList.toggle('open');
  e.stopPropagation();
});
container.addEventListener('click', function() {
  drawer.classList.remove('open');
});
