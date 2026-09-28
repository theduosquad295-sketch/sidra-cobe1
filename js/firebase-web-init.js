(function () {
  const firebaseConfig = {
    apiKey: 'AIzaSyCQCnXwxC3tGeWQZlr9arSsNLyw0pMYV4o',
    authDomain: 'sidra-cobe.firebaseapp.com',
    projectId: 'sidra-cobe',
    storageBucket: 'sidra-cobe.firebasestorage.app',
    messagingSenderId: '347282647878',
    appId: '1:347282647878:web:098b1856e510da51d01347',
    measurementId: 'G-ZE6GV5SGTQ'
  };

  const vapidKey = 'BC0Unb4m00QyiOxuLgH-8BCPvt5wJon7XdbtgfbTcYmK-eLLYgu5IEQCcVgH69wionCwqNxBrHgcuP-Bwd0RuTA';
  const backendUrl = 'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/registerAdminDevice';

  function getConfig() {
    if (window.SIDRA_FIREBASE_WEB_CONFIG && typeof window.SIDRA_FIREBASE_WEB_CONFIG === 'object') {
      return window.SIDRA_FIREBASE_WEB_CONFIG;
    }

    return firebaseConfig;
  }

  function getVapidKey() {
    if (window.SIDRA_FIREBASE_VAPID_KEY) {
      return window.SIDRA_FIREBASE_VAPID_KEY;
    }

    return vapidKey;
  }

  function saveToken(token) {
    try {
      localStorage.setItem('sidraCobeAdminFcmToken', token);
      localStorage.setItem('sidraCobeAdminFcmTokenUpdatedAt', new Date().toISOString());
    } catch (error) {
      // Ignore storage quota issues.
    }
  }

  async function registerAdminDeviceWithBackend(token) {
    if (!token || !backendUrl || backendUrl.includes('YOUR_PROJECT_ID')) {
      return false;
    }

    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          token,
          deviceType: 'web',
          source: 'sidra-cobe-admin'
        })
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  }

  function getRegistrationToken() {
    try {
      return localStorage.getItem('sidraCobeAdminFcmToken') || '';
    } catch (error) {
      return '';
    }
  }

  async function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) {
      return null;
    }

    try {
      return await navigator.serviceWorker.register('/firebase-messaging-sw.js', { scope: '/' });
    } catch (error) {
      console.warn('FCM service worker registration failed:', error);
      return null;
    }
  }

  async function requestPermissionAndToken() {
    if (!('Notification' in window) || !firebase || !firebase.messaging || !firebase.messaging.isSupported()) {
      return { granted: false, token: null, reason: 'This browser does not support Firebase Cloud Messaging.' };
    }

    if (!window.__SIDRA_FIREBASE_APP_INITIALIZED__) {
      firebase.initializeApp(getConfig());
      window.__SIDRA_FIREBASE_APP_INITIALIZED__ = true;
    }

    const messaging = firebase.messaging();
    const registration = await registerServiceWorker();

    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        return { granted: false, token: null, reason: 'Notification permission was not granted.' };
      }
    }

    if (Notification.permission !== 'granted') {
      return { granted: false, token: null, reason: 'Notification permission is not enabled.' };
    }

    const token = await messaging.getToken({
      vapidKey: getVapidKey(),
      serviceWorkerRegistration: registration
    });

    if (token) {
      saveToken(token);
      registerAdminDeviceWithBackend(token);
      return { granted: true, token, registration };
    }

    return { granted: false, token: null, reason: 'No FCM token was returned.' };
  }

  function attachForegroundMessageListener() {
    if (!firebase || !firebase.messaging || !firebase.messaging.isSupported()) {
      return;
    }

    const messaging = firebase.messaging();

    messaging.onMessage((payload) => {
      const title = payload?.notification?.title || 'SIDRA COBE update';
      const body = payload?.notification?.body || 'A new update is available.';

      if (Notification.permission === 'granted') {
        new Notification(title, {
          body,
          icon: '/images/logo/logo.jpg',
          badge: '/images/logo/logo.jpg'
        });
      }
    });
  }

  async function initializeMessaging() {
    const token = getRegistrationToken();

    if (token) {
      return { granted: true, token };
    }

    return requestPermissionAndToken();
  }

  window.sidraRegisterFirebaseMessaging = async function sidraRegisterFirebaseMessaging(options = {}) {
    const result = await initializeMessaging();

    if (options && typeof options.onResult === 'function') {
      options.onResult(result);
    }

    return result;
  };

  window.sidraSendOrderEventToBackend = async function sidraSendOrderEventToBackend(order) {
    if (!order || !order.orderNumber) {
      return { ok: false, reason: 'Missing order payload.' };
    }

    const endpoint = window.SIDRA_ORDER_NOTIFICATION_ENDPOINT || 'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/sendOrderNotification';
    if (endpoint.includes('YOUR_PROJECT_ID')) {
      return { ok: false, reason: 'Cloud Function endpoint is not configured yet.' };
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          orderId: order.orderNumber,
          customerName: order.address?.fullName || 'Customer',
          orderTotal: Number(order.totalValue || 0),
          productName: order.productName || order.products || 'Product',
          createdAt: order.createdAt || new Date().toISOString(),
          source: 'checkout'
        })
      });

      const payload = await response.json().catch(() => ({}));
      return { ok: response.ok, status: response.status, payload };
    } catch (error) {
      return { ok: false, reason: error.message || 'Failed to send order event.' };
    }
  };

  window.sidraAttachFirebaseForegroundListener = attachForegroundMessageListener;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      attachForegroundMessageListener();
      if (window.SIDRA_FIREBASE_AUTO_INIT !== false) {
        window.sidraRegisterFirebaseMessaging();
      }
    }, { once: true });
  } else {
    attachForegroundMessageListener();
    if (window.SIDRA_FIREBASE_AUTO_INIT !== false) {
      window.sidraRegisterFirebaseMessaging();
    }
  }
})();
