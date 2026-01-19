"use client";
import React, { useState, useEffect } from "react";
import classProof from "@styles/proofing.module.css";
import errorStyles from "@styles/errorStates.module.css";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import lockIcon from "@public/assets/icons/lock.png";
import dummyImage from "@public/assets/icons/rp-logo.svg";

const Proofing = () => {
  const { data: session } = useSession();
  const [photoSession, setPhotoSession] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch("/api/proofing");
      
      if (!response.ok) {
        throw new Error(`Failed to fetch sessions: ${response.status} - ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Handle the case where API returns a message instead of data
      if (data.message) {
        setPhotoSession([]);
      } else {
        setPhotoSession(data);
      }
    } catch (error) {
      console.error("Error fetching photo sessions:", error);
      setError(error.message || "Failed to load photo sessions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={classProof.main_container}>
        <div className={errorStyles.stateContainer}>
          <div className={errorStyles.loadingIcon}>📸</div>
          <h2 className={errorStyles.loadingTitle}>Loading Your Gallery</h2>
          <p className={errorStyles.loadingMessage}>
            We're gathering your photo sessions...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={classProof.main_container}>
        <div className={errorStyles.stateContainer}>
          <h2 className={errorStyles.stateTitle}>Gallery loading issue</h2>
          <p className={errorStyles.stateMessage}>
            Please refresh the page. If the problem persists, you can reach me bellow
          </p>
          <button 
            onClick={fetchSessions}
            className={errorStyles.retryButton}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (photoSession.length === 0) {
    return (
      <div className={classProof.main_container}>
        <div className={errorStyles.stateContainer}>
          <div className={errorStyles.stateIcon}>📷</div>
          <h2 className={errorStyles.stateTitle}>No Photo Sessions Yet</h2>
          <p className={errorStyles.stateMessage}>
            Your gallery is empty right now. New photo sessions will appear here once they're available.
          </p>
        </div>
      </div>
    );
  }

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