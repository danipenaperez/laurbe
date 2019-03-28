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
laurbe.prototype.navBar = $.extend({}, laurbe.BaseViewElement, {
	
	template: {
				scriptId : "navbarWrapperTemplate",
				url: "./html/components/navbar/wrapperTemplate.html"

	}

});


/**
 * Constructor definition
 */
laurbe.navBar = function NavBar(args){
	
	//console.log('esta entrando '+ args.renderTo);
	/** Init values for laurbe.navBar **/
	var navBarDefaults = {
			id : laurbe.utils.getIdFor('navBar'),
			title:'defaultTitle',
			items: []

	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, navBarDefaults, args);
	//console.log('las propiedades de inicializacioon son ');
	//console.log(initializationProps);
	
	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.navBar, {instanceProperties:initializationProps});
	//var instance = instance.init();
	console.log('finalmente es  ');
	console.log(instance);
	/** Initialize object and return **/
	return instance;
}