# BackEnd_BasicAnswers

### Envío de texto plano

Para enviar una cadena de texto plano desde el backend, puedes usar el método res.send(). Esto es útil cuando deseas devolver contenido simple como un mensaje de texto.
Ejemplo:

```

app.get('/texto', (req, res) => {
    res.send('Hola mundo, ejemplo sencillo!');
});
```

Luego, puedes acceder al texto navegando a la URL: http://localhost:3000/texto.

### Envío de objeto JSON

Para enviar datos en formato JSON, se utiliza el método res.json(). El navegador mostrará el JSON de forma cruda o formateada, dependiendo del navegador.
Ejemplo:

```

app.get('/json', (req, res) => {
    res.json({ mensaje: 'Hola, mundo!' });
});
```

Al navegar a http://localhost:3000/json, verás el contenido JSON directamente en el navegador.

### Envío de archivo

Para enviar un archivo (como una imagen o documento), puedes usar res.sendFile(). Este método es útil para enviar cualquier tipo de archivo al cliente.
Ejemplo:

```

const path = require('path');

app.get('/archivo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gatito.jpg')); 
});
```

Asegúrate de incluir el módulo path para manejar las rutas de archivos correctamente. Al acceder a http://localhost:3000/archivo, el navegador mostrará o descargará el archivo.

### Envío de estado específico

Para enviar una respuesta con un código de estado específico (como un error 404), usa el método res.status() junto con res.send(). Esto permite controlar qué mensaje se muestra según el estado.
Ejemplo:

```

app.get('/error', (req, res) => {
    res.status(404).send('No encontrado');
});
```

Al visitar http://localhost:3000/error, el navegador mostrará un mensaje con el estado 404, indicando que el recurso no fue encontrado.

### Redirección a otra URL

Para redirigir a otra URL desde el servidor, puedes utilizar res.redirect(). Esto le indica al navegador que visite una nueva ruta automáticamente.
Ejemplo:

```

app.get('/redirigir', (req, res) => {
    res.redirect('/otra-ruta');
});
```
```
app.get('/otra-ruta', (req, res) => {
    res.send('Has sido redirigido.');
});
```

Al acceder a http://localhost:3000/redirigir, serás redirigido automáticamente a http://localhost:3000/otra-ruta.


### Envío de HTML

Si deseas enviar código HTML para que el navegador lo renderice, simplemente usa res.send() con una cadena que contenga el HTML.
Ejemplo:

```

app.get('/html', (req, res) => {
    res.send('<h1>Has enviado HTML!</h1>');
});
```

Al acceder a http://localhost:3000/html, el navegador renderizará el contenido HTML, en este caso, un título con el texto "Has enviado HTML!".

### Envío de Cookies

Puedes enviar cookies al cliente usando res.cookie(). Esto puede ser útil para almacenar información en el navegador del usuario, como un identificador de sesión.

Se vería algo así en el back:

```

app.get('/cookie', (req, res) => {
    res.cookie('nombre', 'usuario123').send('Cookie enviada');
});
```

Al acceder a http://localhost:3000/cookie, el navegador recibirá una cookie llamada nombre con el valor usuario123. Las cookies se pueden verificar en las herramientas de desarrollador del navegador, en la sección de "Almacenamiento" o "Cookies".

### Envío de Cabeceras Personalizadas

A veces, puedes querer enviar información adicional en las cabeceras HTTP, como información sobre el servidor o un token personalizado. Esto se hace con res.set().

Se vería algo así en el back:

```

app.get('/cabeceras', (req, res) => {
    res.set('X-Custom-Header', 'MiCabeceraPersonalizada');
    res.send('Cabecera personalizada enviada');
});
```

Acceder a http://localhost:3000/cabeceras enviará una cabecera personalizada llamada X-Custom-Header con el valor MiCabeceraPersonalizada. Esta cabecera se puede ver en la pestaña "Red" o "Network" de las herramientas de desarrollador del navegador.

### Descarga de Archivos

Si deseas que el usuario descargue un archivo en lugar de mostrarlo en el navegador, puedes usar res.download(). Esto es útil para permitir la descarga de documentos o imágenes.

Se vería algo así en el back:


```
app.get('/descargar', (req, res) => {
    res.download(path.join(__dirname, 'public', 'documento.pdf'), 'mi-archivo.pdf', (err) => {
        if (err) {
            res.status(500).send('Error al descargar el archivo');
        }
    });
});
```

Acceder a http://localhost:3000/descargar descargará un archivo llamado mi-archivo.pdf. El archivo original está en la carpeta public y se llama documento.pdf.

### Streaming de Datos

El streaming es una forma de enviar datos de manera continua al cliente. En este caso, usamos res.write() para enviar partes del contenido a intervalos.

Se vería algo así en el back:

```

app.get('/stream', (req, res) => {
    res.write('Primera parte del contenido...\n');
    setTimeout(() => {
        res.write('Segunda parte del contenido...\n');
        res.end();
    }, 2000);
});
```

Acceder a http://localhost:3000/stream mostrará la "Primera parte del contenido..." inmediatamente, y después de 2 segundos, la "Segunda parte del contenido...". Este es un ejemplo de cómo enviar datos en "stream".

### Redirección Condicionada (Autenticación Simulada)

Puedes redirigir al usuario dependiendo de si está autenticado o no. En este ejemplo, si el usuario no está autenticado, lo redirigimos a una página de login.

Se vería algo así en el back:

```

app.get('/login', (req, res) => {
    const usuarioAutenticado = false; // Simula autenticación
    if (usuarioAutenticado) {
        res.send('Bienvenido de nuevo!');
    } else {
        res.redirect('/login-form');
    }
});
```

Si accedes a http://localhost:3000/login, serás redirigido a /login-form si no estás autenticado (en este caso, usuarioAutenticado es false por defecto).

### Respuesta según el Método HTTP

Este endpoint responde de manera diferente según el método HTTP utilizado (GET o POST). Puedes comprobar si la solicitud fue hecha con un método que no es GET.

Se vería algo así en el back:

```

app.get('/metodo', (req, res) => {
    if (req.method === 'POST') {
        res.status(405).send('Método no permitido');
    } else {
        res.send('Este endpoint solo acepta GET');
    }
});
```

Acceder a http://localhost:3000/metodo te devolverá el mensaje "Este endpoint solo acepta GET". Si intentas enviar una solicitud con el método POST, recibirás un error 405.

### Respuesta Asíncrona

A veces necesitas hacer una operación asíncrona antes de responder al cliente. Esto puede ser útil cuando trabajas con bases de datos o servicios externos.

Se vería algo así en el back:

```

app.get('/async', async (req, res) => {
    try {
        const datos = await obtenerDatosExterno(); // Simula operación asíncrona
        res.json(datos);
    } catch (error) {
        res.status(500).send('Error al obtener datos');
    }
});
async function obtenerDatosExterno() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ mensaje: 'Datos obtenidos exitosamente' }), 1000);
    })
};
```
Acceder a http://localhost:3000/async devolverá un objeto JSON después de una espera simulada de 1 segundo, mostrando el mensaje Datos obtenidos exitosamente.

### Envío de Estado 405 para Métodos No Permitidos

Este endpoint está diseñado para mostrar un error 405 si el método no es permitido. En este caso, sólo acepta el método GET.

Se vería algo así en el back:

```

app.get('/metodo', (req, res) => {
    if (req.method !== 'GET') {
        res.status(405).send('Método no permitido');
    } else {
        res.send('Método correcto');
    }
});
```

Al acceder a http://localhost:3000/metodo con un método diferente a GET, el servidor responderá con un error 405, indicando que el método no está permitido.