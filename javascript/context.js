
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
  this.form_.init();
  this.form_.changeRateType();
  document.mortgage_form.ingresos_mensuales.focus();
};
//module.exports = Context;
