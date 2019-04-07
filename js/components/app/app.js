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
laurbe.prototype.App = $.extend({}, laurbe.prototype.BaseAPP, {
	/**
	*
	**/
	instanceProperties:{
		/**
		 *  the App title and name
		**/
		title: 'My App',
		views:[],
		appLayoutTemplate:'classic'
	},
	
	appLayoutTemplates:{
		classic:{
			scriptId : "appTemplate",
			url: '/html/components/app/appClassicTemplate.html'
		},
		dashboard:{
			scriptId : "appTemplate",
			url: '/html/components/app/appDashboardTemplate.html'
		}
	}	
	
	/**
	* The app main Styles , lok and feel
	**/
	style:{
		icon:'',
		theme:'dark'
	},
	/**
	* 
	**/
	views:[],
	/**
	* The app menu
	**/
	menu:null,
	/**
	* Footer
	**/
	footer:{
		style:{
			align: 'center'
		},
		elements:[
			/**
			*	The links, the icos, and other laurbe elements
			**/
		]
	}
	/**
	* Builds:
	*	The menu , based on views
	**/
	init:function(){
		//1.Set the views
		this.views = this.instanceProperties.views;
		//2.Build The menu based on views
		this.buildMenu();

	},
	/**
	* Render the base html structure based on template
	**/
	render:function(){
		//Get the selected appLayout
		var appLayoutTemplate = this.appLayoutTemplates[this.instanceProperties.appLayoutTemplate];
		$('#templateManager').load(laurbe.templateManager.templatePath+appLayoutTemplate.template.url, function(templateString,  ajaxObject, ajaxState){
			$('#'+appLayoutTemplate.scriptId).tmpl({}).appendTo('body');
		});
	}
	/**
	* Builds the menu based on views
	**/
	buildMenu:function(){
		var self=this;
		//Main properties
		this.menu = new laurbe.NavBar({	
				        				renderTo:'appMenuContainer',
										title:this.instanceProperties.title,
		});
		//Add Items
		$.each(this.instanceProperties.views, function( index, view ) {
			self.menu.items.push(
					new laurbe.NavBarMenuItem({
						text:view.instanceProperties.menuName,
						selected: false,
						onclick:function(){
							self.showView(view);
						}
					})
			);
		});

		return this.menu;
	},
	/**
	*
	**/
	start:function(){

	}
		

});


/**
 * Constructor definition
 */
laurbe.App = function APP(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
			wrapper:{
				tag:'<div>',
				class:'mt-1' //Spacing tòp 1
			},
			text:'Option',
			selected: true
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Layout.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Layout, {instanceProperties:initializationProps});


	return instance;
}