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