
function Form( form_id ){
  //get form element
  this.form_id = form_id;
  this.form_elem = document.getElementById(this.form_id);

  var self=this; //Artifici binding
  this.getFormSelf = function(){return self;};
  this.getActiveInput = function(){return document.activeElement;}
  this.getActiveType = function(){return document.activeElement.getAttribute("pa-type");}
  this.getActiveValue = function(){return document.activeElement.value;}
  this.getSelectElement = function(){return document.getElementById("interest_rate_type");}

  Subject.call(this.prototype);


}

Form.prototype = new Subject();

Form.prototype.rateTypeFeilds = function(){
  var rate_types = this.getInterestRate();

  if( rate_types == "fixed"){
    this.form_elem.fixed_interest.disabled = false;
    this.form_elem.euribor.disabled = true;
    this.form_elem.differential.disabled = true;
    this.fixed_enabled = true;
  }
  else {
    this.form_elem.euribor.disabled = false;
    this.form_elem.differential.disabled = false;
    this.form_elem.fixed_interest.disabled = true;
    this.fixed_enabled = false;
  }
}

Form.prototype.getInterestRate = function(){
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
