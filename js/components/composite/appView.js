/**
**

var usersView = new View().with().fromRest("/users")
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

laurbe.prototype.AppViewFunctional = $.extend({}, laurbe.prototype.BaseView, laurbe.FunctionalElement);

laurbe.prototype.AppView= $.extend({}, laurbe.prototype.AppViewFunctional, {
	/**
	* View initialization properties
	**/
	instanceProperties:{
		dao: 
	},

	/**PROTOTIPE PROPERTIES**/
	dao:{

	},


	HAY QUE HACER UNA JERARQUIA DE OBJECTOS FUNCIONALES CON LAS REFERENCIAS AND() Y WITH()
	todos los elementos son funcionales (daos, views, etc..)



	init:function(){
		//initialize DAO
		this.initDAO();
	},
	initDAO: function(){
		console.log('initializating DAOs');
		//init dao for this view
		this.dao= new laurbe.RestDAO({
				this.entityPaths
    	});

	},

	fromRest(path){
		this.instanceProperties.dao= new laurbe.RestDAO({
				entityPaths: {
					games: 'http://localhost:8080/game'
				}
    	});
    	lastWithReference:this.instanceProperties.dao,
		//lastAndReference:this;
	}
		

});


/**
 * Constructor definition
 */
laurbe.AppView = function AppView(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
		dao: {
			type:'rest',
			entityPaths: {
					games: 'http://localhost:8080/game'
			}
		}
		

	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Layout.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Layout, {instanceProperties:initializationProps});


	return instance;
}