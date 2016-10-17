/**
 * Context prototype.
 * With this object (Singleton) by the way. We manage form context
 *
 * @constructor
 * @this {Context}
 */

function Context(){
  this.form_ = new Form( "mortgage_form" );
  this.validator_ = new Validator( this );


  //document.getElementById('interest_rate_type').onchange = this.form_.changeRateType;
}

Context.prototype.start = function(){
  this.form_.notifyEventForm();

};
//Initiates the form context
Context.prototype.init = function(){
  //Rate Inmputs handler
  this.form_.changeRateType();
  document.mortgage_form.monthly_income.focus();
};
//Send Form info
Context.prototype.submitForm = function(){

  this.validator_.validFormResult();
  if( this.validator_.is_valid_form ){
    var inputs = this.form_.form_elem.getElementsByTagName("input");
    var submit = "";
    //this.form_.form_elem.action = "result.php";
    this.form_.form_elem.onsubmit = true;

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        if (inputs[i].checked) {
          submit += inputs[i].id + "\n";
        }
      } else if ( (inputs[i].type!= "button") ){
        submit += inputs[i].getAttribute('id') + " - " + inputs[i].value + "\n";
      }
    }
    alert(submit);
    return true;
  }
  else{//focus error required field

  }
};
//module.exports = Context;
