// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, updateCurrentUser, updateProfile } from "firebase/auth";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASURMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const auth = getAuth(app);

export const upload = async (file, currentUser, setLoading, setProgress) => {
  setLoading(true);
  const fileRef = ref(storage, currentUser.uid + ".jpg");

  const uploadTask = uploadBytesResumable(fileRef, file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      setProgress(
        Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      );
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        updateProfile(currentUser, {
          photoURL: downloadURL,
        })
          .then(() => {
            updateCurrentUser(auth, currentUser);
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        setLoading(false);
      });
    }
  );
};

export const deleteP = async (imgURL, currentUser) => {
  // Create a reference to the file to delete
  const deleteRef = ref(storage, imgURL);
  if (deleteRef) {
    // Delete the file
    deleteObject(deleteRef)
      .then(() => {
        // File deleted successfully
        console.log("File deleted successfully");
      })
      .then(() => {
        updateProfile(currentUser, {
          photoURL: null,
        })
          .then(() => {
            updateCurrentUser(auth, currentUser);
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log("Uh-oh, an error occurred!");
      });
  } else {
    console.log("No file to delete");
  }
};

export default app;
