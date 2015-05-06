# WebPushWithPayload
An example project that perform service workers push with variable title, body, icon, url.

## Why?

Since Chrome 42 cannot include `data` field onto `notification`, it is difficult to show variable messages.

## How?

1. Simply perform `fetch` to get latest notification payload at `push` event. As the parameter, it uses `subscriptionId`.
  * `/notification.json?subscriptionId={subscriptionId}`
  * So API server needs to serve latest notification for specific subscriptionId
2. Embed `url` into `notification.icon` url using hash (#) for use at `notificationclick` event.
  * Because you cannot get `url` from `event.notification`!!!
3. On `notificationclick`, extract `url` from `event.notification.icon`. Perform `clients.openWindow(url);`
