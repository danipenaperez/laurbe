/**
 * Main object namespace

 $('<div/>', {
    'id':'myDiv',
    'class':'myClass',
    'style':'cursor:pointer;font-weight:bold;',
    'html':'<span>For HTML</span>',
    'click':function(){ alert(this.id) },
    'mouseenter':function(){ $(this).css('color', 'red'); },
    'mouseleave':function(){ $(this).css('color', 'black'); }
}).appendTo('body');
 */
var laurbe ={
		logger: {
			enabled:false,
			log:function(obj){
				if(enabled){
					console.log(obj);
				}
			}
		},
		/**
		 * Reference for all created elements
		 */
		Directory:{

		},
		FunctionalElement:{
			lastWithReference:this,
			lastAndReference:this,
			with:function(){
				return this;
			},
			and:function(){
				return this;
			}
		},
		/**
		 * Base view element 
		 */
		BaseViewElement:{
			/**
			* String type definition
			**/
			type: 'laurbeBaseViewElement',
			/**
			 * Current element Id
			 */
			id:null,
			/**
			 * The wrapper element
			 */
			ele:null,
			/**
			 * InstanceProperties
			 */
			instanceProperties:null,
			/**
			* flag for initialization of current Object
			**/
			initialized:false,
			/**
			* Returns the id
			**/
			getName: function(){
				return this.id;
			},
			/**
			* RenderTo Element Jquery reference
			**/
			fatherElement: null,
			/**
			* initialize the wrapper
			**/
			init: function(){
				this.id = this.instanceProperties.id;
				laurbe.Directory[this.id] = this;
				this.fatherElement = $('#'+this.instanceProperties.renderTo);
				
				if(this.instanceProperties.wrapper && this.instanceProperties.wrapper.tag){
					this.ele = $(this.instanceProperties.wrapper.tag, { 
											 'id':this.id+'Wrapper'

											 ,'click': this.onclickHandler
											 ,'class': this.instanceProperties.wrapper.class
											 //'html':'<span> soy el '+this.id+'</span>'
								 			});
					this.ele.appendTo(this.fatherElement);
				}else{
					this.ele = this.fatherElement; //father and elewrapper are the same object
				}
				//this.bindEvents();
				if(!this.instanceProperties.items){
					this.instanceProperties.items =[];
				}
				this.initialized = true;
			},
			/**
			* If the component is based on template building
			**/
			template: null,

			
			render: function(){
				if(!this.initialized){
			  		this.init();
			  	}
				if(this.template){
					var self = this;
					var templateInfo = {appendTo: self.ele, data: self.instanceProperties};
					//always load to templateManager div container
					$('#templateManager').load(laurbe.templateManager.templatePath+self.template.url, function(templateString,  ajaxObject, ajaxState){
						$('#'+self.template.scriptId).tmpl(templateInfo.data).appendTo(templateInfo.appendTo);
						self.afterRender();
					});
				}
			},
			/**
			* Rebuild/reinitalize the entire element, and render
			**/
			renderTo:function(wrapperId){
				this.instanceProperties.renderTo=wrapperId;
				this.initialized=false;
				this.render();
			},
			/**
			* After render callback
			**/
			afterRender:function(){
				if(!this.instanceProperties.wrapper){ //usefull when this.instanceProperties.wrapper is undefined
					$('#'+this.id).on('click', this.onclickHandler);
				}
				
				var self = this;
				//self.bindEvents();
				if(self.instanceProperties.items){
					$.each(self.instanceProperties.items, function( index, item ) {
						item.owner = self;//reference to parent laurbe object
					  	item.renderTo(self.getRenderChildWrapperId());
					});
				}
			},
			/**
			* If exists this.items (child laurbe Objects) will renderIt
			**/
			appendChilds:function(items, renderNow){
				var self = this;
				$.each(items, function( index, item ) {
					self.instanceProperties.items.push(item);
					item.owner = self;//reference to parent laurbe object
				  	item.instanceProperties.renderTo = self.getRenderChildWrapperId();
				  	if(renderNow == true){
					  	item.render();
					}
				});
			
			},

			/**
			* Where to render child elements
			**/
			getRenderChildWrapperId:function(){
				console.log('this component not allows child objects');
			},
			/**
			* Remove all childs
			*/
			removeAllChilds:function(){
				$('#'+this.getRenderChildWrapperId()).empty();//jquery visual destroy
				this.items = []; //reinitialize items as empty array
				console.log('all childs have been removed')
			},
			/**
			* destroy the element
			**/
			destroy:function(){
				console.log ('internal destroy '+this.id);
				var self = this;
				$.each(this.items, function( index, item ) {
					destroy();
				});
				this.fatherElement.empty();//jquery visual destroy
				alert('internal destroy END');
			},
			/**
			* default onclick framework handlers
			**/
			onclickHandler: function(ev){
				if(true){
					console.log('el evento es');
					console.log(ev);
					console.log(' y el elemento es');
					console.log(this);
					console.log('y el laurbe element es ');
					console.log(laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')]);
				}
			},
			/**
			* To string log traces
			**/
			toString:function(){
				console.log('-----------------------');
				console.log('instanceProperties');
				console.log(this.instanceProperties);
				console.log('this.ele');
				console.log(this.ele);
				console.log('this.fatherElement');
				console.log(this.fatherElement);
				console.log('-----------------------');
			}

		},
		/**
		 * Default store for prototype loaded references
		 * (if the Js file is loaded will be added here to be available
		 */
		prototype:{
			BaseApp:{},
			BaseView:{}
		},
		
		
		/***********************************/
		/***********************************/
		/***********************************/
		
		
		
		/**
		 * Utils 
		 */
		utils:{
			id:0,
			/**
			 * Return a generated unique sequencial string
			 */
			getIdFor:function(prefix){
				this.id++;
				return prefix + this.id;
			}
		},

		/**
		* Init framework
		**/
		init:function(){
			//create div to load template Manager
			this.templateManager.init();
			this.modalDialogManager.init();//create div to load modalDialog Manager
		},
		/**
		* Template Manager
		*  
		* https://stackoverflow.com/questions/327047/what-is-the-most-efficient-way-to-create-html-elements-using-jquery
		*
		**/
		templateManager:{
			templatePath: '.',
			initialized:false,
			init: function(){
				if(!this.initialized){
					$('<div/>', { 'id':'templateManager'}).appendTo('body');
					console.log('templateManager Initialized OK.');
				}else{
					console.log('templateManager Already Initialized.');
				}
			}	
		},
		modalDialogManager:{
			templatePath: '.',
			initialized:false,
			init: function(){
				if(!this.initialized){
					$('<div/>', { 'id':'modalDialogManager'}).appendTo('body');
					console.log('modalDialogManager Initialized OK.');
				}else{
					console.log('modalDialogManager Already Initialized.');
				}
			}	
		},
		DAOManager:{

		}
		

};

laurbe.init();

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
		views:[],
		appLayoutTemplate:'classic'
	},
	/**
	* Info about APP Layout templates
	**/
	appLayoutTemplates:{
		classic:{
			scriptId : "appTemplate",
			url: '/html/components/app/appClassicTemplate.html'
		},
		dashboard:{
			scriptId : "appTemplate",
			url: '/html/components/app/appDashboardTemplate.html'
		}
	},	
	
	/**
	* The app main Styles , lok and feel
	**/
	style:{
		icon:'',
		theme:'dark'
	},
	/**
	* Asspcoated security and error views
	**/
	security:{
		errorView:{
			401:null,
			403:null,
			404:null,
			500:null
		}
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
	},
	/**
	* Builds:
	*	The menu , based on views
	**/
	init:function(){
		//1.Set the views
		this.views = this.instanceProperties.views;
		//2.Build The menu based on views
		this.buildMenu();
		/**
		* Render the menu
		**/
		this.render();

	},
	/**
	* Render the base html structure based on template
	**/
	render:function(){
		var self = this;
		//Get the selected appLayout
		var appLayoutTemplate = this.appLayoutTemplates[this.instanceProperties.appLayoutTemplate];
		$('#templateManager').load(laurbe.templateManager.templatePath+appLayoutTemplate.url, function(templateString,  ajaxObject, ajaxState){
			//1.Render APP Template
			$('#'+appLayoutTemplate.scriptId).tmpl({}).appendTo('body');

			//2.Render the menu
			self.menu.selectMenuItem(self.menu.instanceProperties.items[0]); //by default select the first
			self.menu.render();
			

			//3.Render first view
			self.showView(self.views[0]);

		});
	},
	/**
	* Builds the menu based on views
	**/
	buildMenu:function(){
		var self=this;
		
		var menuItems = [];
		//Add Items
		$.each(this.instanceProperties.views, function( index, view ) {
			menuItems.push(
					new laurbe.NavBarMenuItem({
						text:view.instanceProperties.menuName,
						selected: false,
						onclick:function(){
							self.showView(view);
						}
					})
			);
		});

		//Main properties
		this.menu = new laurbe.NavBar({	
				        				renderTo:'appMenuContainer',
										title:this.instanceProperties.title,
										items:menuItems
		});

		return this.menu;
	},
	/**
	*
	**/
	showView:function(view){
		alert('limpiando appMainViewContainer');
		$('#appMainViewContainer').empty();
		alert('renderizando view a appMainViewContainer'+view);
		console.log('y la view es ');
		console.log(view);
		view.renderTo('appMainViewContainer');

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
			/**
			 *  the App title and name
			**/
			title: 'My App',
			appLayoutTemplate:'classic'
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	//initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Layout.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.App, {instanceProperties:initializationProps});


	return instance;
}
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
		$.each(this.instanceProperties.items, function( index, item ) {
			item.renderTo(wrapperId);
		});
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
/**
 * The menu item prototype
 */
