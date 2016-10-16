/*
* Mortgage entry
*
*/

function include(filename){
 var head = document.getElementsByTagName('head')[0];

 script = document.createElement('script');
 script.src = filename;
 script.type = 'text/javascript';

 head.appendChild(script)
}

include("./javascript/patterns/observer/ArrayList.js");
include("./javascript/patterns/observer/Subject.js");
include("./javascript/patterns/observer/Observer.js");

include("./javascript/context.js");
include("./javascript/validator.js");
include("./javascript/form.js");

include("./javascript/patterns/singleton/singletonContext.js");

window.onload = function(){
  var context_ = SingletonContext.getInstance();

  context_.init();

  var change_rate = function(event){
    context_.form_.changeRateType();
  }

  //context_.form_.form_elem.getElementById("interest_rate_type").setAttribute("onchange", function(){context_.form_.rateTypeFeilds();});

  var listenForm = function(event){
    event.preventDefault();

    context_.start();
  }

  window.addEventListener("keyup",listenForm);
  document.getElementById('interest_rate_type').onchange = change_rate;
  //window.addEventListener("click",change_rate);
}
