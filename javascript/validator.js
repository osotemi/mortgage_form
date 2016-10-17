
function Validator( context ){
  this.valid = "";

  this.context = context;
  //If the result can be calculated
  this.enabledResult = false;
  //Mistake variables
  this.current_errorType = "";// EMPTY; PATTERN; SPECIAL;
  this.current_errorMessege = "";

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
    this.current_element = form.active_input;
    this.current_type = form.active_type;
    this.current_value =form.active_value;

    this.switchTypeValidate();

    if ( this.current_errorType != ""){
        form.setError( this.current_errorType, this.current_errorMessege );
    }
    else {
        form.removeError();
    }

    //Si current es de interest rate type
    if( this.current_type == "dec_percentage" ){
      form.setInterestAplied();
    }
    //Si current es de RateType:

    //Si current es de Result:

    if ( this.enabledResult ){
      form.calculateResult();
      form.enableResultFields( true );
    }
    //Si current es de required:

  }
}

Validator.prototype.paTypeValidate = function( pattern ){
  var current_element = document.activeElement;

  if (  this.current_value == ("Monthly income" || "capital" || "euribor" || "differential" || "Fixed interest rate" || "How many years?" )){
     this.current_element.value = "";
     this.valid = false;
  }
  else if( this.current_value == "" ){
    this.current_element.style.border = "1px solid red";
    //this.current_element.focus();
    this.valid = false;
  }
  else{
    if(!pattern.test(this.current_value)){
       this.current_element.style.border = "1px solid red";
       //this.current_element.focus();
       this.valid = false;
    }
    else{
      this.current_element.style.border = "2px solid green";
      this.valid = true;
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
  var opt = "";
  this.enabledResult = true;
  for ( var i in this.validResultFields ) {
      opt = this.validResultFields[i];
      if ( opt === false ) {
        this.enabledResult = false;
      }
  }

};

Validator.prototype.switchTypeValidate = function(){
  //validate.monthly_incoming(form_elem_input);
  //patterns
  var money_pattern = /^[\d]{0,9}[.]?([\d]{1,2}?)$/;//float personal regular expresion
  var dec_pattern = /^\-?[\d]{0,1}[.]?([\d]{1,3}?)$/;//float personal percentage ([9.999 , -9.999] range) regular expresion
  var num_pattern = /^[\d]{1,2}$/;//float personal number ([ 10 - 99 ] range) regular expresion
  var text_pattern = /^[\D]{2,50}$/;
  var phone_pattern = /^(\+\d{2,3}\s)?[689]{1}\d{2}[\s]?\d{3}[\s]?\d{3}$/;// acept 666666666 <-> 666 666 666 <-> +34 666 666 666 <-> +34 666666666
  var email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;//

  switch (this.current_type) {
    case "money":
      this.check(this.paTypeValidate( money_pattern ));
      break;
    case "dec_percentage":
      this.check(this.paTypeValidate( dec_pattern ));
      break;
    case "number":
      this.check(this.paTypeValidate( num_pattern ));
      break;
    case "nif":
      this.validateNIF();
      break;
    case "age":
      this.validateAge();
      break;
    case "mobile":
      check(this.paTypeValidate( phone_pattern ));
      break;
    case "email":
      check(this.paTypeValidate( email_pattern ));
      break;
    default://text
      this.check(this.paTypeValidate( text_pattern ));
      break;
  }
  this.checkEnableResult();
};

Validator.prototype.validateAge = function(){
  var age_pattern = /^\d{2}$/;
  var age = this.current_value;

  if ( age == "" || age == "Don't lie"){
    this.current_errorType = "";
    this.current_element.style.border = "1px solid grey";
  }
  else if ( !age.match(age_pattern) ){
    //Error pattern
    this.current_errorType = "PATTERN";
    this.current_errorMessege = "This input can't be an age";
    this.current_element.style.border = "1px solid red";
  }
  else if (age < 18){
    //Error too young
    this.current_errorType = "SPECIAL";
    this.current_errorMessege = "Too young to get a morge";
    this.current_element.style.border = "1px solid red";
  }
  else if ( age > 65 ){
    //Error too old
    this.current_errorType = "SPECIAL";
    this.current_errorMessege = "Too old to get a morge";
    this.current_element.style.border = "1px solid red";
  }
  else{
    //OK
    this.current_errorType = "";
    this.current_element.style.border = "1px solid grey";
  }
};

Validator.prototype.validateNIF = function(){
  var num ="";
  var char ="";
  var ctr_char ="";
  var nif_pattern = /^[0-9]{8}[A-Za-z]{1}$/;
  var controlstr = "TRWAGMYFPDXBNJZSQVHLCKET";
  var dni = this.current_value;

  if ( dni.match(nif_pattern)){
    num = dni.substr( 0, dni.length -1 );
    char = dni.substr( dni.length -1, 1 );
    num = num % 23;
    ctr_char = controlstr.substring( num, num+1 );

    if( ctr_char != char.toUpperCase() ){
      this.current_element.style.border = "1px solid red";
      this.current_element.focus();
      return false;
    }
    else{
      this.current_element.style.border = "2px solid green";
      return true;
    }
  }
  else{
    this.current_element.style.border = "1px solid red";
    this.current_element.focus();
    return false;
  }

};