laurbe.prototype.Button = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'button',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "buttonTemplate",
				url: '/html/components/form/buttonTemplate.html'
	},
	onclickHandler: function(ev){
		alert('soy Button');
		console.log(this);
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}

		//up the notification
		if(currentObject.owner && currentObject.owner.onChildItemEvent){
			currentObject.owner.onChildItemEvent(ev, ev, currentObject);
		}

		

	},
	onItemClicked:function (childItem){
		console.log(childItem.id+ ' me avisa que le han clickado ');
		console.log(this.instanceProperties.items);
	}
		

});


/**
 * Constructor definition
 */
laurbe.Button = function Button(args){
	
	/** Init values **/
	var defaults = {
			text: 'button',
			//important do not use wrapper!!
			type:'primary',
			//align: 'float-right'
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Button.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Button, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.ButtonGroup = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'buttonGroup',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "buttonGroupTemplate",
				url: '/html/components/form/buttonGroupTemplate.html'
	},
	onclickHandler: function(ev){
		alert('soy Button group');
		console.log(this);
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}

		//up the notification
		if(currentObject.owner && currentObject.owner.onChildItemEvent){
			currentObject.owner.onChildItemEvent(ev, ev, currentObject);
		}

		

	},
	onItemClicked:function (childItem){
		console.log(childItem.id+ ' me avisa que le han clickado ');
		console.log(this.instanceProperties.items);
	},
	/**
	* Return the div Id where the child element must be append
	**/
	getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
		

});


/**
 * Constructor definition
 */
laurbe.ButtonGroup = function ButtonGroup(args){
	
	/** Init values **/
	var defaults = {
			text: 'button',
			//important do not use wrapper!!
			type:'primary',
			//align: 'float-right'
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.ButtonGroup.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.ButtonGroup, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Card = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'card',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "cardTemplate",
				url: '/html/components/layout/cardTemplate.html'
	},
	onclickHandler: function(ev){
		console.log(this);
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}

		//up the notification
		if(currentObject.owner && currentObject.owner.onChildItemEvent){
			currentObject.owner.onChildItemEvent(ev, ev, currentObject);
		}

		

	},
	onItemClicked:function (childItem){
		console.log(childItem.id+ ' me avisa que le han clickado ');
		console.log(this.instanceProperties.items);
	},
	/**
	* Return the div Id where the child element must be append
	**/
	getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
		

});


