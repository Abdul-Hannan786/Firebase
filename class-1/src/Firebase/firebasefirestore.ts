import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
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

export async function saveTodo(todo: string, isComplete: boolean) {
  const uid = auth.currentUser?.uid;
  const newTodo = { todo, uid, isComplete };

  try {
    const collectionRef = collection(db, "todos");
    await addDoc(collectionRef, newTodo);
  } catch (error) {
    console.log(error);
  }
}

export async function fetchTodos() {
  // let docRef = doc(db, "collectionName", "docID")
  // await getDoc(docRef)

  // let collectionRef = collection(db, "collectionName")
  // query(where, condition)
  // await getDocs(collectionRef)

  const collectionRef = collection(db, "todos");
  const currentUserUID = auth.currentUser?.uid;

  const condition = where("uid", "==", currentUserUID);
  const q = query(collectionRef, condition);

  const allTodosSnapShot = await getDocs(q);

  allTodosSnapShot.forEach((todo) => {
    const todoData = todo.data();
    todoData.id = todo.id;

    console.log(todoData);
  });
}