/**
 * Mecanisme per permetre includes en javascript.
 * Així podem tindre un únic punt d'entrada a l'aplicació (main.js) a pesar d'organitzar el projecte
 * amb múltiples arxius .js diferents
 *
 * @param {path_filename} PATH relatiu a index.html on s'ubica l'arxiu
 */
 function include(filename){
 	var head = document.getElementsByTagName('head')[0];

 	script = document.createElement('script');
 	script.src = filename;
 	script.type = 'text/javascript';

 	head.appendChild(script)
 }
include('scripts/form.js');
include("scripts/utils/ArrayList.js");
include("scripts/utils/Observer.js");
include("scripts/utils/Subject.js");

include('scripts/validate.js');

function init(){

	context=new Context();
	context.init();
}

window.onload = function(){
  init();


  document.form.addEventListener("onfocus", form.validateFormElement);
  window.addEventListener("onkeyup", form.validateFormElement);
  window.addEventListener("onblur", form.validateFormElement);
}
