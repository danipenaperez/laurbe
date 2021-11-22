var detailedView = new laurbe.ScrollableCardListView({
    menuName:'DetailSession',
    id: 'DetailedSessionView',
    items:[
        new laurbe.Container({
                items:[
                    new laurbe.CardGroup({
                        id:'detailedSessionMainCardGroup',
                        items:[],
                        onShow:function(instance){
                            console.log('e instance es ');
                            console.log(instance);
                            alert('fetching data from ./vulgus/rest/sessions_andjustice.js...');
                            $.getJSON("./vulgus/rest/sessions_andjustice.json", function(data, status){
                                let to_append_items=[
                                    new laurbe.Card({
                                        title:data.title,
                                        text:data.description,
                                        footMessage:'Metal, Metallica',
                                        img:{
                                            src: data.img,
                                            alt: 'Metallic Aftenoon'
                                        },
                                        items:[
                                            new laurbe.CommentsGroup({
                                                        title:'Set List',
                                                        id:'detailedSessionSetList',
                                                        items:[
                                                            new laurbe.Comment({
                                                                title:'Manolo',
                                                                items:[
                                                                        new laurbe.SpotifyAudio({
                                                                            src: 'https://open.spotify.com/embed/track/32OlwWuMpZ6b0aN2RZOeMS'
                                                                        }),
                                                                        new laurbe.SpotifyAudio({
                                                                            src: 'https://open.spotify.com/embed/track/69kOkLUCkxIZYexIgSG8rq'
                                                                        }),
                                                                        new laurbe.SpotifyAudio({
                                                                            src: 'https://open.spotify.com/embed/track/1BECwm5qkaBwlbfo4kpYx8'
                                                                        }),
                                                                        new laurbe.SpotifyAudio({
                                                                            src: 'https://open.spotify.com/embed/track/78XG7U0UueeC86XpzF9O7f'
                                                                        })
                                                                        
                                                                ]
                                                            })
                                                        ]
                                            }),
                                            new laurbe.Button({
                                                                            text:'boton 11!!',
                                                                            span:{
                                                                                text:'4'
                                                                            },
                                                                            onclick:function(){
                                                                                
                                                                                var setListWrapper = laurbe.Directory['detailedSessionSetList'];
                                                                                
                                                                                setListWrapper._appendChilds([
                                                                                        new laurbe.SpotifyAudio({
                                                                                                id:'newSong',
                                                                                                src: 'https://open.spotify.com/embed/track/78XG7U0UueeC86XpzF9O7f'
                                                                                            })	
                                                                                    ], true);

                                                                                laurbe.utils.focusAndScrollToElement('newSong');

                                                                            }
                                                                        }),
                                            new laurbe.CommentsGroup({
                                                        title:'Session Comments',
                                                        items:[
                                                            new laurbe.Comment({
                                                                title:'Manolo',
                                                                img:{
                                                                    src:'./images/icons/guitar/favicon.png'
                                                                },
                                                                items:[
                                                                        new laurbe.YouTubeVideo({
                                                                            src: 'https://www.youtube.com/embed/fA4IHJnKYiw'
                                                                        })
                                                                ]
                                                            }),
                                                            new laurbe.Comment({
                                                                title:'Daniel',
                                                                img:{
                                                                    src:'https://yt3.ggpht.com/-tO_SdVYSVg8/AAAAAAAAAAI/AAAAAAAAAAA/t089mcHnzD0/s100-mo-c-c0xffffffff-rj-k-no/photo.jpg'
                                                                },
                                                                text:'Tu opinion me importa una mierda, erres mas feo que yo, maldito imbecil'
                                                            }),
                                                            new laurbe.Comment({
                                                                title:'Manolo',
                                                                img:{
                                                                    src:'./images/icons/guitar/favicon.png'
                                                                },
                                                                text:'Bueno, a mi no me pareces tan feo, pero si que es verdad que te podrias lavar un poco mas, aunque sea en fin de semana.',
                                                                items:[
                                                                        new laurbe.Video({
                                                                                src: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'
                                                                        })
                                                                ]
                                                            }),
                                                            new laurbe.Comment({
                                                                title:'Daniel',
                                                                img:{
                                                                    src:'https://yt3.ggpht.com/-tO_SdVYSVg8/AAAAAAAAAAI/AAAAAAAAAAA/t089mcHnzD0/s100-mo-c-c0xffffffff-rj-k-no/photo.jpg'
                                                                },
                                                                text:'Ok, te aviso cuando cambie de opinion'
                                                            })
                                                        ]
                                                })

                                        ]
                                    })
                                ];



                                var mainCardGroup2 = laurbe.Directory['detailedSessionMainCardGroup'];

                                mainCardGroup2._appendChilds([new laurbe.Row({
                                    items:to_append_items
                                })],true);
                                
                            });
    










                        }
                    })
                ]
            })
    ],
    onShow: function(instance){

    }                        
    
});