/**
 * Constructor definition
 */
laurbe.Card = function Card(args){
	
	/** Init values **/
	var defaults = {
			/**
			wrapper:{
				tag:'<div>',
				class :'container'
				//,class:'d-flex justify-content-center align-self-center'
			}
			**/
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Card.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Card, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.CardGroup = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'cardGroup',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "cardGroupTemplate",
				url: '/html/components/layout/cardGroupTemplate.html'
	},
	onclickHandler: function(ev){
		alert('soy container');
		console.log(this);
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}

		//up the notification
		if(currentObject.owner && currentObject.owner.onChildItemEvent){
			currentObject.owner.onChildItemEvent(ev, ev, currentObject);
		}

		

	},
	onItemClicked:function (childItem){
		console.log(childItem.id+ ' me avisa que le han clickado ');
		console.log(this.instanceProperties.items);
	},
	/**
	* Return the div Id where the child element must be append
	**/
	getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
		

});


/**
 * Constructor definition
 */
laurbe.CardGroup = function CardGroup(args){
	
	/** Init values **/
	var defaults = {
			items:[]
			/**
			wrapper:{
				tag:'<div>',
				class :'container'
				//,class:'d-flex justify-content-center align-self-center'
			}
			**/
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.CardGroup.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.CardGroup, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Column = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'column',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "columnTemplate",
				url: '/html/components/grid/columnTemplate.html'
	},
	onclickHandler: function(ev){
		alert('soy container');
		console.log(this);
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}

		//up the notification
		if(currentObject.owner && currentObject.owner.onChildItemEvent){
			currentObject.owner.onChildItemEvent(ev, ev, currentObject);
		}

		

	},
	onItemClicked:function (childItem){
		console.log(childItem.id+ ' me avisa que le han clickado ');
		console.log(this.instanceProperties.items);
	},
	/**
	* Return the div Id where the child element must be append
	**/
	getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
		

});


/**
 * Constructor definition
 */
