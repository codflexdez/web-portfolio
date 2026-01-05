"use client";
import React, { useState, useEffect } from "react";
import classProof from "@styles/proofing.module.css";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import lockIcon from "@public/assets/icons/lock.png";
import dummyImage from "@public/assets/icons/rp-logo.svg";

const Proofing = () => {
  const { data: session } = useSession(null);
  const [photoSession, setPhotoSession] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/proofing");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      setPhotoSession(data);
    } catch (error) {
      console.error("Error fetching photo sessions:", error);
    }
  };

  return (
    <div className={classProof.main_container}>
      <section className={classProof.flex_container}>
        {photoSession.map((file) => (
          <Link
            key={file.id}
            href={{
              pathname:
                !session || session?.user.id !== file.user_id
                  ? `/signin`
                  : `/clients/[uName]/[uId]/[sId]`,
            }}
            as={
              !session || session?.user.id !== file.user_id
                ? null
                : `/clients/${file.title}/${file.user_id}/${file.id}`
            }
          >
            <div className={classProof.flex_card}>
              <div>
                {file.image[0] ? (
                  <Image
                    className={
                      session?.user.name === file.title
                        ? classProof.opacity
                        : ""
                    }
                    src={file.image[0]?.img_path}
                    alt={`session_${file.title}`}
                    width={500}
                    height={500}
                    priority
                  />
                ) : (
                  <Image
                    src={dummyImage}
                    alt={`Dummy Image`}
                    width={500}
                    height={500}
                    priority
                  />
                )}
                <div
                  className={
                    session?.user.name === file.title ? "" : classProof.overlay
                  }
                ></div>
                <Image
                  className={
                    session?.user.name === file.title
                      ? classProof.isNoLock
                      : classProof.isLock
                  }
                  src={lockIcon}
                  alt="locked section"
                />
              </div>

              <p>{file.title}</p>
              <span className={classProof.img_type}>
                {file.image[0]?.category.type}
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Proofing;
