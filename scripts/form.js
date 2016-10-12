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

Form.prototype.recorrerForm = function(){

  	var sAux={};
  	var form = this.form_id;
  	for (i=0; i<form.elements.length;i++)
  	{
  		//sAux += {"name: " . form.elements[i].name . " " , "type :  " + form.elements[i].type + " ", "value: " + form.elements[i].value + "\n" };
  	}
  	alert(sAux);
  };

Form.prototype..validateFormElement = function(){
    var form_elem_id = this.getActiveType;
    var validate = new Validate();

    switch (form_elem_id) {
      case "money":
        validate.monthly_incoming();
        break;
      default://text

    }
  };
}
