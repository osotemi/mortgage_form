function Validate(){
  this.valid = "";
}

Validate.prototype = {

  monthly_incoming : function( elem_ingresos_id ){
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
      elem_ingresos_id.style.border = "1px solid light-blue"
      this.valid = true;
    }
  }


}
