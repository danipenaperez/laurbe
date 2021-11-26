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


/// QUE QUEDA







COMPONENTES:
=================
CARD:
Card, he hecho un images card icon, que son iconos en el top rigth, hay que hacerlo como contenedor, ya le he dejado un id
al div para que se puedan incrustar iconos si vienen en la definicion del componente. (La version actual queda rara)
Hacer 2 componeneste de card, un con iconos en la imagen y otro con los iconos fuera y probar las 2 views

Hacer que el footer de las card sea un child_items y que se puedan añadir cosas (como iconos, de avisame o me gusta o etc..  y demas)

Molaria hacer un componente imageWithIcons, que es un div con una imagen y un div dentro donde poner iconos sociales o lo que sea.
Hay varios tipos de card, porque si mueves la image del card dentro del card-body debajo del titulo
queda mas bonito. Incluso quitando la imagen queda muy bonito tambien.

TOP MENU:
EL logon del musicArena, hay que hacer algo o imagen o cambiar la tipografia

BOTTOM MENU:
Hacer que el footer general sea un child_items y se puedan añadir botones. EL primer boton el de + para crear una session

UPLOAD:
Por ejemplo para añadir una imagen de perfil o una imagen para la sesion se necesita un upload de ficheros

MINIFY:
Volver a generar el minify y probarlo

CSS:
Sacar cada style de componente a un css distinto


FUNCIONALIDADES:
====================
Navegacion Dummy:
Hacer mas archivos js con la info del detalle de la session y que se pinte la que toque para que de sensacion mas real, ya que siempre vmaos al andjustice

Crear Usuario:
A modo wizard.
"Bienvenido, 1.¿Cambiamos tu avatar?, 2.Tenemos esta foto, ¿quieres poner otra?, 3¿que instrumentos tocas y como crees que los tocas?"

Crear Session:
Desde el bottonNavBar hay un boton + y ese te levanta un formulario donde das de alta la sesion.
Hacerlo a modo wizard, eso es seguro
1."Describe que vais a tocar", 2."Que instrumentos/gente necesitas", 3"Que temazos vais a tocar, tienes enlaces?",  4 "pongamos un titulo molon y una imagen chula", 4.Cuando tengas fecha y os pongais deacuerdo, busca local en nuestra lista o apañaros a vuestro modo edita tu sesion, tu eres el sheriff."  "A la gente siempre le mola recordarse, si subes un video mola aun mas (addMedia)" 


Detailed Session:
Boton Join the session, en el detalle:
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