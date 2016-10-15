
function Validator( context ){
  this.valid = "";

  this.context = context;

  withObserver.call(Validator.prototype);
  //We enroll stick as a ball observer
	this.context.form_.AddObserver(this);

  this.Update = function( form ){
    this.current_element = form.getActiveInput();
    this.current_type = form.getActiveType();
    this.current_value =form.getActiveValue();

    this.switchType();
  }
}

Validator.prototype.money = function(  ){
  var current_element = document.activeElement;
  var money_pattern = /^[\d]{0,9}[.]?([\d]{1,2}?)$/;//float personal regular expresion

  if (  this.current_value == "Ingresos mensuales" ){
     this.current_element.value = "";
     this.valid = false;
  }
  else if( this.current_value == "" ){
    this.current_element.style.border = "1px solid red";
    this.current_element.focus();
    this.valid = false;
  }
  else{
    if(!money_pattern.test(this.current_value)){
       this.current_element.style.border = "1px solid red";
       this.current_element.focus();
       this.valid = false;
    }
    else{
      this.current_element.style.border = "2px solid green";
      this.valid = true;
    }
  }
};

Validator.prototype.percentage = function(  ){
  var current_element = document.activeElement;
  var dec_pattern = /^\-?[\d]{0,1}[.]?([\d]{1,3}?)$/;//float personal percentage ([9.999 , -9.999] range) regular expresion

  if (  this.current_value == ("euribor" || "differential" || "Fixed interest rate" )){
     this.current_element.value = "";
     this.valid = false;
  }
  else if( this.current_value == "" ){
    this.current_element.style.border = "1px solid red";
    this.current_element.focus();
    this.valid = false;
  }
  else{
    if(!dec_pattern.test(this.current_value)){
       this.current_element.style.border = "1px solid red";
       this.current_element.focus();
       this.valid = false;
    }
    else{
      this.current_element.style.border = "2px solid green";
      this.valid = true;
    }
  }
};

Validator.prototype.switchType = function(){
  //validate.monthly_incoming(form_elem_input);

  switch (this.current_type) {
    case "money":
      this.money(this.current_element);
      break;
    default://text
  }
};
