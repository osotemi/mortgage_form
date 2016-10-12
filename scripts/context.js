/**
 * Context prototype.
 * With this object (Singleton) by the way. We manage form context:
 * on screen. It is a bridge to reach all objects that compose the validations
 *
 * @constructor
 * @this {Context}
 */
/*
function Context(){
  this.l_blue = "1px solid light-blue";


  document.mortgage_form.ingresos_mensuales.focus();


}

Context.prototype.start = function(){
  this.monthly_incoming(document.mortgage_form.ingresos_mensuales);
  this.monthly_incoming(document.mortgage_form.capital);

};

Context.prototype.monthly_incoming = function( elem_ingresos_id ){
  var elem_ingresos_value = elem_ingresos_id.value;
  var ingresos_pattern = /^[\d]{1,8}[.]?([\d]{1,2}?)$/;//float personal regular expresion

  if (  elem_ingresos_value == "Ingresos mensuales" ){
     elem_ingresos_value = "";
     this.valid = false;
  }
  else if( elem_ingresos_value == "" ){
    elem_ingresos_id.style.border = "2px solid red";
    elem_ingresos_id.focus();
    this.valid = false;
  }
  else{
    if(!ingresos_pattern.test(elem_ingresos_value)){
       elem_ingresos_id.style.border = "2px solid red";
       elem_ingresos_id.focus();
       this.valid = false;
    }
    elem_ingresos_id.style.border = this.l_blue;
    this.valid = true;
  }
}
*/
module.exports = Context;
