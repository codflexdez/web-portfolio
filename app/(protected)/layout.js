"use client";
import React from "react";
import { Suspense } from "react";
import classes from "@styles/login.module.css";
import { useSession } from "next-auth/react";
import Dashboard from "@components/Dashboard";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import Loading from "./loading";

const ProtectedLayout = ({ children }) => {
  const router = useRouter();
  const params = useParams();

  const { data: session, status } = useSession();

  const userName = decodeURIComponent(params.uImages[0]);
  const sessionUser = session?.user.name;

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className={classes.loader_box}>
        <div className={classes.loader}></div>
        <span>loading...</span>
      </div>
    );
  }
  // || userName !== sessionUser
  return (
    <section>
      <Dashboard session={session} />
      {!session ? (
        <div className={classes.protected}>
          This page is protected and you do not have access to it!
        </div>
      ) : (
        <Suspense fallback={<Loading />}>
          <aside>{children}</aside>
        </Suspense>
      )}
    </section>
  );
};

export default ProtectedLayout;
