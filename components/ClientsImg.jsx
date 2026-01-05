"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import download from "@public/assets/icons/download.png";
import { list } from "@vercel/blob";

const ClientsImg = ({ img, userId, classes }) => {
  const [isLiked, setIsLiked] = useState(null);

  useEffect(() => {
    // Fetch favorited images when the component mounts
    const fetchFavoritedImages = async () => {
      try {
        const response = await fetch(`/api/favorite/${userId}`);
        if (response.ok) {
          const favorite = await response.json();
          setIsLiked(favorite);
        } else {
          console.error(
            "Error fetching favorited images:",
            response.statusText
          );
          setIsLiked([]);
        }
      } catch (error) {
        console.error("Error fetching favorited images:", error);
        setIsLiked([]);
      }
    };

    fetchFavoritedImages();
  }, [userId]);

  const toggleLike = async () => {
    try {
      const response = await fetch(`/api/favorite/${img.id}/${userId}`, {
        method: isLiked && isLiked.includes(img.id) ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsLiked((prevLikes) => {
          // Toggle the like status only for the clicked image
          if (prevLikes.includes(img.id)) {
            return prevLikes.filter((id) => id !== img.id);
          } else {
            return prevLikes ? [...prevLikes, img.id] : [img.id];
          }
        });
      } else {
        console.error(
          "Error updating liked status in the database:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating liked status:", error);
    }
  };

  const handleClick = () => {
    const downloadUrl = `${img.img_path}?download=1`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.click();
  };

  return (
    <div className={classes.img_frame}>
      <span className={classes.client_title}>
        {img.img_name}
        <span
          className={`fa fa-heart${
            isLiked && isLiked.includes(img.id) ? "" : "-o"
          } fa-lg`}
          aria-hidden="true"
          onClick={toggleLike}
        ></span>
      </span>

      <Image src={img.img_path} alt={img.img_name} width={500} height={375} />

      <button type="button" onClick={handleClick}>
        <Image src={download} alt="download-button" />
      </button>
    </div>
  );
};

export default ClientsImg;
