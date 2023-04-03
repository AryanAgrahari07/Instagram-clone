import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
        apiKey: "AIzaSyBvuAx5Y6j9UnDAwBJ6JEbVpI8qpVDm2wo",
        authDomain: "instagram-clone-db990.firebaseapp.com",
        projectId: "instagram-clone-db990",
        storageBucket: "instagram-clone-db990.appspot.com",
        messagingSenderId: "168934221348",
        appId: "1:168934221348:web:2eab21d262e21413175ab1",
        measurementId: "G-Z6C60HW2SX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage(app);
export const db = getFirestore(app);
