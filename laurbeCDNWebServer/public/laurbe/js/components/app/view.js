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

	type:'view',
	/**
	*
	**/
	instanceProperties:{
		/**
		 *  the App title and name
		**/
		menuName: 'View 1',
		

	},
	/**
	* View elements
	**/
	items:[],
	
	/**
	* Builds:
	**/
	init:function(){
	
	},

	renderTo:function(wrapperId){
		console.log('soy el render to de la view');
		$.each(this.instanceProperties.items, function( index, item ) {
			item.renderTo(wrapperId);
		});
	},
	onShow:function(){
		alert('estoy haciendo onshow de una View');
		if(this.instanceProperties.onShow)
			this.instanceProperties.onShow(this);
	}
	
		

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
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.View.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.View, {instanceProperties:initializationProps});


	return instance;
}