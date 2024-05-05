const { createObjectDriving} = require('./fileHandler');
const { createNewDriving, getDocumentById, updateDocument, deleteDocument } = require('./firebaseOperations.js');
const {Driving} = require('./Driving.js');

const filePath = 'C:/Users/User/Downloads/text3.txt'; 

createObjectDriving(filePath)
    .then(drivingData => {
      
        return createNewDriving(drivingData.toJSON());
    })
    .then(docRef => {
        console.log('Document created with ID:', docRef.id);
        console.log('Data stored in Firebase successfully');
    })
    .catch(error => {
        console.error('Failed to create document:', error);
    });