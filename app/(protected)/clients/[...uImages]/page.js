"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
// import prisma from "@lib/prisma";
import ClientsImg from "@components/ClientsImg";
import classes from "@styles/clients.module.css";
import FormUpload from "@components/FormUpload";

const getImages = () => {
  const path = usePathname();

  const pathList = path.split("/");
  const userId = parseInt(pathList[3]);
  const sessionId = parseInt(pathList[4]);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `/api/client?sessionId=${sessionId}&userId=${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      } else {
        setMessage(
          "There is no photo session available yet!",
          response.statusText
        );
        setImages([]);
      }
    } catch (error) {
      console.error("Error fetching favorited images:", error);
      setImages([]);
    }
  };

  return (
    <section className={classes.flex}>
      {message && <p>{message}</p>}
      {images.length > 0 ? (
        images.map((img) => (
          <div key={img.id}>
            <ClientsImg img={img} userId={userId} classes={classes} />
          </div>
        ))
      ) : (
        <FormUpload userId={userId} sessionId={sessionId} />
      )}
    </section>
  );
};
export default getImages;
