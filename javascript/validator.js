
function Validator( context ){
  this.valid = "";

  this.context = context;

  this.enabledResult = false;

  this.validResultFields = {
    valid_incoming : false,
    valid_capital : false,
    valid_interest : false,
    valid_peiod : false,
  };

  this.validInterestRate = {
    valid_euribor : false,
    valid_differencial : false,
    valid_fixed : false,
  };

  this.isValidRateType = function(){

  };

  withObserver.call(Validator.prototype);
  //We enroll stick as a ball observer
	this.context.form_.AddObserver(this);

  this.Update = function( form ){
    this.current_element = form.getActiveInput();
    this.current_type = form.getActiveType();
    this.current_value =form.getActiveValue();

    this.switchType();

    //Si current es de RateType:

    //Si current es de Result:
    if ( this.enabledResult ){
      form.calculateResult( "fixed" );
      form.enableResultFields( true );
    }
    //Si current es de required:

    /*
    if( this.valid_ingresos &&  this.valid_capital && this.valid_period ){
      if( this.valid_fix_interest ){
        form.calculateResult( "fixed" );
      }
      else if (this.valid_){
        form.calculateResult(  );
      }
    }
    */
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

Validator.prototype.number = function(  ){
  var current_element = document.activeElement;
  var num_pattern = /^[\d]{0,2}$/;//float personal percentage ([9.999 , -9.999] range) regular expresion

  if (  this.current_value == "How many years?"){
     this.current_element.value = "";
     return false;
  }
  else if( this.current_value == "" ){
    this.current_element.style.border = "1px solid red";
    this.current_element.focus();
    return false;
  }
  else{
    if( ! num_pattern.test(this.current_value) ){
       this.current_element.style.border = "1px solid red";
       this.current_element.focus();
       return false;
    }
    else{
      this.current_element.style.border = "2px solid green";
      return true;
    }
  }
};

Validator.prototype.check = function( is_valid ){
  switch (this.current_element.id) {
    case "ingresos_mensuales":
      this.validResultFields.valid_incoming = is_valid;
      break;
    case "capital":
      this.validResultFields.valid_capital = is_valid;
      break;
    case "euribor":
      this.validInterestRate.valid_euribor = is_valid;
      if ( this.validInterestRate.valid_euribor && this.validInterestRate.valid_differencial ){
        this.validResultFields.valid_interest = true;
      }
      else{
        this.validResultFields.valid_interest = false;
      }
      break;
    case "differential":
      this.validInterestRate.valid_differencial = is_valid;
      if ( this.validInterestRate.valid_euribor && this.validInterestRate.valid_differencial ){
        this.validResultFields.valid_interest = true;
      }
      else{
        this.validResultFields.valid_interest = false;
      }
      break;
    case "fixed_interest":
      this.validInterestRate.valid_fixed = is_valid;
      this.validResultFields.valid_interest = is_valid;
      break;
    case "period":
      this.validResultFields.valid_peiod = is_valid;
    default://text
      this.valid = is_valid;
  }

};

Validator.prototype.checkEnableResult = function(){

  for ( var i = 0, len = this.validResultFields.length; i < len; i++ ) {
      opt = this.validResultFields[i];
      if ( opt === false ) {
        this.enabledResult = false;
      }
  }
  this.enabledResult = true;

};

Validator.prototype.switchType = function(){
  //validate.monthly_incoming(form_elem_input);

  switch (this.current_type) {
    case "money":
      this.check(this.money());

      break;
    case "dec_percentage":
      this.check(this.percentage());
      break;
    case "number":
      this.check(this.number());
      break;
    default://text
      break;
  }
  this.checkEnableResult();
};
