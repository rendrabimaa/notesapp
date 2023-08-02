import { openDB } from 'idb';
  const openDb = () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("my-database", 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const notesStore = db.createObjectStore("notes", { keyPath: "id" });
        const categoriesStore = db.createObjectStore("categories", { keyPath: "id" });
      };
  
      request.onsuccess = () => {
        resolve(request.result);
      };
  
      request.onerror = (event) => {
        reject("Error opening database");
      };
    });
  };

  export const saveDataToDB = async (data, nameObjectStore) => {
    try {
      const db = await openDb();
      const transaction = db.transaction(nameObjectStore, "readwrite");
      const objectStore = transaction.objectStore(nameObjectStore);
      
      const clearRequest = objectStore.clear();
      
      data.forEach((item) => {
        objectStore.add(item);
      });
  
      transaction.oncomplete = () => {
        console.log("Data saved to database successfully");
      };
  
      transaction.onerror = (event) => {
        console.log("Error saving data to database", event.target.error);
      };
    } catch (error) {
      console.log("Error opening database", error);
    }
  };

  export const getDataFromIndexedDB = async (nameObjectStore) => {
    try {
      const db = await openDb("my-database", 1);
      const tx = db.transaction(nameObjectStore, 'readonly');
      const store = tx.objectStore(nameObjectStore);

      const data = await store.getAll();

      tx.done();
      return data;
    } catch (err) {
      console.error('Error fetching data from IndexedDb:', err);
      throw err;
    }
  }
  
  