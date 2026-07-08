// ======================================
// College Student Life
// Firestore Manager
// ======================================


// Add document
async function addDocument(collectionName, data) {

    try {

        const docRef = await db.collection(collectionName).add(data);

        return docRef.id;

    } catch (error) {

        console.error("Add document error:", error);

        throw error;

    }

}



// Get document
async function getDocument(collectionName, documentId) {

    try {

        const doc = await db
            .collection(collectionName)
            .doc(documentId)
            .get();

        if (!doc.exists) {
            return null;
        }

        return {
            id: doc.id,
            ...doc.data()
        };

    } catch (error) {

        console.error("Get document error:", error);

        throw error;

    }

}



// Get collection
async function getCollection(collectionName) {

    try {

        const snapshot = await db.collection(collectionName).get();

        const data = [];

        snapshot.forEach(doc => {

            data.push({
                id: doc.id,
                ...doc.data()
            });

        });

        return data;

    } catch (error) {

        console.error("Collection error:", error);

        throw error;

    }

}



// Update document
async function updateDocument(collectionName, documentId, data) {

    try {

        await db
            .collection(collectionName)
            .doc(documentId)
            .update(data);

    } catch (error) {

        console.error("Update error:", error);

        throw error;

    }

}



// Delete document
async function deleteDocument(collectionName, documentId) {

    try {

        await db
            .collection(collectionName)
            .doc(documentId)
            .delete();

    } catch (error) {

        console.error("Delete error:", error);

        throw error;

    }

}



// Realtime listener
function listenCollection(collectionName, callback) {

    return db.collection(collectionName).onSnapshot(snapshot => {

        const data = [];

        snapshot.forEach(doc => {

            data.push({

                id: doc.id,

                ...doc.data()

            });

        });

        callback(data);

    });

}