laurbe.Column = function Column(args){
	
	/** Init values **/
	var defaults = {
			/**
			wrapper:{
				tag:'<div>',
				class :'container'
				//,class:'d-flex justify-content-center align-self-center'
			}
			**/
			
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Column.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Column, {instanceProperties:initializationProps});


	return instance;
}
laurbe.prototype.App=$.extend({},laurbe.prototype.BaseAPP,{instanceProperties:{views:[],appLayoutTemplate:"classic"},appLayoutTemplates:{classic:{scriptId:"appTemplate",url:"/html/components/app/appClassicTemplate.html"},dashboard:{scriptId:"appTemplate",url:"/html/components/app/appDashboardTemplate.html"}},style:{icon:"",theme:"dark"},security:{errorView:{401:null,403:null,404:null,500:null}},views:[],menu:null,footer:{style:{align:"center"},elements:[]},init:function(){this.views=this.instanceProperties.views,this.buildMenu(),this.render()},render:function(){var a=this,b=this.appLayoutTemplates[this.instanceProperties.appLayoutTemplate];$("#templateManager").load(laurbe.templateManager.templatePath+b.url,function(c,d,e){$("#"+b.scriptId).tmpl({}).appendTo("body"),a.menu.selectMenuItem(a.menu.instanceProperties.items[0]),a.menu.render(),a.showView(a.views[0])})},buildMenu:function(){var a=this,b=[];return $.each(this.instanceProperties.views,function(c,d){b.push(new laurbe.NavBarMenuItem({text:d.instanceProperties.menuName,selected:!1,onclick:function(){a.showView(d)}}))}),this.menu=new laurbe.NavBar({renderTo:"appMenuContainer",title:this.instanceProperties.title,items:b}),this.menu},showView:function(a){alert("limpiando appMainViewContainer"),$("#appMainViewContainer").empty(),alert("renderizando view a appMainViewContainer"+a),console.log("y la view es "),console.log(a),a.renderTo("appMainViewContainer")},start:function(){}}),laurbe.App=function(a){var b={title:"My App",appLayoutTemplate:"classic"},c=$.extend({},b,a),d=$.extend({},laurbe.prototype.App,{instanceProperties:c});return d},laurbe.prototype.View=$.extend({},laurbe.prototype.BaseAPP,{type:"view",instanceProperties:{menuName:"View 1"},items:[],init:function(){},renderTo:function(a){$.each(this.instanceProperties.items,function(b,c){c.renderTo(a)})}}),laurbe.View=function(a){var b={},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.View.type);var d=$.extend({},laurbe.prototype.View,{instanceProperties:c});return d},laurbe.prototype.Button=$.extend({},laurbe.BaseViewElement,{type:"button",owner:null,template:{scriptId:"buttonTemplate",url:"/html/components/form/buttonTemplate.html"},onclickHandler:function(a){alert("soy Button"),console.log(this);var b=laurbe.Directory[a.currentTarget.id.replace("Wrapper","")];b.instanceProperties.onclick?b.instanceProperties.onclick(a):console.log("no hay event definido para "+b.id),b.owner&&b.owner.onChildItemEvent&&b.owner.onChildItemEvent(a,a,b)},onItemClicked:function(a){console.log(a.id+" me avisa que le han clickado "),console.log(this.instanceProperties.items)}}),laurbe.Button=function(a){var b={text:"button",type:"primary"},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.Button.type);var d=$.extend({},laurbe.prototype.Button,{instanceProperties:c});return d},laurbe.prototype.ButtonGroup=$.extend({},laurbe.BaseViewElement,{type:"buttonGroup",owner:null,template:{scriptId:"buttonGroupTemplate",url:"/html/components/form/buttonGroupTemplate.html"},onclickHandler:function(a){alert("soy Button group"),console.log(this);var b=laurbe.Directory[a.currentTarget.id.replace("Wrapper","")];b.instanceProperties.onclick?b.instanceProperties.onclick(a):console.log("no hay event definido para "+b.id),b.owner&&b.owner.onChildItemEvent&&b.owner.onChildItemEvent(a,a,b)},onItemClicked:function(a){console.log(a.id+" me avisa que le han clickado "),console.log(this.instanceProperties.items)},getRenderChildWrapperId:function(){return this.id+"_childsWrapper"}}),laurbe.ButtonGroup=function(a){var b={text:"button",type:"primary"},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.ButtonGroup.type);var d=$.extend({},laurbe.prototype.ButtonGroup,{instanceProperties:c});return d},laurbe.prototype.Card=$.extend({},laurbe.BaseViewElement,{type:"card",owner:null,template:{scriptId:"cardTemplate",url:"/html/components/layout/cardTemplate.html"},onclickHandler:function(a){console.log(this);var b=laurbe.Directory[a.currentTarget.id.replace("Wrapper","")];b.instanceProperties.onclick?b.instanceProperties.onclick(a):console.log("no hay event definido para "+b.id),b.owner&&b.owner.onChildItemEvent&&b.owner.onChildItemEvent(a,a,b)},onItemClicked:function(a){console.log(a.id+" me avisa que le han clickado "),console.log(this.instanceProperties.items)},getRenderChildWrapperId:function(){return this.id+"_childsWrapper"}}),laurbe.Card=function(a){var b={},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.Card.type);var d=$.extend({},laurbe.prototype.Card,{instanceProperties:c});return d},laurbe.prototype.CardGroup=$.extend({},laurbe.BaseViewElement,{type:"cardGroup",owner:null,template:{scriptId:"cardGroupTemplate",url:"/html/components/layout/cardGroupTemplate.html"},onclickHandler:function(a){alert("soy container"),console.log(this);var b=laurbe.Directory[a.currentTarget.id.replace("Wrapper","")];b.instanceProperties.onclick?b.instanceProperties.onclick(a):console.log("no hay event definido para "+b.id),b.owner&&b.owner.onChildItemEvent&&b.owner.onChildItemEvent(a,a,b)},onItemClicked:function(a){console.log(a.id+" me avisa que le han clickado "),console.log(this.instanceProperties.items)},getRenderChildWrapperId:function(){return this.id+"_childsWrapper"}}),laurbe.CardGroup=function(a){var b={items:[]},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.CardGroup.type);var d=$.extend({},laurbe.prototype.CardGroup,{instanceProperties:c});return d},laurbe.prototype.Column=$.extend({},laurbe.BaseViewElement,{type:"column",owner:null,template:{scriptId:"columnTemplate",url:"/html/components/grid/columnTemplate.html"},onclickHandler:function(a){alert("soy container"),console.log(this);var b=laurbe.Directory[a.currentTarget.id.replace("Wrapper","")];b.instanceProperties.onclick?b.instanceProperties.onclick(a):console.log("no hay event definido para "+b.id),b.owner&&b.owner.onChildItemEvent&&b.owner.onChildItemEvent(a,a,b)},onItemClicked:function(a){console.log(a.id+" me avisa que le han clickado "),console.log(this.instanceProperties.items)},getRenderChildWrapperId:function(){return this.id+"_childsWrapper"}}),laurbe.Column=function(a){var b={},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.Column.type);var d=$.extend({},laurbe.prototype.Column,{instanceProperties:c});return d},laurbe.prototype.App=$.extend({},laurbe.prototype.BaseAPP,{type:"app",owner:null,template:{scriptId:"layoutTemplate",url:"/html/components/layout/layoutTemplate.html"},getRenderChildWrapperId:function(){return this.id+"_childsWrapper"}}),laurbe.App=function(a){var b={wrapper:{tag:"<div>","class":"mt-1"},text:"Option",selected:!0},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.Layout.type);var d=$.extend({},laurbe.prototype.Layout,{instanceProperties:c});return d},laurbe.prototype.Container=$.extend({},laurbe.BaseViewElement,{type:"container",owner:null,template:{scriptId:"containerTemplate",url:"/html/components/layout/containerTemplate.html"},onclickHandler:function(a){console.log("Container Pulsado"),console.log(this);var b=laurbe.Directory[a.currentTarget.id.replace("Wrapper","")];b.instanceProperties.onclick?b.instanceProperties.onclick(a):console.log("no hay event definido para "+b.id),b.owner&&b.owner.onChildItemEvent&&b.owner.onChildItemEvent(a,a,b)},onItemClicked:function(a){console.log(a.id+" me avisa que le han clickado "),console.log(this.instanceProperties.items)},getRenderChildWrapperId:function(){return this.id+"_childsWrapper"}}),laurbe.Container=function(a){var b={wrapper:{tag:"<div>","class":"container"},marginTop:"mt-5"},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.Container.type);var d=$.extend({},laurbe.prototype.Container,{instanceProperties:c});return d},laurbe.prototype.Form=$.extend({},laurbe.BaseViewElement,{type:"form",owner:null,template:{scriptId:"formTemplate",url:"/html/components/form/formTemplate.html"},getRenderChildWrapperId:function(){return this.id}}),laurbe.Form=function(a){var b={},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.Form.type);var d=$.extend({},laurbe.prototype.Form,{instanceProperties:c});return d},laurbe.prototype.Grid=$.extend({},laurbe.BaseViewElement,{type:"grid",owner:null,template:{scriptId:"gridTemplate",url:"/html/components/grid/gridTemplate.html"},onclickHandler:function(a){alert("soy container"),console.log(this);var b=laurbe.Directory[a.currentTarget.id.replace("Wrapper","")];b.instanceProperties.onclick?b.instanceProperties.onclick(a):console.log("no hay event definido para "+b.id),b.owner&&b.owner.onChildItemEvent&&b.owner.onChildItemEvent(a,a,b)},onItemClicked:function(a){console.log(a.id+" me avisa que le han clickado "),console.log(this.instanceProperties.items)},getRenderChildWrapperId:function(){return this.id+"_childsWrapper"}}),laurbe.Grid=function(a){var b={},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.Grid.type);var d=$.extend({},laurbe.prototype.Grid,{instanceProperties:c});return d},laurbe.prototype.Image=$.extend({},laurbe.BaseViewElement,{type:"image",owner:null,template:{scriptId:"imageTemplate",url:"/html/components/image/imageTemplate.html"},onclickHandler:function(a){alert("soy IMAGE"),console.log(this);var b=laurbe.Directory[a.currentTarget.id.replace("Wrapper","")];b.instanceProperties.onclick?b.instanceProperties.onclick(a):console.log("no hay event definido para "+b.id),b.owner&&b.owner.onChildItemEvent&&b.owner.onChildItemEvent(a,a,b)},onItemClicked:function(a){console.log(a.id+" me avisa que le han clickado "),console.log(this.instanceProperties.items)},getRenderChildWrapperId:function(){return this.id+"_childsWrapper"}}),laurbe.Image=function(a){var b={wrapper:{tag:"<div>","class":"d-flex justify-content-center align-self-center"}},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.Image.type);var d=$.extend({},laurbe.prototype.Image,{instanceProperties:c});return d};var laurbe={logger:{enabled:!1,log:function(a){enabled&&console.log(a)}},Directory:{},FunctionalElement:{lastWithReference:this,lastAndReference:this,"with":function(){return this},and:function(){return this}},BaseViewElement:{type:"laurbeBaseViewElement",id:null,ele:null,instanceProperties:null,initialized:!1,getName:function(){return this.id},fatherElement:null,init:function(){this.id=this.instanceProperties.id,laurbe.Directory[this.id]=this,this.fatherElement=$("#"+this.instanceProperties.renderTo),this.instanceProperties.wrapper&&this.instanceProperties.wrapper.tag?(this.ele=$(this.instanceProperties.wrapper.tag,{id:this.id+"Wrapper",click:this.onclickHandler,"class":this.instanceProperties.wrapper["class"]}),this.ele.appendTo(this.fatherElement)):this.ele=this.fatherElement,this.instanceProperties.items||(this.instanceProperties.items=[]),this.initialized=!0},template:null,render:function(){if(this.initialized||this.init(),this.template){var a=this,b={appendTo:a.ele,data:a.instanceProperties};$("#templateManager").load(laurbe.templateManager.templatePath+a.template.url,function(c,d,e){$("#"+a.template.scriptId).tmpl(b.data).appendTo(b.appendTo),a.afterRender()})}},renderTo:function(a){this.instanceProperties.renderTo=a,this.initialized=!1,this.render()},afterRender:function(){this.instanceProperties.wrapper||$("#"+this.id).on("click",this.onclickHandler);var a=this;a.instanceProperties.items&&$.each(a.instanceProperties.items,function(b,c){c.owner=a,c.renderTo(a.getRenderChildWrapperId())})},appendChilds:function(a,b){var c=this;$.each(a,function(a,d){c.instanceProperties.items.push(d),d.owner=c,d.instanceProperties.renderTo=c.getRenderChildWrapperId(),1==b&&d.render()})},getRenderChildWrapperId:function(){console.log("this component not allows child objects")},removeAllChilds:function(){$("#"+this.getRenderChildWrapperId()).empty(),this.items=[],console.log("all childs have been removed")},destroy:function(){console.log("internal destroy "+this.id);$.each(this.items,function(a,b){destroy()}),this.fatherElement.empty(),alert("internal destroy END")},onclickHandler:function(a){console.log("el evento es"),console.log(a),console.log(" y el elemento es"),console.log(this),console.log("y el laurbe element es "),console.log(laurbe.Directory[a.currentTarget.id.replace("Wrapper","")])},toString:function(){console.log("-----------------------"),console.log("instanceProperties"),console.log(this.instanceProperties),console.log("this.ele"),console.log(this.ele),console.log("this.fatherElement"),console.log(this.fatherElement),console.log("-----------------------")}},prototype:{BaseApp:{},BaseView:{}},utils:{id:0,getIdFor:function(a){return this.id++,a+this.id}},init:function(){this.templateManager.init(),this.modalDialogManager.init()},templateManager:{templatePath:".",initialized:!1,init:function(){this.initialized?console.log("templateManager Already Initialized."):($("<div/>",{id:"templateManager"}).appendTo("body"),console.log("templateManager Initialized OK."))}},modalDialogManager:{templatePath:".",initialized:!1,init:function(){this.initialized?console.log("modalDialogManager Already Initialized."):($("<div/>",{id:"modalDialogManager"}).appendTo("body"),console.log("modalDialogManager Initialized OK."))}},DAOManager:{}};laurbe.init(),laurbe.prototype.Layout=$.extend({},laurbe.BaseViewElement,{type:"layout",owner:null,template:{scriptId:"layoutTemplate",url:"/html/components/layout/layoutTemplate.html"},getRenderChildWrapperId:function(){return this.id+"_childsWrapper"}}),laurbe.Layout=function(a){var b={wrapper:{tag:"<div>","class":"mt-1"},text:"Option",selected:!0},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.Layout.type);var d=$.extend({},laurbe.prototype.Layout,{instanceProperties:c});return d},laurbe.prototype.ModalDialog=$.extend({},laurbe.BaseViewElement,{type:"modalDialog",template:{scriptId:"modalDialogTemplate",url:"/html/components/modalDialog/modalDialogTemplate.html"},getRenderChildWrapperId:function(){return this.id+"_childsWrapper"},onChildItemEvent:function(a,b,c){console.log(c.id+" me avisa que le han clickado "),console.log("sus hermanos son "),console.log(this.instanceProperties.items),$.each(this.instanceProperties.items,function(a,b){b.id==c.id?b.setActive(!0):b.setActive(!1)})},show:function(){this.render()},afterRender:function(){$("#"+this.id).show()},hide:function(){$("#"+this.id).hide()},onclickHandler:function(a){console.log("soy modalDialog y me han pulsado")}}),laurbe.ModalDialog=function(a){var b={title:"defaultTitle",renderTo:"appMainViewContainer",wrapper:{tag:"<div>"},items:[]},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.ModalDialog.type);var d=$.extend({},laurbe.prototype.ModalDialog,{instanceProperties:c});return d},laurbe.prototype.NavBar=$.extend({},laurbe.BaseViewElement,{type:"navBar",template:{scriptId:"navbarWrapperTemplate",url:"/html/components/navBar/navBarTemplate.html"},selectMenuItem:function(a){$.each(this.instanceProperties.items,function(b,c){a.instanceProperties.id==c.instanceProperties.id?c.setActive(!0):c.setActive(!1)})},getRenderChildWrapperId:function(){return this.id+"_childsWrapper"},onChildItemEvent:function(a,b,c){console.log(c.id+" me avisa que le han clickado "),console.log("sus hermanos son "),console.log(this.instanceProperties.items),$.each(this.instanceProperties.items,function(a,b){b.id==c.id?b.setActive(!0):b.setActive(!1)})},onclickHandler:function(a){console.log("soy navBar y me han pulsado")}}),laurbe.NavBar=function(a){var b={title:"defaultTitle",wrapper:{tag:"<div>"},items:[]},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.NavBar.type);var d=$.extend({},laurbe.prototype.NavBar,{instanceProperties:c});return d},laurbe.prototype.NavBarMenuItem=$.extend({},laurbe.BaseViewElement,{type:"navBarMenuItem",owner:null,template:{scriptId:"navbarMenuItemTemplate",url:"/html/components/navBar/navBarMenuItemTemplate.html"},onclickHandler:function(a){console.log("soy item y me han pulsado"),console.log(this);var b=laurbe.Directory[a.currentTarget.id.replace("Wrapper","")];b.instanceProperties.onclick?b.instanceProperties.onclick(a):console.log("no hay event definido para "+b.id),b.owner&&b.owner.onChildItemEvent(a,a,b)},onItemClicked:function(a){console.log(a.id+" me avisa que le han clickado "),console.log(this.instanceProperties.items)},setActive:function(a){a?(this.instanceProperties.selected=!0,$("#"+this.id).addClass("active")):(this.instanceProperties.selected=!1,$("#"+this.id).removeClass("active"))}}),laurbe.NavBarMenuItem=function(a){var b={wrapper:{tag:"<div>"},text:"Option",selected:!0},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.NavBarMenuItem.type);var d=$.extend({},laurbe.prototype.NavBarMenuItem,{instanceProperties:c});return d},laurbe.prototype.Region=$.extend({},laurbe.BaseViewElement,{type:"region",owner:null,template:{scriptId:"regionTemplate",url:"/html/components/layout/regionTemplate.html"},getRenderChildWrapperId:function(){return this.id+"_childsWrapper"}}),laurbe.Region=function(a){var b={wrapper:null,fixedSize:""},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.Region.type);var d=$.extend({},laurbe.prototype.Region,{instanceProperties:c});return d},laurbe.prototype.Row=$.extend({},laurbe.BaseViewElement,{type:"row",owner:null,template:{scriptId:"rowTemplate",url:"/html/components/grid/rowTemplate.html"},onclickHandler:function(a){alert("soy container"),console.log(this);var b=laurbe.Directory[a.currentTarget.id.replace("Wrapper","")];b.instanceProperties.onclick?b.instanceProperties.onclick(a):console.log("no hay event definido para "+b.id),b.owner&&b.owner.onChildItemEvent&&b.owner.onChildItemEvent(a,a,b)},onItemClicked:function(a){console.log(a.id+" me avisa que le han clickado "),console.log(this.instanceProperties.items)},getRenderChildWrapperId:function(){return this.id+"_childsWrapper"}}),laurbe.Row=function(a){var b={},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.Row.type);var d=$.extend({},laurbe.prototype.Row,{instanceProperties:c});return d},laurbe.prototype.TextField=$.extend({},laurbe.BaseViewElement,{type:"textField",owner:null,template:{scriptId:"textFieldTemplate",url:"/html/components/form/textFieldTemplate.html"},onclickHandler:function(a){console("TEXT FIELD PULSADO"),console.log(this);var b=laurbe.Directory[a.currentTarget.id.replace("Wrapper","")];b.instanceProperties.onclick?b.instanceProperties.onclick(a):console.log("no hay event definido para "+b.id),b.owner&&b.owner.onChildItemEvent&&b.owner.onChildItemEvent(a,a,b)},onItemClicked:function(a){console.log(a.id+" me avisa que le han clickado "),console.log(this.instanceProperties.items)}}),laurbe.TextField=function(a){var b={},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.TextField.type);var d=$.extend({},laurbe.prototype.TextField,{instanceProperties:c});return d},laurbe.prototype.Title=$.extend({},laurbe.BaseViewElement,{type:"title",owner:null,template:{scriptId:"titleTemplate",url:"/html/components/layout/titleTemplate.html"},getRenderChildWrapperId:function(){console.log("this element not allows child objects")}}),laurbe.Title=function(a){var b={wrapper:null},c=$.extend({},b,a);c.id=c.id||laurbe.utils.getIdFor(laurbe.prototype.Title.type);var d=$.extend({},laurbe.prototype.Title,{instanceProperties:c});return d};var functionalFunction={afterThen:function(){},then:function(){return this}};laurbe.prototype.RestDAO=$.extend({},laurbe.DAOManager,{entityPaths:null,headers:null,init:function(){$.ajaxSetup({beforeSend:function(a){}})},get:function(a,b){$.ajax({type:"GET",url:this.entityPaths[a],success:function(a){b(a)},error:function(a){alert("something wrong!!"),console.log(a),b(a)}})}}),laurbe.RestDAO=function(a){var b={entityPaths:{person:"/persons"},headers:{Accept:"application/json; charset=utf-8",contentType:"application/json; charset=utf-8"}},c=$.extend({},b,a),d=$.extend({},laurbe.prototype.RestDAO,c);return d};
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
	* String type definition
	**/
	type: 'app',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "layoutTemplate",
				url: '/html/components/layout/layoutTemplate.html'
	},
	/**
	* Return the div Id where the child element must be append
	**/
	getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
		

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
/**
 * The menu item prototype
 */
