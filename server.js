const express = require('express');
const app = express();
const path = require("path");

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Envío de texto plano
app.get('/texto', (req, res) => {
    res.send('Hola mundo en texto plano');
});

// Envío de objeto JSON
app.get('/json', (req, res) => {
    res.json({ mensaje: 'Hola, mundo dentro de un JSON' });
});

// Envío de archivo
app.get('/archivo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'lovers.jpeg')); 
});

// Envío de error con estado 404
app.get('/error', (req, res) => {
    res.status(404).send('Hola mundo no encontrado');
});

// Redirección a otra ruta
app.get('/redirigir', (req, res) => {
    res.redirect('/otra-ruta');
});

app.get('/otra-ruta', (req, res) => {
    res.send('Hola mundo troll');
});

// Envío de HTML
app.get('/html', (req, res) => {
    res.send('<h1>Has enviado HTML!</h1>');
});

// Envío de cookies
app.get('/cookie', (req, res) => {
    res.cookie('nombre', 'Camacho').send('Cookie de camacho enviada');
});

// Envío de cabeceras personalizadas
app.get('/cabeceras', (req, res) => {
    res.set('X-Custom-Header', 'MiCabeceraPersonalizada');
    res.send('Cabecera personalizada enviada');
});

// Envío de archivo para descarga
app.get('/descargar', (req, res) => {
    res.download(path.join(__dirname, 'public', 'documento.pdf'), 'mi-archivo.pdf', (err) => {
        if (err) {
            res.status(500).send('Error al descargar el archivo');
        }
    });
});

// Streaming de datos
app.get('/stream', (req, res) => {
    res.write('Primera parte del contenido...\n');
    setTimeout(() => {
        res.write('Segunda parte del contenido...\n');
        res.end();
    }, 2000);
});

// Redirección condicionada
app.get('/login', (req, res) => {
    const usuarioAutenticado = false; // Simula autenticación
    if (usuarioAutenticado) {
        res.send('Bienvenido de nuevo!');
    } else {
        res.redirect('/login-form');
    }
});

// Respuesta con múltiples estados
app.get('/metodo', (req, res) => {
    if (req.method === 'POST') {
        res.status(405).send('Método no permitido');
    } else {
        res.send('Este endpoint solo acepta GET');
    }
});

// Respuesta asíncrona
app.get('/async', async (req, res) => {
    try {
        const datos = await obtenerDatosExterno(); // Simula operación asíncrona
        res.json(datos);
    } catch (error) {
        res.status(500).send('Error al obtener datos');
    }
});

// Función ficticia para simular la obtención de datos asíncronos
async function obtenerDatosExterno() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ mensaje: 'Datos obtenidos exitosamente' }), 1000);
    });
}

// Inicializar servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
