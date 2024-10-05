"use client";

import { auth } from "@/Firebase/firebaseauth";
import { app } from "@/Firebase/firebaseconfig";
import { db } from "@/Firebase/firebasefirestore";
import { addDoc, collection } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Image from "next/image";
import React, { useState } from "react";

const About = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [file, setFile] = useState<File>();
  const [errorMsg, setErrorMsg] = useState("");
  const [progress, setProgress] = useState<number | null>(null);
  const [imageURL, setImageURL] = useState("");
  const [caption, setCaption] = useState("");

  const storage = getStorage(app);

  const uploadImage = async () => {
    if (!file) {
      setErrorMsg("Please first select a file");
      return;
    }
    console.log(file);
    const newName = makeName(file.name);
    const imageRef = ref(storage, `images/${newName}`);
    setCaption("")

    try {
      const uploadTask = uploadBytesResumable(imageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("File available at", downloadURL);
              setImageURL(downloadURL);
              saveDataToFirestore(downloadURL);
              setProgress(null)
            })
            .catch((e) => {
              console.log(e);
            });
        }
      );
    } catch (e) {
      console.log(e);
    }

  };

  const makeName = (fileName: string): string => {
    const fileNameArr = fileName.split(".");
    const lastIndex = fileNameArr.length - 1;
    const fileExtension = fileNameArr[lastIndex];
    const newName = `${crypto.randomUUID()}.${fileExtension}`;
    return newName;
  };

  // const emptyForm = () => {
  //   setCaption("")
  //   setProgress(null)
  // }

  const saveDataToFirestore = async (imageURL: string) => {
    const imageObj = {
      imageURL,
      caption,
      userID: auth.currentUser?.uid
    };
    const imageDocRef = collection(db, "storyImages")
    await addDoc(imageDocRef, imageObj)
  };

  return (
    <>
      <h1>Upload Image</h1>
      <input
        type="file"
        onChange={(e) => {
          const files = e.target.files;
          if (files) setFile(files[0]);
        }}
      />
      <br />
      <br />
      <textarea
        name="caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      ></textarea>
      <br />
      <br />
      <button onClick={uploadImage}>Upload Image</button>
      {progress && <p>Upload is {progress} % done</p>}
      {errorMsg && <p>{errorMsg}</p>}

      {imageURL && <Image src={imageURL} alt="New York City" width={500} height={500}/>}
    </>
  );
};

export default About;
