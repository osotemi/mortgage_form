/**
 *Form prototype constructor
 * @constructor
 * @this {Artifact}
 *
 */
//importar subject
//var withSubject = require('./utils/Subject.js');

function Form(){
  this.form_id = document.getElementById("mortgage_form");


  this.getActiveType = function(){
    return document.activeElement.type;
  }
  whithSubject.call(this.prototype);


}

Form.prototype.notifyEventForm = function(){
    this.Notify(this);
};
