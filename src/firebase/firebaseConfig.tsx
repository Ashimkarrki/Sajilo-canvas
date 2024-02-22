// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA3XXVulBb3zfL0Qf80c7lq4KNrGXYJa1o",
  authDomain: "imageuploader-8a71a.firebaseapp.com",
  projectId: "imageuploader-8a71a",
  storageBucket: "imageuploader-8a71a.appspot.com",
  messagingSenderId: "1006691547625",
  appId: "1:1006691547625:web:975c64b934027e8dafb378",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
