var exploreSessionsViewGridDinamic = new laurbe.ScrollableCardListView({
    menuName:'Explore',
    items:[],
    pageNumber:0,
    onShow: function(instance){
        //alert('ahi voy');
        fetchSessions(instance);
    },
    
    onInfiniteScroll:function(instance){
		//alert('thats me on infinite scroll');
        fetchSessions(instance);
	}
    
});

function fetchSessions(instance){

    console.log('e instance es ');
    console.log(instance);
   // alert('fetching data from ./vulgus/rest/fetchedSessions.js...');
    $.getJSON("./vulgus/rest/fetchedSessions.json", function(dataLoaded, status){
        
        console.log('estoy en ScrollableView y voy a cargar de lo recibido por llamada Ajax a fetchedSessions.js');
        //alert('received new '+ dataLoaded.length+ ' music sessions');
        //Es necesario acceder al grid principal
        var instanceGridContainer = instance.instanceProperties.items[0];
        //Parte un array en pares de 2 y si es impar siempre queda un elemento suelto
        laurbe.utils.pairDataArraywise(dataLoaded,2, function(obj1,obj2){
            var _items =[];
            if(obj1){
                _items.push(
                    new laurbe.Column({
                        items:[
                            new laurbe.Card({
                                    title:obj1.title,
                                    text:obj1.description,
                                    footMessage:'Metal,'+obj1.tags[1],
                                    img:{
                                        src: obj1.img,
                                        alt: 'Metallic Aftenoon'
                                    },
                                    onclick: function(){
                                        alert('soy '+obj1.title);
                                        vulgus_app._showView(vulgus_app.views[3]);
                                    }
                                })
                        ]
                    })
                );
            }
            if(obj2){
                _items.push(
                    new laurbe.Column({
                        items:[
                            new laurbe.Card({
                                    title:obj2.title,
                                    text:obj2.description,
                                    footMessage:'Metal,'+obj2.tags[1],
                                    img:{
                                        src: obj2.img,
                                        alt: 'Metallic Aftenoon'
                                    },
                                    onclick: function(){
                                        alert('soy '+obj2.title);
                                    }
                                })
                        ]
                    })
                );
            }
            instanceGridContainer._appendChilds([new laurbe.Row({
                items:_items
            })],true);
            
        });
        instance.instanceProperties.pageNumber++;
       $('#page_number').html('['+instance.instanceProperties.pageNumber+']');
    });

}