importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'PASTE_YOUR_WEB_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload?.notification?.title || 'New order update';
  const body = payload?.notification?.body || 'A new order has been placed.';
  const notificationOptions = {
    body,
    icon: '/images/logo/logo.jpg',
    badge: '/images/logo/logo.jpg',
    tag: 'sidra-cobe-order-notification',
    data: payload?.data || {
      url: '/admin/notifications.html'
    }
  };

  return self.registration.showNotification(title, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = new URL(
    event?.notification?.data?.url || '/admin/notifications.html',
    self.location.origin
  ).toString();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsList) => {
      for (const client of clientsList) {
        if (client.url.includes('/admin/notifications.html') || client.url.includes('/notifications.html')) {
          client.focus();
          return client.postMessage({ type: 'sidra-open-notifications', data: event.notification.data || {} });
        }
      }

      return clients.openWindow(targetUrl);
    })
  );
});
