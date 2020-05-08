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