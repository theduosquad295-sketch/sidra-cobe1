const functions = require('firebase-functions');
const admin = require('firebase-admin');

let db;

function getDb() {
  if (!db) {
    admin.initializeApp();
    db = admin.firestore();
  }

  return db;
}

function sanitizeOrderPayload(data = {}) {
  const orderId = String(data.orderId || '').trim();
  const customerName = String(data.customerName || '').trim();
  const orderTotal = Number(data.orderTotal || 0);
  const productName = String(data.productName || '').trim();

  if (!orderId || !customerName || !productName) {
    throw new Error('Invalid order payload.');
  }

  return {
    orderId,
    customerName,
    orderTotal,
    productName,
    createdAt: String(data.createdAt || new Date().toISOString())
  };
}

async function requireFirebaseUser(req) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token) {
    return null;
  }

  try {
    return await admin.auth().verifyIdToken(token);
  } catch (error) {
    return null;
  }
}

exports.registerAdminDevice = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  try {
    const user = await requireFirebaseUser(req);
    if (!user) {
      return res.status(401).json({ ok: false, error: 'Authentication required.' });
    }

    const token = String(req.body?.token || '').trim();
    if (!token) {
      return res.status(400).json({ ok: false, error: 'Missing FCM token.' });
    }

    const database = getDb();

    await database.collection('adminDevices').doc('sidra-cobe-admin-web').set({
      fcmToken: token,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      deviceType: String(req.body?.deviceType || 'web'),
      source: String(req.body?.source || 'sidra-cobe-admin'),
      uid: user.uid
    }, { merge: true });

    return res.status(200).json({ ok: true, message: 'Admin device registered.' });
  } catch (error) {
    functions.logger.error('registerAdminDevice failed', error);
    return res.status(500).json({ ok: false, error: 'Unable to register admin device.' });
  }
});

exports.sendOrderNotification = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  try {
    const user = await requireFirebaseUser(req);
    if (!user) {
      return res.status(401).json({ ok: false, error: 'Authentication required.' });
    }

    const payload = sanitizeOrderPayload(req.body || {});
    const database = getDb();
    const adminDeviceDoc = await database.collection('adminDevices').doc('sidra-cobe-admin-web').get();

    if (!adminDeviceDoc.exists) {
      return res.status(404).json({ ok: false, error: 'No admin device registered.' });
    }

    const fcmToken = String(adminDeviceDoc.data()?.fcmToken || '').trim();
    if (!fcmToken) {
      return res.status(404).json({ ok: false, error: 'Admin FCM token missing.' });
    }

    const message = {
      notification: {
        title: 'New SIDRA COBE Order',
        body: `${payload.customerName} • ${payload.productName} • ₹${Number(payload.orderTotal || 0).toLocaleString('en-IN')}`
      },
      data: {
        orderId: payload.orderId,
        customerName: payload.customerName,
        orderTotal: String(payload.orderTotal),
        productName: payload.productName,
        clickAction: 'FLUTTER_NOTIFICATION_CLICK',
        url: '/admin/notifications.html'
      },
      token: fcmToken
    };

    const response = await admin.messaging().send(message);

    return res.status(200).json({ ok: true, messageId: response, orderId: payload.orderId });
  } catch (error) {
    functions.logger.error('sendOrderNotification failed', error);
    return res.status(500).json({ ok: false, error: 'Unable to send order notification.' });
  }
});
