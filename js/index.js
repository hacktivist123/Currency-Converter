let dbPromise = idb.open('cc-db', 1, (upgradeDb) => {
    let keyValStore = upgradeDb.createObjectStore('keyval');
    keyValStore.put('world', 'Hello');
});