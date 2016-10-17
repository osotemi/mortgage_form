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
  var inputs = context_.form_.form_elem.getElementsByTagName("input");

  var changeRate = function(event){
    context_.form_.changeRateType();
  }

  var setInterestAplied = function(event){
    context_.form_.setInterestAplied();
  }
  
  var setCurrent = function(event){
    context_.form_.setCurrent();
  }

  var listenForm = function(event){
    event.preventDefault();
    //setCurrent();
    context_.start();
  }


  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type != "checkbox") {
      //inputs[i].onfocus = setCurrent;
      //inputs[i].onfocus = listenForm;
      inputs[i].onblur = listenForm;
    }
  }

  //I have to use addEventListener becouse the onfocus gives troubles with
  window.addEventListener("keyup",setCurrent);
  document.getElementById('interest_rate_type').onchange = changeRate;
  document.getElementById('homeInsurance').onchange = setInterestAplied;
  document.getElementById('paysheet').onchange = setInterestAplied;
  document.getElementById('lifeInsurance').onchange = setInterestAplied;

  //window.addEventListener("click",change_rate);
}
