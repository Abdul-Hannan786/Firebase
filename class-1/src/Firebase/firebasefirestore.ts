import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "./firebaseconfig";
import { auth } from "./firebaseauth";

type UserType = {
  email: string;
  rollNumber: string;
  studentName: string;
  uid: string;
};

const db = getFirestore(app);

export async function saveUser(user: UserType) {
  try {
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, user);
  } catch (error) {
    console.log(error);
  }
}

export async function saveTodo(todo: string) {

    const uid = auth.currentUser?.uid
    const newTodo = {todo, uid}

    try{
        const collectionRef = collection(db, "todos")
        await addDoc(collectionRef , newTodo)
    }
    catch(error){
        console.log(error)
    }
}