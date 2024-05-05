const {db } = require('./firebase.js');
const {Driving} = require('./Driving.js');

async function createNewDriving(objectDriving) {
  try {
      const docRef = await db.collection('Driving').add(objectDriving);
      return docRef; // Return the reference to the newly created document
  } catch (error) {
      console.error(`Error creating document in collection 'Driving':`, error);
      throw error;
  }
}

// Function to retrieve a single document from a specified collection based on its ID
async function getDocumentById(collectionName, documentId) {
  try {
    const docRef = await db.collection(collectionName).doc(documentId).get();
    if (docRef.exists) {
      return { id: docRef.id, ...docRef.data() };
    } else {
      console.error(`Document '${documentId}' not found in collection '${collectionName}'`);
      return null;
    }
  } catch (error) {
    console.error(`Error getting document '${documentId}' from collection '${collectionName}':`, error);
    throw error;
  }
}

// Function to update a document in a specified collection
async function updateDocument(collectionName, documentId, newData) {
  try {
    await db.collection(collectionName).doc(documentId).update(newData);
    return { id: documentId, ...newData };
  } catch (error) {
    console.error(`Error updating document in collection '${collectionName}':`, error);
    throw error;
  }
}

// Function to delete a document from a specified collection
async function deleteDocument(collectionName, documentId) {
  try {
    await db.collection(collectionName).doc(documentId).delete();
    return { id: documentId };
  } catch (error) {
    console.error(`Error deleting document from collection '${collectionName}':`, error);
    throw error;
  }
}

module.exports = { createNewDriving, getDocumentById, updateDocument, deleteDocument };
