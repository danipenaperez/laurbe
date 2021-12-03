/**
 * The menu item prototype
 */
 laurbe.prototype.ShareSocialManager = $.extend({}, laurbe.ShareSocialManager, {
    /**
     * Navigator Reference
     */
    navigatorManager:null,
	/**
	* Initialization Phase
	**/
	init:function(){
	},
    /**
     * Show all available share applications installed
     * @returns 
     */
    shareCurrentViewToAllAvailable:function(title, viewURL){
        if(navigator.canShare()){
            navigator.share({ title: title, url: viewURL});
        }else{
            console.log('Current Device not support native WebShareAPI');
        }    
    },
    /**
     * Show specified Vendor Wasap
     * @returns 
     */
     shareCurrentViewToWassap:function(viewURL){
        alert("es mobile "+laurbe.utils.isMobile());
        if(laurbe.utils.isMobile()){ //Native Mobile Device
            document.location.href = "whatsapp://send?text="+viewURL;
        }else{ //Web APP api
            document.location.href = "https://api.whatsapp.com/send?phone=1111111111&text="+viewURL;
        }
        
    }
});


/**
 * Constructor definition
 * 
 */
laurbe.ShareSocialManager = function ShareSocialManager(args){
	
	/** Init values **/
	var defaults = {
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.ShareSocialManager, initializationProps);


	return instance;
}