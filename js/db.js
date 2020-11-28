const id = "match.id";

var dbPromised = idb.open("liga-inggris", 1, function (upgradeDb) {
    var matchObjectStore = upgradeDb.createObjectStore("matches", {
        keyPath: id
    });
    matchObjectStore.createIndex("match_id", "match.id", { unique: false });
});

function saveForLater(match) {
    const ht = match.match.homeTeam.name;
    const at = match.match.awayTeam.name;
    const result = confirm(`Yakin ingin menambahkan jadwal ${ht} vs ${at} ke Favorit ?`);
    if (result) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("matches", "readwrite");
                var store = tx.objectStore("matches");
                console.log(match);
                store.put(match);
                return tx.complete;
            })
            .then(function () {
                console.log("Pertandingan berhasil di simpan.");
                pushNotification(`Jadwal pertandingan ${ht} vs ${at} berhasil di simpan.`);
            });
    }
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("matches", "readonly");
                var store = tx.objectStore("matches");
                return store.getAll();
            })
            .then(function (matches) {
                resolve(matches);
            });
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("matches", "readonly");
                var store = tx.objectStore("matches");
                return store.get(parseInt(id));
            })
            .then(function (match) {
                resolve(match);
            });
    });
}

function deleteById(id) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("matches", "readwrite");
            var store = tx.objectStore("matches");
            store.delete(parseInt(id));
            return tx.complete;
        })
        .then(function () {
            console.log('Jadwal dihapus');
        });
    location.reload();
}