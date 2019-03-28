/**
 * input 
 * {
 * 		#container element Id
 * 		renderTo:
 * 		#title to show
 * 		title:string
 * 		
 * }
 */
laurbe.prototype.navBarMenuItem = $.extend({}, laurbe.BaseViewElement, {
		/**
	* String type definition
	**/
	type: 'laurbe.prototype.navBarMenuItem',
	template: {
				scriptId : "navbarMenuItemTemplate",
				url: "./html/components/navbar/navBarMenuItemTemplate.html"

	}

});


/**
 * Constructor definition
 */
laurbe.navBarMenuItem = function navBarMenuItem(args){
	
	//console.log('esta entrando '+ args.renderTo);
	/** Init values for laurbe.navBar **/
	var defaults = {
			id : laurbe.utils.getIdFor('navBarMenuItem'),
			text:'Option',
			selected: true

	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);
	//console.log('las propiedades de inicializacioon son ');
	//console.log(initializationProps);
	
	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.navBarMenuItem, {instanceProperties:initializationProps});
	//var instance = instance.init();
	//console.log('finalmente es  ');
	//console.log(instance);
	/** Initialize object and return **/
	return instance;
}