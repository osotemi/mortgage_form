/**
 * Crea una instància de Context.
 * Amb aquest objecte (Singleton) per cert. Mantenim el context del joc: vides, on/off posicionament dels
 * objectes en pantalla etc. Serveix com a pont a la resta d'objectes que composen el joc
 *
 * @constructor
 * @this {Context}
 */
function Context(){

    this.form_id = null;

    //Inicialitzem els objectes del joc
    this.init= function(){
		  this.form = document.mortgage_form;
   	};

	};
 //End class context
