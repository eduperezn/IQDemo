// Función para obtener información del navegador, sistema y ubicación
function obtenerInformacionNavegadorExtendida() {
    const info = {
        navegador: navigator.userAgent,
        nombreNavegador: navigator.appName,
        versionNavegador: navigator.appVersion,
        plataforma: navigator.platform,
        idioma: navigator.language,
        cookiesHabilitadas: navigator.cookieEnabled,
        dispositivo: inferirDispositivo(navigator.userAgent),
        memoria: navigator.deviceMemory || 'No disponible',
        numeroNucleos: navigator.hardwareConcurrency || 'No disponible',
        online: navigator.onLine,
        tipoConexion: navigator.connection ? navigator.connection.effectiveType : 'No disponible',
        velocidadConexion: navigator.connection ? navigator.connection.downlink + ' Mbps' : 'No disponible',
        resolucionPantalla: window.screen.width + 'x' + window.screen.height,
        profundidadColor: window.screen.colorDepth + ' bits',
        urlActual: window.location.href,
        dominio: window.location.hostname,
        ruta: window.location.pathname,
        protocolo: window.location.protocol,
        referrer: window.location.referrer || 'No disponible',  // Añadido el referrer aquí
        tiempoCarga: window.performance.now().toFixed(2) + ' ms',
        historialPaginas: window.history.length,
        soporteVibracion: 'vibrate' in navigator ? 'Sí' : 'No',
    };

    // Battery API
    if (navigator.getBattery) {
        navigator.getBattery().then(function(battery) {
            info.bateriaNivel = (battery.level * 100) + '%';
            info.bateriaCargando = battery.charging ? 'Sí' : 'No';
            mostrarInformacionEnHTML(info);
        });
    } else {
        mostrarInformacionEnHTML(info);
    }

    return info;
}

// Función para intentar inferir el dispositivo a partir del userAgent
function inferirDispositivo(userAgent) {
    if (userAgent.match(/iPhone/i)) {
        return "iPhone";
    } else if (userAgent.match(/iPad/i)) {
        return "iPad";
    } else if (userAgent.match(/Android/i)) {
        return "Dispositivo Android";
    } else if (userAgent.match(/Windows/i)) {
        return "PC con Windows";
    } else if (userAgent.match(/Mac/i)) {
        return "Mac";
    } else {
        return "Dispositivo desconocido";
    }
}

// Función para mostrar la información en el HTML
function mostrarInformacionEnHTML(info) {
    const infoDiv = document.getElementById('informacion');

    // Crear una lista para mostrar la información de manera legible
    let contenidoHTML = '<ul>';
    for (const clave in info) {
        contenidoHTML += `<li><strong>${clave}:</strong> ${info[clave]}</li>`;
    }
    contenidoHTML += '</ul>';

    // Insertar la lista en el div
    infoDiv.innerHTML = contenidoHTML;
}

// Función para obtener y mostrar la ubicación actual
function obtenerUbicacionActual() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitud = position.coords.latitude;
            const longitud = position.coords.longitude;
            const precision = position.coords.accuracy;

            const ubicacionHTML = `<li><strong>Ubicación:</strong> Latitud: ${latitud}, Longitud: ${longitud}, Precisión: ${precision} metros</li>`;
            document.querySelector('#informacion ul').insertAdjacentHTML('beforeend', ubicacionHTML);
        }, function(error) {
            console.error("Error obteniendo la ubicación: ", error);
        });
    } else {
        console.error("Geolocalización no soportada por el navegador");
    }
}

// Mostrar la información del navegador y del sistema en el HTML
const informacionNavegador = obtenerInformacionNavegadorExtendida();

// Obtener y mostrar la ubicación
obtenerUbicacionActual();
