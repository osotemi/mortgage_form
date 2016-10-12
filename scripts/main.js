/**

 */
/*
 function include(filename){
 	var head = document.getElementsByTagName('head')[0];

 	script = document.createElement('script');
 	script.src = filename;
 	script.type = 'text/javascript';

 	head.appendChild(script)
 }

include('patterns/context.js');
include("scripts/utils/ArrayList.js");
include("scripts/utils/Observer.js");
include("scripts/utils/Subject.js");

include('scripts/validate.js');

function init(){

	context=new Context();
	//context.init();
}


var singletonContext = require('./patterns/singleton/singletonContext');
*/
function Context(){


  document.mortgage_form.ingresos_mensuales.focus();


}

Context.prototype.start = function(){
  this.monthly_incoming(document.mortgage_form.ingresos_mensuales);
  //this.monthly_incoming(document.mortgage_form.capital);

};

Context.prototype.monthly_incoming = function( elem_ingresos_id ){
  var elem_ingresos_value = elem_ingresos_id.value;
  var ingresos_pattern = /^[\d]{0,8}[.]?([\d]{1,2}?)$/;//float personal regular expresion

  if (  elem_ingresos_value == "Ingresos mensuales" ){
     elem_ingresos_id.value = "";
     this.valid = false;
  }
  else if( elem_ingresos_value == "" ){
    elem_ingresos_id.style.border = "1px solid red";
    elem_ingresos_id.focus();
    this.valid = false;
  }
  else{
    if(!ingresos_pattern.test(elem_ingresos_value)){
       elem_ingresos_id.style.border = "1px solid red";
       elem_ingresos_id.focus();
       this.valid = false;
    }
    else{
      elem_ingresos_id.style.border = "2px solid green";
      this.valid = true;
    }
  }
}

var SingletonContext = (function () {
    var instance;

    function createInstance() {
        var object = new Context();
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();


window.onload = function(){
  var context_ = SingletonContext.getInstance();

  var listenForm = function(event){
    event.preventDefault();

    context_.start();
  }

  window.addEventListener("keyup",listenForm);
}
