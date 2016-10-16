
function Form( form_id ){
  //get form element
  this.form_id = form_id;
  this.form_elem = document.getElementById(this.form_id);
  //Form checkBoxes elements
  this.form_checkBoxes = [];
  this.form_checkBoxesChecked = 0;

  var self=this; //Artifici binding
  this.getFormSelf = function(){return self;};
  this.getActiveInput = function(){return document.activeElement;};
  this.getActiveType = function(){return document.activeElement.getAttribute("pa-type");};
  this.getActiveValue = function(){return document.activeElement.value;};
  this.getSelectElement = function(){return document.getElementById("interest_rate_type");};
  this.setCheckboxes = function(){
    var inputs = this.form_elem.getElementsByTagName("input");
    var checkBoxes = []; //will contain all checkboxes
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        this.form_checkBoxes.push(inputs[i]);
        if (inputs[i].checked) {
          this.form_checkBoxesChecked += 1;
        }
      }
    }
  };

  Subject.call(this.prototype);

}

Form.prototype = new Subject();

Form.prototype.changeRateType = function(){
  var self_form = this.getFormSelf();
  var rate_type = self_form.getRateType();

  if( rate_type == "fixed"){
    self_form.form_elem.fixed_interest.disabled = false;
    self_form.form_elem.euribor.disabled = true;
    self_form.form_elem.differential.disabled = true;
    self_form.fixed_enabled = true;
  }
  else {
    self_form.form_elem.euribor.disabled = false;
    self_form.form_elem.differential.disabled = false;
    self_form.form_elem.fixed_interest.disabled = true;
    self_form.fixed_enabled = false;
  }
}

Form.prototype.enableResultFields = function( enable ){
  var self_form = this.getFormSelf();
  if( enable ){
    self_form.form_elem.monthlyQuote.readonly = false;
    self_form.form_elem.interestApplied.readonly = false;
  }
  else{
    self_form.form_elem.monthlyQuote.readonly = true;
    self_form.form_elem.interestApplied.readonly = true;
  }
}

Form.prototype.getRateType = function(){
  var self_form = this.getFormSelf();
  var selected_interest = this.getSelectElement();
  var opt;

  for ( var i = 0, len = selected_interest.options.length; i < len; i++ ) {
      opt = selected_interest.options[i];
      if ( opt.selected === true ) {
          return selected_interest.options[i].text;
      }
  }
  return false;
}

Form.prototype.calculateResult = function( interest_type ){
  var self_form = this.getFormSelf();
  var interest = 0;
  var cuota_mensual = 0;

  self_form.setCheckboxes();
  var active_products = self_form.form_checkBoxesChecked;
  var income = parseInt(parseFloat(self_form.form_elem.ingresos_mensuales.value) * 100);
  var capital = parseInt(parseFloat(self_form.form_elem.capital.value) * 100);
  var period = parseInt(self_form.form_elem.period.value);
  if(interest_type = "fixed"){
    interest = parseInt(parseFloat(self_form.form_elem.fixed_interest.value) * 1000);
    interest -= active_products * 50;
  }
  else{
    var euribor = parseFloat(self_form.form_elem.euribor.value) * 1000;
    var differential = parseFloat(self_form.form_elem.differential.value * 1000);
    interest = parseInt(euribor) + parseInt(differential);
    interest -= active_products * 50;
  }
  //cuota_mensual = parseInt((((capital/100) * (interest/1000) / 12) / (100 * ( 1- Math.round(Math.pow(1 + (( (interest / 1000) / 12 )/100 ) , (-1 * period * 12))) ))) * 100);
  cuota_mensual = parseInt(( ((capital/100) * (interest/1000) / 12) / (100 * ( 1- Math.round(Math.pow(1 + (( (interest / 1000) / 12 )/100 ) , (-1 * period * 12))) ))) * 100);
  self_form.form_elem.monthlyQuote.value = cuota_mensual/100;
  self_form.form_elem.interestApplied.value = interest/1000;
  self_form.form_elem.interestToPay.value = (((cuota_mensual * period * 12) - income) /100);
};

Form.prototype.notifyEventForm = function(){
    this.Notify(this);
};

Form.prototype.start = function(){
  //asignem event onchange a select
  var selec_input = this.getSelectElement();
  //Initiate form Interest Rate fields
  this.rateTypeFeilds();
}

Form.prototype.init = function(){


}
