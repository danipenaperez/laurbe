descargar y luego 
npm install

ejecutar el minify con 

> cd laurbeCDNWebServer
> grunt

Esto genera los ficheros de distribucion en 
/dist/combined.js (que tiene los ficheros concatenados)
/dist/combined.min.js que es el combined minified

Una pagina que usa el minified es http://localhost:3000/laurbe/testMinify.html#

PAra arrancar
> cd laurbeCDNWebServer
> npm start


/**
 QUE QUEDA


COMPONENTES:
=================
CARD:
Card, he hecho un images card icon, que son iconos en el top rigth, hay que hacerlo como contenedor, ya le he dejado un id
al div para que se puedan incrustar iconos si vienen en la definicion del componente. (La version actual queda rara)
Hacer 2 componeneste de card, un con iconos en la imagen y otro con los iconos fuera y probar las 2 views

Hacer que el footer de las card sea un child_items y que se puedan añadir cosas (como iconos, de avisame o me gusta o etc..  y demas)

El compartir solo deberia salir en el detalle de la sesion. (queda feo en el otro lado y nadie va a compartir sin haber visto el detalle, no tiene sentido)

IMAGE WITH ICONS:
Molaria hacer un componente imageWithIcons, que es un div con una imagen y un div dentro donde poner iconos sociales o lo que sea.
Hay varios tipos de card, porque si mueves la image del card dentro del card-body debajo del titulo
queda mas bonito. Incluso quitando la imagen queda muy bonito tambien.

TOP MENU:
-Hacer que el logo "desaparezca" en modo fade cuando se de hacia arriba



UPLOAD: 
Por ejemplo para añadir una imagen de perfil o una imagen para la sesion se necesita un upload de ficheros (https://syntaxxx.com/accessing-user-device-photos-with-the-html5-camera-api/)

BOTON INSTALL:
Lo he perdido, antes funcionaba

MINIFY:
Volver a generar el minify y probarlo

CSS:
Sacar cada style de componente a un css distinto

ServiceWorker:
Enviar una notificacion push (https://medium.com/@a7ul/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679)
Guardar info en el storage o donde sea (por ejemplo comprobar si estamos logados)

DAO:
HAcer los daos mas comunes. 

SEGURIDAD:
Hay unas pantallas definidas para 403, 404 y no se que mas. Quizas estaria bien usarlas capturando eventos
de aplicacion (por ejemlpo no autenticado o 404 o lo que sea).

INDEXEDDB:
Mirar el tutorial https://es.javascript.info/indexeddb

RENDER:
Hacer que el render de sesisones, no sea completo y que solo se añadan los nuevos e intentar mover el 
scroll al ultimo elemento visitado (crear el laurbe.ScrollableLastFocusElement)

BACKBUTTON:
Controlar el back button del device https://stackoverflow.com/questions/25806608/how-to-detect-browser-back-button-event-cross-browser

DESTROY VS HIDE VIEW:
Las vistas tardan mucho en cargar y es porque se destruye el dom.
El metodo destroy esta fenomenal, pero quizas hay que analizar si sale mejor hacer hiden


FUNCIONALIDADES:
====================
Hacer otra aplicacion en paralelo, como por ejemplo la de amistosos de deportes.

Crear Usuario:
A modo wizard.
"Bienvenido, 1.¿Cambiamos tu avatar?, 2.Tenemos esta foto, ¿quieres poner otra?, 3¿que instrumentos tocas y como crees que los tocas?"

Crear Session:
Desde el bottonNavBar hay un boton + y ese te levanta un formulario donde das de alta la sesion.
Hacerlo a modo wizard, eso es seguro
1."Describe que vais a tocar", 2."Que instrumentos/gente necesitas", 3"Que temazos vais a tocar, tienes enlaces?",  4 "pongamos un titulo molon y una imagen chula", 4.Cuando tengas fecha y os pongais deacuerdo, busca local en nuestra lista o apañaros a vuestro modo edita tu sesion, tu eres el sheriff."  "A la gente siempre le mola recordarse, si subes un video mola aun mas (addMedia)" 


Detailed Session:
Boton "Join the session", en el detalle:
Mostrar los iconos de los que ya estan apuntados
Hacer un dialog, para que se pueda meter comentarios en el detalle de la session

Login:
¿Quitamos lo de usuario y contraseña y que sea solo login social? .... (quizas no, pero el usuario debe ser un mail por cojones);



API 
============
-Instrumentos /integrantes, un endpoint que devuelva integrantes disponibles (bateria guitarra1, guitarra 2, teclado, etc..) y el icono 
-API Persona detalle, cuidao... que es noSQL
-Buscar radio query para DynamoDB
-Busqueda filtrada


Añadir que se esta usando esto Licencia de iconos
<div>Icons made by <a href="https://www.flaticon.com/authors/imaginationlol" title="imaginationlol">imaginationlol</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>


MONETIZACION
===============
Primero con publicidad
Luego los locales pagan por apuntarse
Incitamos a gente que monte negocios de compartir o acondicionar su garaje
La gente paga por tocar contigo. Empezar con grupos, un grupo hace una sesion "tocar 3 canciones con ellos" 100 euros por ejemplo.
Seguro que hay grupos que quieren, o por ejemplo cantanes solistas, tocar con ellos sus grandes exitos.

Lo mismo para el Amistosos, hacer que estrellas venidas a menos (locales), participen en un partido determinado.
Todos los que juegan pagan 15 euros cada uno (como si fuera una entrada a un evento) y el invitado se lleva dinero.
Lo mismo para equipos con categoria auqneu no sean conocidos, si te quieres medir a ellos pagas.



===============
HECHO
==============
Componentes
-----------
NAVIGATOR:
Hacer que cuando se cambie de menu, se añada #nombreVista?parametro1=val1&param2=val2 a la url
de forma que en el onload de la view, se pueda saber con que parametros se ha llamado a esa vista

BOTTOM MENU:
Hacer que el footer general sea un child_items y se puedan añadir botones. EL primer boton el de + para crear una session.
Dividir la barra en los elementos que se vayan a tener. ahora estan en el centro apelotonados

TOP MENU:
-EL logon del musicArena, hay que hacer algo o imagen o cambiar la tipografia. Los css no son recomendables, mejor meter un backfround repeat.
-Los menus no se estan quedando como Active si se navega a traves de "Navigator"

Funcionalidad
--------------
Navegacion Dummy:
Hacer mas archivos js con la info del detalle de la session y que se pinte la que toque para que de sensacion mas real, ya que siempre vmaos al andjustice