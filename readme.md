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