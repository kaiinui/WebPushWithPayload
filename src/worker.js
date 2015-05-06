self.addEventListener('push', function(event) {
    self.registration.pushManager.getSubscription().then(function(subscription) {
        fetch(_makeNotificationURL("/notification.json", subscription.subscriptionId)).then(function(res) {
            if (res.status !== 200) {
                throw new Error();
            }

            // `json` should contain "title", "body", "icon", "tag", "url" keys.
            return res.json().then(function (json) {
                var title = json.title;
                var body = json.body;
                var icon = _makeURLEmbeddedIconURL(json.icon, json.url, subscription.subscriptionId);
                var tag = json.tag;

                return self.registration.showNotification(title, {
                    body: body,
                    icon: icon,
                    tag: tag
                });
            });
        }).catch(function(err) {
            console.error(err);
        });
    });
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close(); // since android chrome will not close the notification automatically.

    var icon = event.notification.icon;
    var url = _extractURLFromIconURL(icon);
    var subscriptionId = _extractSubscriptionIdFromIconURL(icon);

    clients.openWindow(url + "#" + subscriptionId);
});

function _makeNotificationURL(base, subscriptionId) {
    return base + "?subscriptionId=" + subscriptionId;
}

function _makeURLEmbeddedIconURL(icon, url, subscriptionId) {
    return icon + "#" + encodeURI(url) + "+" + subscriptionId;
}

function _extractURLFromIconURL(icon) {
    return decodeURI(icon.split("#")[1].split("+")[0]);
}

function _extractSubscriptionIdFromIconURL(icon) {
    return icon.split("+")[1];
}
