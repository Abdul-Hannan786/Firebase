"use client";

import { app } from "@/Firebase/firebaseconfig";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";

const About = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [file, setFile] = useState<File>();
  const [errorMsg, setErrorMsg] = useState("");

  const storage = getStorage(app);

  const uploadImage = async () => {
    if (!file) {
      setErrorMsg("Please first select a file");
      return;
    }
    setErrorMsg("");
    console.log(file);
    const newName = makeName(file.name);
    const imageRef = ref(storage, `images${newName}`);

    try{
       const uploadTask =  uploadBytesResumable(imageRef, file);
    }
    catch(e){
      console.log(e)
    }
  };

  const makeName = (fileName: string): string => {
    const fileNameArr = fileName.split(".");
    const lastIndex = fileNameArr.length - 1;
    const fileExtension = fileNameArr[lastIndex];
    const newName = `${crypto.randomUUID()}.${fileExtension}`;
    return newName;
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
      <button onClick={uploadImage}>Upload Image</button>
      {errorMsg && <p>{errorMsg}</p>}
    </>
  );
};

export default About;
