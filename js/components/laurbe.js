/**
 * Main object namespace
 */
var laurbe ={
		/**
		 * Base view element 
		 */
		BaseViewElement:{
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
				this.id = this.instanceProperties.id || laurbe.utils.getIdFor('navBar');
				this.fatherElement = $('#'+this.instanceProperties.renderTo);
				this.ele = $('<div/>', { 
													 'id':this.id,
													 'html':'<span> soy el '+this.id+'</span>'
										 			}
										 );
				this.ele.appendTo(this.fatherElement);
				
			},
			/**
			* Template management
			**/
			template: null,

			
			render: function(){
				if(this.template){
					alert('renderizando');
					var templateInfo = {appendTo: this.ele, data: this.instanceProperties};
					//always load to templateManager div container
					$('#templateManager').load(this.template.url, function(templateString,  ajaxObject, ajaxState){
						//this == $('#templateManager') lost main scope execution :-(
						$('#navbarWrapperTemplate').tmpl(templateInfo.data).appendTo(templateInfo.appendTo);
					});
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
		prototype:{},
		
		
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
			getIdFor:function(){
				this.id++;
				return this.id;
			}
		},

		/**
		* Init framework
		**/
		init:function(){
			//create div to load template Manager
			this.templateManager.init();
		},
		/**
		* Template Manager
		*  
		* https://stackoverflow.com/questions/327047/what-is-the-most-efficient-way-to-create-html-elements-using-jquery
		*
		**/
		templateManager:{

			init: function(){
				$('<div/>', { 'id':'templateManager'}).appendTo('body');
			}	
		}
		

};

laurbe.init();