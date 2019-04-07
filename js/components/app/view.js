/**
**

var usersView = new View().fromRest("/users")
							.with({initView:'astable',excludedFields:['creditCard']})
							.and()
							.editData('asForm')
							.with({noneditableFields:['id','email','creditcard']});
var cartsView = new View().fromRest("/carts")
							.with({initView:'table'})
							and()
							.editData('asForm').
							with('notEditable');
var app = new App().withStyleDetfauls().usingViews([new View({'users'}),new View({'carts'})]);
**/
laurbe.prototype.View = $.extend({}, laurbe.prototype.BaseAPP, {
	/**
	*
	**/
	instanceProperties:{
		/**
		 *  the App title and name
		**/
		menuName: 'View 1'
		

	},
	
	/**
	* Builds:
	**/
	init:function(){
	
	},
	
		

});


/**
 * Constructor definition
 */
laurbe.View = function View(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Layout.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Layout, {instanceProperties:initializationProps});


	return instance;
}