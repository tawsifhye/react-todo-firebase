import { useEffect, useState } from "react";
import initializeFirebase from "../Firebase/firebase.init";
import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, } from "firebase/auth";
initializeFirebase();

const GoogleProvider = new GoogleAuthProvider();

const useData = () => {
    const [taskList, setTaskList] = useState([]);
    const [user, setUser] = useState({});
    // const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLogin, setIsLogin] = useState(false);
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

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);

    };

    const handleRegistration = (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setError("Password should be at least 6 characters");
            return;
        }
        isLogin ? processLogin(email, password) : registerNewUser(email, password);
    };

    const processLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                setError("");
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                // window.location.reload();
            });
    };

    const registerNewUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {

            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                window.location.reload();
            });
    };


    const toggleLogin = (e) => {
        setIsLogin(e.target.checked);
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


    return [
        taskList,
        setTaskList,
        user,
        setUser,
        handleGoogleSignIn,
        handleSignOut,
        handleEmailChange,
        handlePasswordChange,
        handleRegistration,
        toggleLogin,
        isLogin,
        error

    ];
}

export default useData;