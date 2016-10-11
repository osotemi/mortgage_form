//http://www.codeproject.com/Articles/13914/Observer-Design-Pattern-Using-JavaScript
//Importar arraylist
function Subject()
{
   this.observers = new ArrayList();
}

// Context represents an object instance (Ball in our case)
Subject.prototype {
  Notify : function( context ){
     var elem_modify =

     for( var i = 0; i < m_count; i++ )
        this.observers.GetAt(i).Update( context );
  }

  getCountRajoles : function(  ){
   var m_count = this.observers.Count();
   var cont=0;
   for( var i = 0; i < m_count; i++ ){
      if (this.observers.GetAt(i) instanceof Rajola) cont++;
   		//alert(this.observers.GetAt(i).getClass());
   }
   return cont;
}

  AddObserver : function( observer ){
   if( !observer.Update )
      throw 'Wrong parameter';

   this.observers.Add( observer );
 }

 RemoveObserver : function( observer ){
   if( !observer.Update )
      throw 'Wrong parameter';

   this.observers.RemoveAt(this.observers.IndexOf( observer, 0 ));
 }
};
module.exports = Subject;