laurbe.prototype.Container = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'container',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "containerTemplate",
				url: '/html/components/layout/containerTemplate.html'
	},
	onclickHandler: function(ev){
		console.log('Container Pulsado');
		console.log(this);
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}

		//up the notification
		if(currentObject.owner && currentObject.owner.onChildItemEvent){
			currentObject.owner.onChildItemEvent(ev, ev, currentObject);
		}

		

	},
	onItemClicked:function (childItem){
		console.log(childItem.id+ ' me avisa que le han clickado ');
		console.log(this.instanceProperties.items);
	},
	/**
	* Return the div Id where the child element must be append
	**/
	getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
		

});


/**
 * Constructor definition
 */
laurbe.Container = function Container(args){
	
	/** Init values **/
	var defaults = {
		
			wrapper:{
				tag:'<div>',
				class :'container'
				//,class:'d-flex justify-content-center align-self-center'
			},
			marginTop:'mt-5'
			//childsWrapperStyle:'text-align:center'
			
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Container.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Container, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Form = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'form',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "formTemplate",
				url: '/html/components/form/formTemplate.html'
	},
	/**
	* Return the div Id where the child element must be append
	**/
	getRenderChildWrapperId:function(){
		return this.id;
	}
		

});


/**
 * Constructor definition
 */
