var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BIph3out1bOYbPpBw3BaQmhWqmLCPdf9xHBCH5EYVY5J47-zsPwMt9xMarQlpbAE5Tmu8nz0gKmq7ylEJX_zeZw",
    "privateKey": "07Ku2QfJHYhcXx3SiHhO13HM1mKNyf-Ml6hGBr6kt4Q"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eawwOg9IG2Y:APA91bF4ksi8At-lHKGI8tTeet-GLRLH3_GdEXXouEIWTEeFXj2iaqkOmBQait8KYbahgybdeU4yCxSc3pzXf56y01Ghj3sSVs_dGycJPDSBomR2U20mN3fp4v-vP__d0FOESsCE5VVs",
    "keys": {
        "p256dh": "BM8GgTh7VY4v4ZdZPSIsV7ypLului/SR0xpQiEmcF2iQ6CjyyvC+zJ3QkfL21apHKn+Yx3Gf+2pqOBq1YYdjpPM=",
        "auth": "llIrBK0l3wFXTkP34qMsTw=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '552850285637',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);