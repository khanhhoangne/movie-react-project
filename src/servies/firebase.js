import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, doc, updateDoc } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAF40DGpVdealGhl7qGAM-FL_6XNyEVaN0",
    authDomain: "movie-reactapp-3a261.firebaseapp.com",
    projectId: "movie-reactapp-3a261",
    storageBucket: "movie-reactapp-3a261.appspot.com",
    messagingSenderId: "444513798891",
    appId: "1:444513798891:web:a7fe670d52da06e4508cae",
    measurementId: "G-HRPJ3J5DG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("User signed in:", user);
        })
        .catch((error) => {
            console.error("Error signing in:", error);
        });
}

const signOutUser = () => {
    signOut(auth)
        .then(() => {
            console.log("User signed out");
            localStorage.clear(); // Clear any saved user data
        })
        .catch((error) => {
            console.error("Error signing out: ", error);
        });
};

const getToken = () => {
    return `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`;
}

const isAuthenticated = () => {
    const token = getToken();
    return !!sessionStorage.getItem(token);
}

const addDataFireStore = async (data) => {
    const docRef = await addDoc(collection(db, "users"), data);
    return docRef;
}

const getAllDataFireStore = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot;
}

const getDataFireStore = async (key, value) => {
    const queryAction = query(collection(db, 'users'), where(key, '==', value));

    const querySnapshot = await getDocs(queryAction);
    return querySnapshot;
}

const updateDataFireStore = async ( documentId, data ) => {
    try {
        const docRef = doc(db, 'users', documentId);
        await updateDoc(docRef, data);

        return true;
    } catch (error) {
        console.log('update failed', error);
        return false;
    }
}

export { 
    auth, signInWithGoogle, signOutUser, isAuthenticated,
    addDataFireStore, getDataFireStore, getAllDataFireStore, updateDataFireStore
};