// Función para obtener información del navegador, sistema y ubicación
function getExtendedBrowserInfo() {
    const info = {
        browser: navigator.userAgent,
        browserName: navigator.appName,
        browserVersion: navigator.appVersion,
        platform: navigator.platform,
        language: navigator.language,
        cookiesEnabled: navigator.cookieEnabled,
        device: inferDevice(navigator.userAgent),
        memory: navigator.deviceMemory || 'Not available',
        cores: navigator.hardwareConcurrency || 'Not available',
        online: navigator.onLine,
        connectionType: navigator.connection ? navigator.connection.effectiveType : 'Not available',
        connectionSpeed: navigator.connection ? navigator.connection.downlink + ' Mbps' : 'Not available',
        screenResolution: window.screen.width + 'x' + window.screen.height,
        colorDepth: window.screen.colorDepth + ' bits',
        currentURL: window.location.href,
        domain: window.location.hostname,
        path: window.location.pathname,
        protocol: window.location.protocol,
        referrer: window.location.referrer || 'Not available',  // Añadido el referrer aquí
        loadTime: window.performance.now().toFixed(2) + ' ms',
        historyPages: window.history.length,
        vibrationSupport: 'vibrate' in navigator ? 'Yes' : 'No',
    };

    // Battery API
    if (navigator.getBattery) {
        navigator.getBattery().then(function(battery) {
            info.batteryLevel = (battery.level * 100) + '%';
            info.batteryCharging = battery.charging ? 'Yes' : 'No';
            displayInfoInHTML(info);
        });
    } else {
        displayInfoInHTML(info);
    }

    return info;
}

// Función para intentar inferir el dispositivo a partir del userAgent
function inferDevice(userAgent) {
    if (userAgent.match(/iPhone/i)) {
        return "iPhone";
    } else if (userAgent.match(/iPad/i)) {
        return "iPad";
    } else if (userAgent.match(/Android/i)) {
        return "Android Device";
    } else if (userAgent.match(/Windows/i)) {
        return "Windows PC";
    } else if (userAgent.match(/Mac/i)) {
        return "Mac";
    } else {
        return "Unknown Device";
    }
}

// Función para mostrar la información en el HTML
function displayInfoInHTML(info) {
    const infoDiv = document.getElementById('info');

    // Crear una lista para mostrar la información de manera legible
    let contentHTML = '<ul>';
    for (const key in info) {
        contentHTML += `<li><strong>${key}:</strong> ${info[key]}</li>`;
    }
    contentHTML += '</ul>';

    // Insertar la lista en el div
    infoDiv.innerHTML = contentHTML;
}

// Función para obtener y mostrar la ubicación actual
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            const locationHTML = `<li><strong>Location:</strong> Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy} meters</li>`;
            document.querySelector('#info ul').insertAdjacentHTML('beforeend', locationHTML);
        }, function(error) {
            console.error("Error getting location: ", error);
        });
    } else {
        console.error("Geolocation not supported by this browser");
    }
}

// Mostrar la información del navegador y del sistema en el HTML
const browserInfo = getExtendedBrowserInfo();

// Obtener y mostrar la ubicación
getCurrentLocation();
