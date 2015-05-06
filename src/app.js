(function(window, undefined) {
    function registerServiceWorker() {
        if ('serviceWorker' in window.navigator) {
            window.navigator.serviceWorker.register('/worker.js').then(registerPush);
        } else {
            console.warn("Service workers are not supported.");
        }
    }

    function registerPush(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.subscribe().then(function(subscription) {
            console.log("subscriptionId: " + subscription.subscriptionId);
        });
    }

    window["registerServiceWorker"] = registerServiceWorker;
})(window);