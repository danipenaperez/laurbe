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
			},
			focusAndScrollToElement:function(elementId){
				var el = document.getElementById(elementId);
    			el.scrollIntoView(true);
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
