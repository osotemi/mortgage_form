/**

 */
/*
 function include(filename){
 	var head = document.getElementsByTagName('head')[0];

 	script = document.createElement('script');
 	script.src = filename;
 	script.type = 'text/javascript';

 	head.appendChild(script)
 }

include('patterns/context.js');
include("scripts/utils/ArrayList.js");
include("scripts/utils/Observer.js");
include("scripts/utils/Subject.js");

include('scripts/validate.js');

function init(){

	context=new Context();
	//context.init();
}


var singletonContext = require('./patterns/singleton/singletonContext');
*/

//http://www.codeproject.com/Articles/13914/Observer-Design-Pattern-Using-JavaScript

function ArrayList()
{
   this.aList = []; //initialize with an empty array
}

ArrayList.prototype.Count = function()
{
   return this.aList.length;
};

ArrayList.prototype.Add = function( object )
{
   //Object are placed at the end of the array
   return this.aList.push( object );
};

ArrayList.prototype.GetAt = function( index ) //Index must be a number
{
   if( index > -1 && index < this.aList.length )
      return this.aList[index];
   else
      return undefined; //Out of bound array, return undefined
};

ArrayList.prototype.Clear = function()
{
   this.aList = [];
};

ArrayList.prototype.RemoveAt = function ( index ) // index must be a number
{
   var m_count = this.aList.length;

   if ( m_count > 0 && index > -1 && index < this.aList.length )
   {
      switch( index )
      {
         case 0:
            this.aList.shift();
            break;
         case m_count - 1:
            this.aList.pop();
            break;
         default:
            var head   = this.aList.slice( 0, index );
            var tail   = this.aList.slice( index + 1 );
            this.aList = head.concat( tail );
            break;
      }
   }
};

ArrayList.prototype.Insert = function ( object, index )
{
   var m_count       = this.aList.length;
   var m_returnValue = -1;

   if ( index > -1 && index <= m_count )
   {
      switch(index)
      {
         case 0:
            this.aList.unshift(object);
            m_returnValue = 0;
            break;
         case m_count:
            this.aList.push(object);
            m_returnValue = m_count;
            break;
         default:
            var head      = this.aList.slice(0, index - 1);
            var tail      = this.aList.slice(index);
            this.aList    = this.aList.concat(tail.unshift(object));
            m_returnValue = index;
            break;
      }
   }

   return m_returnValue;
};

ArrayList.prototype.IndexOf = function( object, startIndex )
{
   var m_count       = this.aList.length;
   var m_returnValue = - 1;

   if ( startIndex > -1 && startIndex < m_count )
   {
      var i = startIndex;

      while( i < m_count )
      {
         if ( this.aList[i] == object )
         {
            m_returnValue = i;
            break;
         }

         i++;
      }
   }

   return m_returnValue;
};


ArrayList.prototype.LastIndexOf = function( object, startIndex )
{
   var m_count       = this.aList.length;
   var m_returnValue = - 1;

   if ( startIndex > -1 && startIndex < m_count )
   {
      var i = m_count - 1;

      while( i >= startIndex )
      {
         if ( this.aList[i] == object )
         {
            m_returnValue = i;
            break;
         }

         i--;
      }
   }

   return m_returnValue;
};

//http://www.codeproject.com/Articles/13914/Observer-Design-Pattern-Using-JavaScript

function Subject()
{
   this.observers = new ArrayList();
}

// Context represents an object instance (Ball in our case)
Subject.prototype.Notify = function( context )
{
   var m_count = this.observers.Count();

   for( var i = 0; i < m_count; i++ )
      this.observers.GetAt(i).Update( context );
};

Subject.prototype.getCountRajoles = function(  )
{
   var m_count = this.observers.Count();
   var cont=0;
   for( var i = 0; i < m_count; i++ ){
      if (this.observers.GetAt(i) instanceof Rajola) cont++;
   		//alert(this.observers.GetAt(i).getClass());
   }
   return cont;
};

Subject.prototype.AddObserver = function( observer )
{
   if( !observer.Update )
      throw 'Wrong parameter';

   this.observers.Add( observer );
};

Subject.prototype.RemoveObserver = function( observer )
{
   if( !observer.Update )
      throw 'Wrong parameter';

   this.observers.RemoveAt(this.observers.IndexOf( observer, 0 ));
};

function Context(){
  this.form_ = new Form();

  document.mortgage_form.ingresos_mensuales.focus();


}

Context.prototype.start = function(){
  this.form_.validateFormElement();
  //this.monthly_incoming(document.mortgage_form.capital);

};

function Validate(){
  this.valid = "";
}

Validate.prototype.monthly_incoming = function( elem_ingresos_id ){
  var elem_ingresos_value = elem_ingresos_id.value;
  var ingresos_pattern = /^[\d]{0,8}[.]?([\d]{1,2}?)$/;//float personal regular expresion

  if (  elem_ingresos_value == "Ingresos mensuales" ){
     elem_ingresos_id.value = "";
     this.valid = false;
  }
  else if( elem_ingresos_value == "" ){
    elem_ingresos_id.style.border = "1px solid red";
    elem_ingresos_id.focus();
    this.valid = false;
  }
  else{
    if(!ingresos_pattern.test(elem_ingresos_value)){
       elem_ingresos_id.style.border = "1px solid red";
       elem_ingresos_id.focus();
       this.valid = false;
    }
    else{
      elem_ingresos_id.style.border = "2px solid green";
      this.valid = true;
    }
  }
};

function Form(){
  this.form_id = document.getElementById("mortgage_form");


  var self=this; //Artifici binding
  this.getFormSelf = function(){return self;};
  this.getActiveType = function(){return document.activeElement.type;}
  this.getActiveInput = function(){return document.activeElement;}

  Subject.call(this.prototype);
  Validate.call(this.prototype);
}

Form.prototype = new Subject();

Form.prototype.recorrerForm = function(){
/*
  	var sAux={};
  	var form = this.form_id;
  	for (i=0; i<form.elements.length;i++)
  	{
  		//sAux += {"name: " . form.elements[i].name . " " , "type :  " + form.elements[i].type + " ", "value: " + form.elements[i].value + "\n" };
  	}
  	alert(sAux);*/
  };

Form.prototype.validateFormElement = function(){
    var self = this.getFormSelf();
    var form_elem_input= self.getActiveInput();
    //var form_elem_type = self.getActiveType();

    var validate = new Validate();
    this.monthly_incoming(form_elem_input);
    /*
    switch (form_elem_type) {
      case "money":
        validate.monthly_incoming(form_elem_input);
        break;
      default://text

    }*/
  };



var SingletonContext = (function () {
    var instance;

    function createInstance() {
        var object = new Context();
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();


window.onload = function(){
  var context_ = SingletonContext.getInstance();

  var listenForm = function(event){
    event.preventDefault();

    context_.start();
  }

  window.addEventListener("keyup",listenForm);
}
