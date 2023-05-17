import { signIn, signOut, useSession } from "next-auth/react";

import Link from "next/link";
import React from "react";
import OffchainProfile from "~/components/Sidebar/OffchainProfile";
import getWelcomeLayout from "~/components/WelcomeLayout";
import { api } from "~/lib/api";
import { type NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { data: sessionData } = useSession();
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  if (sessionData) {
    return (
      <Link href={"/lockup/manage"}>
        Hi {sessionData?.user.name || ""}, click here to access the app
      </Link>
    );
  }

  return (
    <>
      <div>You need to be signed in to access this app</div>
      <OffchainProfile />
    </>
  );
};

Home.getLayout = getWelcomeLayout;

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
