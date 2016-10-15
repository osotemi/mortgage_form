
function Context(){
  this.form_ = new Form( "mortgage_form" );
  this.validator_ = new Validator( this );


  document.mortgage_form.ingresos_mensuales.focus();


}

Context.prototype.start = function(){
  this.form_.notifyEventForm();

  
};

//module.exports = Context;
