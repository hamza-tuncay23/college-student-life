// ======================================
// College Student Life
// Firestore Manager
// ======================================

function getCurrentUserId() {

    const user = firebase.auth().currentUser;

    if (!user) {
        throw new Error("User not authenticated.");
    }

    return user.uid;

}



// ---------------------------
// Add document
// ---------------------------

async function addDocument(collectionName, data) {

    const uid = getCurrentUserId();

    const docRef = await db.collection(collectionName).add({
        uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        ...data
    });

    return docRef.id;

}



// ---------------------------
// Create / Replace document
// ---------------------------

async function setDocument(collectionName, documentId, data) {

    const uid = getCurrentUserId();

    await db
        .collection(collectionName)
        .doc(documentId)
        .set({
            uid,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            ...data
        });

}



// ---------------------------
// Get one document
// ---------------------------

async function getDocument(collectionName, documentId) {

    const uid = getCurrentUserId();

    const doc = await db
        .collection(collectionName)
        .doc(documentId)
        .get();

    if (!doc.exists) return null;

    const data = doc.data();

    if (data.uid !== uid) return null;

    return {
        id: doc.id,
        ...data
    };

}



// ---------------------------
// Get collection
// ---------------------------

async function getCollection(collectionName) {

    const uid = getCurrentUserId();

    const snapshot = await db
        .collection(collectionName)
        .where("uid", "==", uid)
        .orderBy("createdAt", "desc")
        .get();

    const documents = [];

    snapshot.forEach(doc => {

        documents.push({
            id: doc.id,
            ...doc.data()
        });

    });

    return documents;

}



// ---------------------------
// Update document
// ---------------------------

async function updateDocument(collectionName, documentId, data) {

    const uid = getCurrentUserId();

    const ref = db.collection(collectionName).doc(documentId);

    const doc = await ref.get();

    if (!doc.exists) return;

    if (doc.data().uid !== uid) return;

    await ref.update({
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        ...data
    });

}



// ---------------------------
// Delete document
// ---------------------------

async function deleteDocument(collectionName, documentId) {

    const uid = getCurrentUserId();

    const ref = db.collection(collectionName).doc(documentId);

    const doc = await ref.get();

    if (!doc.exists) return;

    if (doc.data().uid !== uid) return;

    await ref.delete();

}



// ---------------------------
// Listen collection
// ---------------------------

function listenCollection(collectionName, callback) {

    const uid = getCurrentUserId();

    return db
        .collection(collectionName)
        .where("uid", "==", uid)
        .orderBy("createdAt", "desc")
        .onSnapshot(snapshot => {

            const documents = [];

            snapshot.forEach(doc => {

                documents.push({
                    id: doc.id,
                    ...doc.data()
                });

            });

            callback(documents);

        });

}



// ---------------------------
// Listen document
// ---------------------------

function listenDocument(collectionName, documentId, callback) {

    const uid = getCurrentUserId();

    return db
        .collection(collectionName)
        .doc(documentId)
        .onSnapshot(doc => {

            if (!doc.exists) {
                callback(null);
                return;
            }

            const data = doc.data();

            if (data.uid !== uid) {
                callback(null);
                return;
            }

            callback({
                id: doc.id,
                ...data
            });

        });

}
