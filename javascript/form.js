/**
 * prototype form
 *
 * @constructor
 * @this {Artifact}
  *
 */
function Form( form_id ){
  //get form element
  this.form_id = form_id;
  this.form_elem = document.getElementById(this.form_id);
  //Form Interest Rate Type elements
  this.rate_type_selected = "";
  this.interest_aplied = "";//Interest * 1000
  //Form checkBoxes elements
  this.form_checkBoxes = [];
  this.form_checkBoxesChecked = 0;
  //current element
  this.active_input = "";
  this.active_type = "";
  this.active_value = "";
  this.active_id = "";

  var self=this; //Artifici binding
  this.getFormSelf = function(){return self;};
  this.getActiveInput = function(){return document.activeElement;};
  this.getActiveType = function(){return document.activeElement.getAttribute("pa-type");};
  this.getActiveValue = function(){return document.activeElement.value;};
  this.getActiveId = function(){return document.activeElement.getAttribute("id");};
  this.getSelectElement = function(){return document.getElementById("interest_rate_type");};
  this.setCheckboxes = function(){
    var inputs = this.form_elem.getElementsByTagName("input");
    var checkBoxes = []; //will contain all checkboxes
    var checked_boxes = 0;
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        checkBoxes.push(inputs[i]);
        if (inputs[i].checked) {
          checked_boxes += 1;
        }
      }
    }
    this.form_checkBoxes = checkBoxes;
    this.form_checkBoxesChecked = checked_boxes;
  };

  Subject.call(this.prototype);

}

Form.prototype = new Subject();

Form.prototype.setCurrent = function(){
  var self_form = this.getFormSelf();
  self_form.active_type = self_form.getActiveType();
  self_form.active_value = self_form.getActiveValue();
  self_form.active_input = self_form.getActiveInput();
  self_form.active_id = self_form.getActiveId();
}

Form.prototype.setError = function( error_type, error_msage ){
  var self_form = this.getFormSelf();
  var elem_id = self_form.active_id;//get element id
  var element = document.getElementById(elem_id + "_div");
  error_message_id = elem_id +"_error_message";
  //reinitiate error div
  this.removeError();

  var child = document.createElement('div');
  child.setAttribute( 'id', error_message_id);
  child.setAttribute( 'class', 'msg');
  child.setAttribute( 'display', 'block');

  if( error_type == "EMPTY" ){
    child.innerHTML = "This field can't be empty";
    element.appendChild( child);
  }
  else if( error_type == "PATTERN" ){
    child.innerHTML = error_msage;
    element.appendChild( child);
  }
  else if( error_type == "SPECIAL" ){
    child.innerHTML = error_msage;
    element.appendChild( child);
  }
};

Form.prototype.removeError = function( error_type, error_msage ){
  var self_form = this.getFormSelf();
  var elem_id = self_form.active_id;
  var element = document.getElementById(elem_id + "_div");
  var error_elem = document.getElementById( elem_id + "_error_message" );
  try{
    //If already have an error; remove it
    element.removeChild( error_elem );
  }catch(e){

  }
};

Form.prototype.setInterestAplied = function(){
  var self_form = this.getFormSelf();
  var interest = 0;

  self_form.setCheckboxes();
  var active_products = self_form.form_checkBoxesChecked;

  if(self_form.rate_type_selected == "fixed"){
    interest = parseInt(parseFloat(self_form.form_elem.fixed_interest.value) * 1000);
    interest -= active_products * 50;
  }
  else{
    var euribor = parseInt(parseFloat(self_form.form_elem.euribor.value) * 1000);
    var differential = parseInt(parseFloat(self_form.form_elem.differential.value) * 1000);
    interest = parseInt(euribor) + parseInt(differential);
    interest -= active_products * 50;
  }
  self_form.interest_aplied = interest;
  self_form.form_elem.interestApplied.value = (interest/1000) || 0;
  this.notifyEventForm();
};

Form.prototype.calculateResult = function(){
  var self_form = this.getFormSelf();
  var cuota_mensual = 0;
  var income = parseInt(parseFloat(self_form.form_elem.monthly_income.value) * 100);
  var capital = parseInt(parseFloat(self_form.form_elem.capital.value) * 100);
  var period = parseInt(self_form.form_elem.period.value);

  //cuota_mensual = parseInt((((capital/100) * (interest/1000) / 12) / (100 * ( 1- Math.round(Math.pow(1 + (( (interest / 1000) / 12 )/100 ) , (-1 * period * 12))) ))) * 100);
  cuota_mensual = parseInt(( ((capital/100) * (self_form.interest_aplied/1000) / 12) / (100 * ( 1- Math.round(Math.pow(1 + (( (self_form.interest_aplied / 1000) / 12 )/100 ) , (-1 * period * 12))) ))) * 100);
  self_form.form_elem.monthlyQuote.value = cuota_mensual/100;

  self_form.form_elem.interestToPay.value = (((cuota_mensual * period * 12) - income) /100);
};

Form.prototype.changeRateType = function(){
  var self_form = this.getFormSelf();
  var selected_interest = this.getSelectElement();
  var opt;

  for ( var i = 0, len = selected_interest.options.length; i < len; i++ ) {
      opt =selected_interest.options[i]
      if ( opt.selected === true ) {
          self_form.rate_type_selected =opt.text;
      }
  }

  if( self_form.rate_type_selected == "fixed"){
    self_form.form_elem.fixed_interest.disabled = false;

    self_form.form_elem.euribor.disabled = true;
    self_form.form_elem.euribor.value = "";
    self_form.form_elem.differential.disabled = true;
    self_form.form_elem.differential.value = "";
    self_form.fixed_enabled = true;
  }
  else {
    self_form.form_elem.euribor.disabled = false;
    self_form.form_elem.differential.disabled = false;
    self_form.form_elem.fixed_interest.disabled = true;
    self_form.form_elem.fixed_interest.value = "";
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
    self_form.form_elem.monthlyQuote.value = "";
    self_form.form_elem.interestApplied.value = "";
    self_form.form_elem.monthlyQuote.readonly = true;
    self_form.form_elem.interestApplied.readonly = true;
  }
}

Form.prototype.notifyEventForm = function(){
    this.Notify(this);
};

Form.prototype.start = function(){
  //asignem event onchange a select
  var selec_input = this.getSelectElement();
  //Initiate form Interest Rate fields
  this.rateTypeFeilds();
}
