if('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('./sw.js')
    .then((registration) => {
        console.log('Registration Worked');
    }).catch((err) => {
        console.log('Registration failed');
    });
}

