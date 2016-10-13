function Validator( context ){
  this.valid = "";
  this.current_element = "";
  this.current_type = "";
  this.current_value = "";

  this.context = context;

  withObserver.call(Validator.prototype);
  //We enroll stick as a ball observer
	this.context..AddObserver(this);

  this.Update = function( form ){

    this.current_element = form.getActiveInput();
    this.current_type = form.getActiveType();
    this.current_value = document.activeElement.value;

    this.switchType();
  }
}

Validate.prototype.money = function(  ){
  var elment_id = document.activeElement.;
  var ingresos_pattern = /^[\d]{0,8}[.]?([\d]{1,2}?)$/;//float personal regular expresion

  if (  this.current_value == "Ingresos mensuales" ){
     elment_id.value = "";
     this.valid = false;
  }
  else if( this.current_value == "" ){
    form.elment_id.style.border = "1px solid red";
    form.elment_id.focus();
    this.valid = false;
  }
  else{
    if(!ingresos_pattern.test(elem_ingresos_value)){
       form.elment_id.style.border = "1px solid red";
       form.elment_id.focus();
       this.valid = false;
    }
    else{
      form.elment_id.style.border = "2px solid green";
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


//module.exports = Validate;
