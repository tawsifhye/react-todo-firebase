import { useEffect, useState } from "react";
import initializeFirebase from "../Firebase/firebase.init";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut, } from "firebase/auth";
initializeFirebase();

const GoogleProvider = new GoogleAuthProvider();

const useData = () => {
    const [taskList, setTaskList] = useState([]);
    const [user, setUser] = useState({});
    const auth = getAuth();

    const handleGoogleSignIn = () => {
        console.log('signin clicked');

        signInWithPopup(auth, GoogleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                setUser(user);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            setUser({});
        }).catch((error) => {
            // An error happened.
        });
    }
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
        });
        return () => unsubscribed;
    }, []);



    const authReturn = {
        user,
        setUser,
        handleGoogleSignIn,
        handleSignOut
    }

    return [
        taskList,
        setTaskList,
        authReturn

    ];
}

export default useData;