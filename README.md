# cov

General

* Esta aplicación esta contenerizada en Docker version 1.13.1
* Programada en Python 3.8.2
* Base de datos MySQL Ver 8.0.20

* Se utilizaron dos contenedores dockers para el desarrollo de esta aplicacion,
ambos se comunican entre si.

    1. docker ubuntu para montar la aplicacion dentro de el.
    2. Docker mysql para tener la base de datos.

Librerías/Frameworks (instaladas a través de pip3 de python)

* BeautifulSoup4
* lxml
* html5lib
* requests
* mysqlclient
* peewe
* Flask
* json (libreria estandar)
* datetime (librerias estandar)

Librerías/Frameworks (invocadas desde el archivo index.html)

* Bootstrap (versión 4.4.1)
* Jquery (versión 3.3.1)
* Jquery UI (versión 1.12.1)

Archivos python

* database_struct
    * Este Archivo contiene el modelo de clases de la base de datos, contiene
    instrucciones para crear la base de datos, y crear sus tablas, es importante
    ingresar los datos correctos en las variables de conexion y descomentar las
    lineas que el mismo script señala para crear la base de datos. Este archivo
    solo se debe ejecutar en caso de querer crear la base de datos y al final
    comentar las lineas que el mismo script señala.

    Si se requiere insertar un nuevo county o ciudad, se debe crear el modelo de
    clases de este nuevo dato y ejecutar el script para la creacion de las tablas

* scrape_LA y scrape_orange
    * Estos dos archivos son los encargados de realizar el web scrape de las
    páginas http://publichealth.lacounty.gov/media/coronavirus/locations.htm y
    https://occovid19.ochealthinfo.com/coronavirus-in-oc correspondientes a los 
    condados de Los Angeles y Orange respectivamente.

    Asi mismo, despues de la extracción de datos, realiza la inserción a la base
    de datos. Es importante mencionar que la base de datos ya debe de existir y
    tener los registros de ciudades y vecindarios. Si no es el caso, estos 
    archivos contienen las funciones que realizan esas operaciones, basta con
    descomentar las lineas que el mismo script señala, y después de sus ejecucio-
    nes volverlas a comentar.

    Es importante mencionar que ambos scripts contemplan una estructura del
    codigo HTML del cual se hace la extracción de datos. Si este código llega
    a cambiar el funcionamiento de los scripts se verá afectado.

* get_data.py
    * Este script es el encargado de obtener los datos con base a las peticio-
    nes del frontend. En pocas palabras realiza búsquedas dentro de la base de
    datos y regresa los resultados de dichas búsquedas.

* get_initial_data.py
    * Este script se encarga de responder al evento de javascript cuando carga
    la pagina por primera vez. Hace una consulta a la base de datos, extrayendo
    todos los datos y los manda al frontend.

* insert_latitude_longitude
    * Este script es opcional y solo funciona con una ejecución individual, si
    se registran nuevos vecindarios en la base de datos y se tienen sus latitu-
    des y longitudes, este archivo realiza la tarea de insertar dichos datos en
    la base. Cabe mencionar que las ciudades/vecindarios deben de existir en la
    base de datos.

    Los datos los lee de un archivo el cual se debe de especificar en la varia-
    ble name, y la nomeclatura del aricho debe ser nombre ciudad/vecindario,
    latitud, longitud Como se observa, los datos deben de estar separados por
    coma. El archivo debe de estar en el mismo path que este script.

* covid-19.py
    * Este es el script principal que ejecuta a a scrape_LA y scrape_orange
    este script está contenido en un crontab para su ejecucion automática.

Archivos html

* index.html
    * Este archivo es el encargado de cargar la interfaz de la aplicación dentro
    del navegador web para que el usuario interactúe con ella.
    Además se encarga de llamar a los scripts que serán los encargados de 
    realizar peticiones al servidor, para posteriormente visualizar los datos
    en la interfaz.
    
Archivos css

* style.css
    * Este archivo se encarga de dar un estilo a los elementos que viven en el
    html de la página.

Archivos JavaScript

* date.js
    * Este archivo es el encargado de obtener la fecha del día de hoy, para
    mostrarla dentro del input dónde el usuario podrá seleccionar diferentes 
    fechas para las consultas.

* getInformation.js
    * Este archivo es el encargado de realizar una petición al servidor para 
    poder mostrar la información asociada a cada ciudad en función a dónde 
    el usuario realice un click dentro del mapa. Una vez que se obtenga la
    información, se lanzará una ventana emergente que contendrá una tabla
    con la información devuelta.

* getInitialData.js
    * Este archivo es el encargado de realizar una petición al servidor para 
    poder obtener la información asociada a todas las ciudades que viven en la
    base de datos. Posteriormente estará llamando a paintPoints.js, 
    paintMessage.js y paintTable.js

* initMap.js
    * Este archivo es el encargado de dibujar el mapa dentro del documento
    html. Dentro de este archivo se encuentra un escuchador de evento el cual 
    se activará cuando el usuario de click dentro del poligono dibujado en el 
    mapa, a su vez se estarán obteniendo las coordenadas de latitud y longitud
    para dicho punto que se haya seleccionado. Por último este archivo manda 
    llamar al archivo getInformation.js

* paintMessage.js
    * Es el archivo encargado de obtener el día y la fecha de hoy para poder
    enciarle esa información al archivo paintTable.js.

* paintPoints.js
    * Este archivo es el encargado de dibujar los marcadores asociados a cada
    ciudad, esto en función al número de casos que se registran dentro de 
    cada ciudad.

* paintTable.js
    * Este archivo es el encargado de añadir una tabla con la información
    asociada a cada condado que se tiene registrado en la base de datos.
