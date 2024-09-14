import { app } from "@/Firebase/firebaseconfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

const auth = getAuth(app);

export function signupWithEmailPassword(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user, "user created successfully.");
      sendEmailVerification(auth.currentUser!).then(() => {
        // Email verification sent!
        // ...
      });
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}

export function loginWithEmailPassword(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("user login successfully", user);
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

export function emailVerification(){
  sendEmailVerification(auth.currentUser!)
  .then(() => {
    // Email verification sent!
    // ...
  });

}

export function signOutAtHome() {
  signOut(auth)
    .then(() => {
      console.log("Signout successfully")
    })
    .catch((error) => {
      console.log(error)
    });
}