laurbe.Form = function Form(args){
	
	/** Init values **/
	var defaults = {
		//title:'myForm'

	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Form.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Form, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Grid = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'grid',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "gridTemplate",
				url: '/html/components/grid/gridTemplate.html'
	},
	onclickHandler: function(ev){
		alert('soy container');
		console.log(this);
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}

		//up the notification
		if(currentObject.owner && currentObject.owner.onChildItemEvent){
			currentObject.owner.onChildItemEvent(ev, ev, currentObject);
		}

		

	},
	onItemClicked:function (childItem){
		console.log(childItem.id+ ' me avisa que le han clickado ');
		console.log(this.instanceProperties.items);
	},
	/**
	* Return the div Id where the child element must be append
	**/
	getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
		

});


/**
 * Constructor definition
 */
laurbe.Grid = function Grid(args){
	
	/** Init values **/
	var defaults = {
			/**
			wrapper:{
				tag:'<div>',
				class :'container'
				//,class:'d-flex justify-content-center align-self-center'
			}
			**/
			
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Grid.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Grid, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Image = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'image',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "imageTemplate",
				url: '/html/components/image/imageTemplate.html'
	},
	onclickHandler: function(ev){
		alert('soy IMAGE');
		console.log(this);
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}

		//up the notification
		if(currentObject.owner && currentObject.owner.onChildItemEvent){
			currentObject.owner.onChildItemEvent(ev, ev, currentObject);
		}

		

	},
	onItemClicked:function (childItem){
		console.log(childItem.id+ ' me avisa que le han clickado ');
		console.log(this.instanceProperties.items);
	},
	/**
	* Return the div Id where the child element must be append
	**/
	getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	}
		

});


