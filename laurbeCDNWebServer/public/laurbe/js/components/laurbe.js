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
			enabled:true,
			log:function(obj){
				if(this.enabled){
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
			_getName: function(){
				return this.id;
			},
			/**
			* RenderTo Element Jquery reference
			**/
			fatherElement: null,
			/**
			* initialize the wrapper
			**/
			_init: function(){
				this.id = this.instanceProperties.id;
				laurbe.Directory[this.id] = this;
				this.fatherElement = $('#'+this.instanceProperties.renderTo);
				
				if(this.instanceProperties.wrapper && this.instanceProperties.wrapper.tag){
					this.ele = $(this.instanceProperties.wrapper.tag, { 
											 'id':this.id+'Wrapper',
											 'click': this.onclickHandler,
											 'class': this.instanceProperties.wrapper.class
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

			
			_render: function(){
				if(!this.initialized){
			  		this._init();
			  	}
				if(this.template){
					var self = this;
					var templateInfo = {appendTo: self.ele, data: self.instanceProperties};
					//always load to templateManager div container
					$('#templateManager').load(laurbe.templateManager.templatePath+self.template.url, function(templateString,  ajaxObject, ajaxState){
						$('#'+self.template.scriptId).tmpl(templateInfo.data).appendTo(templateInfo.appendTo);
						self._afterRender();
						if(self.onShow){
							self.onShow(this);
						}
					});
				}
				
				// else{
				// 	console.log('no tiene on show '+ this.id);
				// }
			},
			/**
			* Rebuild/reinitalize the entire element, and render
			**/
			_renderTo:function(wrapperId){
				this.instanceProperties.renderTo=wrapperId;
				this.initialized=false;
				this._render();
			},
			//reload the view component
			refresh:function(){
				console.log('laurbe.refresh()');
				this.destroy();
				this._render();
				// console.log('refreshcated');
			},
			/**
			* After render callback
			**/
			_afterRender:function(){
				if(!this.instanceProperties.wrapper){ //usefull when this.instanceProperties.wrapper is undefined
					$('#'+this.id).on('click', this.onclickHandler);
				}
				
				var self = this;
				//self.bindEvents();
				if(self.instanceProperties.items){
					$.each(self.instanceProperties.items, function( index, item ) {
						item.owner = self;//reference to parent laurbe object
					  	item._renderTo(self._getRenderChildWrapperId());
					});
				}

			},
			/**
			* If exists this.items (child laurbe Objects) will renderIt
			**/
			_appendChilds:function(items, renderNow){
				var self = this;
				$.each(items, function( index, item ) {
					console.log('_appendChilds '+ self._getRenderChildWrapperId());
					self.instanceProperties.items.push(item);
					item.owner = self;//reference to parent laurbe object
				  	item.instanceProperties.renderTo = self._getRenderChildWrapperId();
				  	if(renderNow == true){
					  	item._render();
					}
				});
			
			},

			/**
			* Where to render child elements
			**/
			_getRenderChildWrapperId:function(){
				console.log('this component not allows child objects');
			},
			/**
			* Remove all childs
			*/
			removeAllChilds:function(){
				console.log('laurbe.removeAllChilds()');
				$('#'+this._getRenderChildWrapperId()).empty();//jquery visual destroy
				this.items = []; //reinitialize items as empty array
				// console.log('all childs have been removed');
			},
			/**
			* destroy the element
			**/
			destroy:function(){
				console.log('laurbe.destroy()')
				var self = this;
				$.each(this.items, function( index, item ) {
					destroy();
				});
				this.fatherElement.empty();//jquery visual destroy
				// console.log('internal destroy END');
			},
			/**
			* default onclick framework handlers
			**/
			onclickHandler: function(ev){
				if(true){
					console.log('laurbe.OnclickHandler()')
					// console.log('el evento es');
					// console.log(ev);
					// console.log(' y el elemento es');
					// console.log(this);
					// console.log('y el laurbe element es ');
					// console.log(laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')]);
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
			BaseView:{},
			composite:{}
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
			},
			pairDataArraywise(arr,groupSize , func ){
				groupSize = groupSize || 1;
				for(let i=0; i < arr.length; i=i+2){
					func(arr[i], arr[i + 1])
				}
			}
		},

		/**
		* Init framework
		**/
		_init:function(){
			//create div to load template Manager
			this.templateManager._init();
			this.modalDialogManager._init();//create div to load modalDialog Manager
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
			_init: function(){
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
			_init: function(){
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

laurbe._init();


/*****************************
 * PASAR A OTROS ARCHIVOS
 ****************************/

/**
 *  Base de todas las vistas compuestas
 */
 laurbe.CompositeViewElement = {
		/**
		* String type definition
		**/
		type: 'laurbeBaseViewElement',
 }