/**
 * Crea una instància de Context.
 * Amb aquest objecte (Singleton) per cert. Mantenim el context del joc: vides, on/off posicionament dels
 * objectes en pantalla etc. Serveix com a pont a la resta d'objectes que composen el joc
 *
 * @constructor
 * @this {Context}
 */
function Context(){

    this._form = null;

    //Inicialitzem els objectes del formulari
    this.init= function(){
		  this._form = new Form();
      this._form.name.placeholder = "Introduce name";
   	};

	};
 //End class context