/**
 * Constructor definition
 */
laurbe.Image = function Image(args){
	
	/** Init values **/
	var defaults = {
			wrapper:{
				tag:'<div>', 
				class:'d-flex justify-content-center align-self-center'
			}
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Image.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Image, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Layout = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'layout',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "layoutTemplate",
				url: '/html/components/layout/layoutTemplate.html'
	},
	/**
	* Return the div Id where the child element must be append
	**/
	getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	}
		

});


/**
 * Constructor definition
 */
laurbe.Layout = function Layout(args){
	
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
/**
 * Prototype Definition 
 */
laurbe.prototype.ModalDialog = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'modalDialog',
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "modalDialogTemplate",
				url: '/html/components/modalDialog/modalDialogTemplate.html'
	},
	/**
	* Return the div Id where the child element must be append
	**/
	getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
	onChildItemEvent:function (eventType, event, eventItem){
		console.log(eventItem.id+ ' me avisa que le han clickado ');
		console.log('sus hermanos son ');
		console.log(this.instanceProperties.items);
		$.each(this.instanceProperties.items, function( index, item ) {
		  		if(item.id==eventItem.id){
			  		item.setActive(true);
			  	}else{
			  		item.setActive(false);
			  	}
		});
	},
	/**
	* Show the modalDialog
	**/
	show:function(){
		this.render();
	},
	afterRender:function(){
		$('#'+this.id).show();
	},
	/**
	* hide it
	**/ 
	hide:function(){
		$('#'+this.id).hide();
	},
	/**
	* Clicked and MenuItemDlement
	**/
	onclickHandler: function(ev){
		console.log('soy modalDialog y me han pulsado');
		/**
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}
		
		console.log(ev);
		console.log(ev.currentTarget.id);
		self = laurbe.Directory[ev.currentTarget.id];
		console.log(self.instanceProperties.items);
		$.each(self.instanceProperties.items, function( index, item ) {
					  	item.setActive();
					});
		**/
		
	}

});


/**
 * Constructor definition
 */
laurbe.ModalDialog = function ModalDialog(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
			title:'defaultTitle',
			renderTo:'appMainViewContainer',
			wrapper:{
				tag:'<div>'
			},
			items: []
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.ModalDialog.type) ;
	
	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.ModalDialog, {instanceProperties:initializationProps});
	

	
	return instance;
}
/**
 * Prototype Definition 
 */
laurbe.prototype.NavBar = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'navBar',
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "navbarWrapperTemplate",
				url: '/html/components/navBar/navBarTemplate.html'
	},
	/**
	* Force a click over a item menu
	**/
	selectMenuItem:function(menuItem){
		$.each(this.instanceProperties.items, function( index, item ) {
			if(menuItem.instanceProperties.id == item.instanceProperties.id){
				item.setActive(true);
			}else{
				item.setActive(false);
			}
		});
	},
	/**
	* Return the div Id where the child element must be append
	**/
	getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
	onChildItemEvent:function (eventType, event, eventItem){
		console.log(eventItem.id+ ' me avisa que le han clickado ');
		console.log('sus hermanos son ');
		console.log(this.instanceProperties.items);
		$.each(this.instanceProperties.items, function( index, item ) {
		  		if(item.id==eventItem.id){
			  		item.setActive(true);
			  	}else{
			  		item.setActive(false);
			  	}
		});
	},
	/**
	* Clicked and MenuItemDlement
	**/
	onclickHandler: function(ev){
		console.log('soy navBar y me han pulsado');
		/**
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}
		
		console.log(ev);
		console.log(ev.currentTarget.id);
		self = laurbe.Directory[ev.currentTarget.id];
		console.log(self.instanceProperties.items);
		$.each(self.instanceProperties.items, function( index, item ) {
					  	item.setActive();
					});
		**/
		
	}

});


