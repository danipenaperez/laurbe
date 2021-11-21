
var data={
	sessions:[
		{
			id: 'Andjustice1',
			title:'And Justice For All',
			text:'Full Album Cover session',
			footMessage:'Metal, Metallica',
			imgSrc:'https://www.thomann.de/pics/bdb/128185/12948444_800.jpg'
		},
		{
			id: 'Anthrax1',
			title:'Anthrax',
			text:'Anthrax embematic Songs for destruction!! ',
			footMessage:'Metal, Anthrax',
			imgSrc:'https://images.backstreetmerch.com/images/products/bands/misc/anth/bsi_anth17.jpg'
		}

	]
}
var vulgus_app = null;

function vulgus_app_init(){
	var exploreSessionsViewGridDinamic = new laurbe.ScrollableCardListView({
		menuName:'ScollableGridView',
		onShow: function(instance){

			console.log('e instance es ');
			console.log(instance);
			alert('fetching data from ./vulgus/rest/fetchedSessions.js...');
			$.getJSON("./vulgus/rest/fetchedSessions.json", function(dataLoaded, status){
				
				console.log('estoy en ScrollableView y voy a cargar de lo recibido por llamada Ajax a fetchedSessions.js');
				alert('received new '+ dataLoaded.length+ ' music sessions');
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
												vulgus_app._showView(vulgus_app.views[5]);
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
				
			});

		},
		items:[]
		
	});
	

var exploreSessionsView = new laurbe.View({
				menuName:'Explore',
				items:[
					new laurbe.Container({
						childsWrapperStyle:'text-align:center',
						items:[
							new laurbe.ButtonGroup({
								items:[
									new laurbe.Button({
										text:'Zone',
										onclick:function(_self){
											console.log(this);
											alert('filtering by Zone');
											var dialog = new laurbe.ModalDialog({
															message:'hola caracola'
														});
											console.log('y soy');
											console.log(dialog);
											dialog._render();
											dialog.show();
										}
									}),
									new laurbe.Button({
										text:'Open Sessions',
										onclick:function(_self){
											alert('filtering by Sessions');
										}
									}),
									new laurbe.Button({
										text:'Date',
										onclick:function(_self){
											alert('filtering by Date');
										}
									}),
									new laurbe.Button({
										text:'Genre',
										onclick:function(_self){
											alert('filtering by Genre');
										}
									})
								]
							})
						]
					}),
					new laurbe.Container({
							items:[
								new laurbe.CardGroup({
											items: [
												new laurbe.Card({
													title:'And Justice For All',
													text:'Full Album Cover session',
													footMessage:'Metal, Metallica',
													img:{
														src: 'https://www.thomann.de/pics/bdb/128185/12948444_800.jpg',
														alt: 'Metallic Aftenoon'
													}
												}),
												new laurbe.Card({
													title:'Anthrax',
													text:'Anthrax embematic Songs for destruction!! ',
													footMessage:'Metal, Anthrax',
													img:{
														src: 'https://images.backstreetmerch.com/images/products/bands/misc/anth/bsi_anth17.jpg',
														alt: 'Anthrax tribute'
													}
												}),
												new laurbe.Card({
													title:'Anthrax',
													text:'Anthrax embematic Songs for destruction!! ',
													footMessage:'Metal, Anthrax',
													img:{
														src: 'https://images.backstreetmerch.com/images/products/bands/misc/anth/bsi_anth17.jpg',
														alt: 'Anthrax tribute'
													}
												}),
												new laurbe.Card({
													title:'Anthrax',
													text:'Anthrax embematic Songs for destruction!! ',
													footMessage:'Metal, Anthrax',
													img:{
														src: 'https://images.backstreetmerch.com/images/products/bands/misc/anth/bsi_anth17.jpg',
														alt: 'Anthrax tribute'
													}
												})
											]
								})
							]

					}),
					new laurbe.Container({
							items:[
								new laurbe.CardGroup({
											items: [
												new laurbe.Card({
													title:'Anthrax',
													text:'Anthrax embematic Songs for destruction!! ',
													footMessage:'Metal, Anthrax',
													img:{
														src: 'https://images.backstreetmerch.com/images/products/bands/misc/anth/bsi_anth17.jpg',
														alt: 'Anthrax tribute'
													}
												}),
												new laurbe.Card({
													title:'Blues Night',
													text:'Some blues  ',
													footMessage:'Blues at Madrid',
													img:{
														src: 'http://xiringuitomarino.com/wp-content/uploads/2017/06/blu.jpg',
														alt: 'Blues Jam Session'
													}
												})
											]
								})
							]

					}),
					new laurbe.Container({
							items:[
								new laurbe.CardGroup({
											items: [
												new laurbe.Card({
													title:'Blues Night',
													text:'Some blues  ',
													footMessage:'Blues at Madrid',
													img:{
														src: 'http://xiringuitomarino.com/wp-content/uploads/2017/06/blu.jpg',
														alt: 'Blues Jam Session'
													}
												})
											]
								})
							]

					}),
					new laurbe.Container({
							items:[
								new laurbe.CardGroup({
											items: [
												new laurbe.Card({
													title:'And Justice For All',
													text:'Full Album Cover session',
													footMessage:'Metal, Metallica',
													img:{
														src: 'https://www.thomann.de/pics/bdb/128185/12948444_800.jpg',
														alt: 'Metallic Aftenoon'
													}
												}),
												new laurbe.Card({
													title:'Blues Night',
													text:'Some blues  ',
													footMessage:'Blues at Madrid',
													img:{
														src: 'http://xiringuitomarino.com/wp-content/uploads/2017/06/blu.jpg',
														alt: 'Blues Jam Session'
													}
												})
											]
								})
							]

					})
				]
});

var mySessionsView = new laurbe.View({
				menuName:'MySessions',
				items:[
					new laurbe.Container({
							items:[
								new laurbe.CardGroup({
											items: [
												new laurbe.Card({
													title:'And Justice For All',
													text:'Full Album Cover session',
													footMessage:'Metal, Metallica',
													img:{
														src: 'https://www.thomann.de/pics/bdb/128185/12948444_800.jpg',
														alt: 'Metallic Aftenoon'
													}
												})
											]
								})
							]

					}),
					new laurbe.Container({
							items:[
								new laurbe.CardGroup({
											items: [
												new laurbe.Card({
													title:'And Justice For All',
													text:'Full Album Cover session',
													footMessage:'Metal, Metallica',
													img:{
														src: 'https://www.thomann.de/pics/bdb/128185/12948444_800.jpg',
														alt: 'Metallic Aftenoon'
													}
												})
											]
								})
							]

					}),
					new laurbe.Container({
							items:[
								new laurbe.CardGroup({
											items: [
												new laurbe.Card({
													title:'And Justice For All',
													text:'Full Album Cover session',
													footMessage:'Metal, Metallica',
													img:{
														src: 'https://www.thomann.de/pics/bdb/128185/12948444_800.jpg',
														alt: 'Metallic Aftenoon'
													}
												})
											]
								})
							]

					})
				]
});
var detailedSession = new laurbe.View({
				menuName:'Detailed Session',
				id: 'DetailedSessionView',
				items:[
					new laurbe.Container({
							items:[
								new laurbe.CardGroup({
											items: [
												new laurbe.Card({
													title:'And Justice For All',
													text:'Full Album Cover session',
													footMessage:'Metal, Metallica',
													img:{
														src: 'https://www.thomann.de/pics/bdb/128185/12948444_800.jpg',
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
											]
								})
								







							]

					}),
					new laurbe.Container({
							items:[
								
							]

					})
				]
});
var myProfileView = new laurbe.View({
					menuName:'Account',
					items:[
							new laurbe.Layout({
											items: [
												new laurbe.Region({
													text:'',
													items:[
														new laurbe.Form({
															items:[
																new laurbe.Image({
																	img_src: 'https://yt3.ggpht.com/-tO_SdVYSVg8/AAAAAAAAAAI/AAAAAAAAAAA/t089mcHnzD0/s100-mo-c-c0xffffffff-rj-k-no/photo.jpg',
																	alt:'Daniel Peña Perez',
																	onclick: function(){
																		alert('Yeah, Rock Now!');
																	}
																}),
																new laurbe.TextField({
																	label:'Name',
																	value:'Daniel Peña Perez (el "serpiente")'
																}),
																new laurbe.TextField({
																	label:'edad',
																	value:'40'
																}),
																new laurbe.TextField({
																	label:'Score',
																	value:'4/5'
																}),
																new laurbe.TextField({
																	label:'Plays',
																	value:'Guitar, Bass'
																}),
																new laurbe.TextField({
																	label:'Zones',
																	value:'Madrid , Spain'
																})

															]
														})
														
													]
												})
											]
										})
					]
				});				

		var dynamicView = new laurbe.View({
					id:'dynamicView',
					menuName:'dynamicView',
					onShow:function(instance){
						laurbe.logger.log('--------on show especifico de la instancia--------');
					},
					items:[
						new laurbe.Layout({
							items: [
								new laurbe.Region({
									text:'',
									items:[
										new laurbe.Form({
											id:'dynamicView_UserForm',
											items:[
												new laurbe.Button({
													text:'Load Form Data',
													onclick:function(_self){
														alert('Loading Form Data');
														loadUserFormData();
													}
												})

											]
										})
										
									]
								})
							]
						})
					]
				});		


vulgus_app = new laurbe.App({
	title:'Music Arena',
	navBar:{
		brand:{
			logoUrl:'https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-outline.svg'
		},
		searchTool:{
			placeholder:'que estas buscando..?'
		}
	},
	views:[	exploreSessionsViewGridDinamic,
			exploreSessionsView, 
			mySessionsView,
			//detailedSession,
			detailedView,
			myProfileView,
			dynamicView ]
});
vulgus_app.init();
console.log('cargado desde js');
}


function loadUserFormData(){

	$.get("./vulgus/rest/fetchedSessions.js", function(data, status){
		alert("Data: " + data + "\nStatus: " + status);
		console.log(data);
		var dataLoaded = JSON.parse(data);
		alert(dataLoaded[0]);
		console.log(dataLoaded);
	});



	laurbe.Directory['dynamicView_UserForm']._appendChilds([
		new laurbe.Image({
			img_src: 'https://yt3.ggpht.com/-tO_SdVYSVg8/AAAAAAAAAAI/AAAAAAAAAAA/t089mcHnzD0/s100-mo-c-c0xffffffff-rj-k-no/photo.jpg',
			alt:'Daniel Peña Perez',
			onclick: function(){
				alert('Yeah, Rock Now!');
			}
		}),
		new laurbe.TextField({
			label:'Name',
			value:'Daniel Peña Perez (el "serpiente")'
		}),
		new laurbe.TextField({
			label:'edad',
			value:'40'
		}),
		new laurbe.TextField({
			label:'Score',
			value:'4/5'
		}),
		new laurbe.TextField({
			label:'Plays',
			value:'Guitar, Bass'
		}),
		new laurbe.TextField({
			label:'Zones',
			value:'Madrid , Spain'
		})
		], true);
}