/**
 * Constructor definition
 */
laurbe.NavBar = function NavBar(args){
	
	/** Init values for laurbe.navBar **/
	var navBarDefaults = {
			title:'defaultTitle',
			wrapper:{
				tag:'<div>'
			},
			items: []
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, navBarDefaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.NavBar.type) ;
	
	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.NavBar, {instanceProperties:initializationProps});
	

	
	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.NavBarMenuItem = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'navBarMenuItem',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "navbarMenuItemTemplate",
				url: '/html/components/navBar/navBarMenuItemTemplate.html'
	},
	onclickHandler: function(ev){
		console.log('soy item y me han pulsado');
		console.log(this);
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}

		//up the notification
		if(currentObject.owner){
			currentObject.owner.onChildItemEvent(ev, ev, currentObject);
		}

		

	},
	onItemClicked:function (menuItem){
		console.log(menuItem.id+ ' me avisa que le han clickado ');
		console.log(this.instanceProperties.items);
	},
	/**
	* Mark this item as active render
	**/
	setActive:function(isActive){
		if(isActive){
			this.instanceProperties.selected=true;
			$('#'+this.id).addClass('active');
		}else{
			this.instanceProperties.selected=false;
			$('#'+this.id).removeClass('active');
		}
	}	

});


/**
 * Constructor definition
 */
laurbe.NavBarMenuItem = function navBarMenuItem(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
			wrapper:{
				tag:'<div>'
			},
			text:'Option',
			selected: true
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.NavBarMenuItem.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.NavBarMenuItem, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Region = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'region',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "regionTemplate",
				url: '/html/components/layout/regionTemplate.html'
	},
	/**
	* Return the div Id where the child element must be append
	**/
	getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	}
		

});


/**
 * Constructor definition
 */
laurbe.Region = function Region(args){
	
	/** Init values **/
	var defaults = {
			wrapper:null,//no use wrapper
			//text:'Region',
			//align:'float-right',
			fixedSize:''

	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Region.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Region, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Row = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'row',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "rowTemplate",
				url: '/html/components/grid/rowTemplate.html'
	},
	onclickHandler: function(ev){
		alert('soy container');
		console.log(this);
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}

		//up the notification
		if(currentObject.owner && currentObject.owner.onChildItemEvent){
			currentObject.owner.onChildItemEvent(ev, ev, currentObject);
		}

		

	},
	onItemClicked:function (childItem){
		console.log(childItem.id+ ' me avisa que le han clickado ');
		console.log(this.instanceProperties.items);
	},
	/**
	* Return the div Id where the child element must be append
	**/
	getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
		

});


/**
 * Constructor definition
 */
laurbe.Row = function Row(args){
	
	/** Init values **/
	var defaults = {
			/**
			wrapper:{
				tag:'<div>',
				class :'container'
				//,class:'d-flex justify-content-center align-self-center'
			}
			**/
			
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Row.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Row, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.TextField = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'textField',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "textFieldTemplate",
				url: '/html/components/form/textFieldTemplate.html'
	},
	onclickHandler: function(ev){
		console('TEXT FIELD PULSADO');
		console.log(this);
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}

		//up the notification
		if(currentObject.owner && currentObject.owner.onChildItemEvent){
			currentObject.owner.onChildItemEvent(ev, ev, currentObject);
		}

		

	},
	onItemClicked:function (childItem){
		console.log(childItem.id+ ' me avisa que le han clickado ');
		console.log(this.instanceProperties.items);
	}
		

});


/**
 * Constructor definition
 */
laurbe.TextField = function TextField(args){
	
	/** Init values **/
	var defaults = {
			//label: 'textField',
			//value:'...'
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.TextField.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.TextField, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Title = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'title',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "titleTemplate",
				url: '/html/components/layout/titleTemplate.html'
	},
	/**
	* Return the div Id where the child element must be append
	**/
	getRenderChildWrapperId:function(){
		console.log("this element not allows child objects");
	}
		

});


/**
 * Constructor definition
 */
laurbe.Title = function Title(args){
	
	/** Init values **/
	var defaults = {
			wrapper:null,//no use wrapper
			//text:'Region',
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Title.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Title, {instanceProperties:initializationProps});


	return instance;
}
var functionalFunction = {
	
	afterThen:function(){

	},
	then:function(){
		
		return this;
	}

}

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
/**
 * The menu item prototype
 */
laurbe.prototype.RestDAO = $.extend({}, laurbe.DAOManager, {
	/**
	* Rest entity paths Ma
	**/
	entityPaths: null,
	headers:null,
	/**
	* Initialization DAO Phase
	**/
	init:function(){
		$.ajaxSetup({
		    beforeSend: function (xhr)
			    {
			       //xhr.setRequestHeader("Accept","application/vvv.website+json;version=1");
			       //xhr.setRequestHeader("Authorization","Token token=\"FuHCLyY46\"");        
			    }
		});
	},

	/**
	* String type definition
	**/
	get: function(entityName, callback){
		$.ajax ({
	        type: "GET",
	        url: this.entityPaths[entityName],
	        //accept: 'application/json',
	        //async: false,
	        success: function (data) {
	        	callback(data);
	        },error:function(err){
	        	alert('something wrong!!');
	        	console.log(err);
	        	callback(err);
	        }
	    });
	    
	}

});


/**
 * Constructor definition
 * for a common Rest DaO
 */
laurbe.RestDAO = function RestDAO(args){
	
	/** Init values **/
	var defaults = {
		entityPaths: {
			person: '/persons',
		},
		headers: { 
	        Accept : "application/json; charset=utf-8",
	        contentType:"application/json; charset=utf-8"
	    }	
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.RestDAO, initializationProps);


	return instance;
}