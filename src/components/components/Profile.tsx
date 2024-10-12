"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { PersonIcon } from "@radix-ui/react-icons";

const Profile = () => {
  const { data: session } = useSession();

  return (
    <div className="group relative">
      <div
        onClick={() => {
          if (session) {
            signOut();
          } else {
            signIn("auth0");
          }
        }}
        className="flex justify-center items-center cursor-pointer"
      >
        <div
          className={`w-10 aspect-square rounded-full bg-transparent ${
            session ? "backdrop-blur-lg border border-white/20" : ""
          } text-base flex justify-center items-center`}
        >
          {session && session.user ? (
            session.user.image ? (
              <Image
                src={session.user.image}
                alt="Profile"
                className="w-full h-full rounded-full"
                width={100}
                height={100}
              />
            ) : (
              session.user.email &&
              session.user.email.slice(0, 1).toLocaleUpperCase()
            )
          ) : (
            <PersonIcon className="w-full h-full text-white bg-black/30 rounded-full" />
          )}
        </div>
      </div>
      <div className="absolute top-full -translate-x-1/2 left-1/2 mt-2 bg-white text-background px-2 py-1 text-sm w-40 text-center rounded-lg hidden group-hover:block">
        {session ? (
          <span>
            Signed in as{" "}
            <span className="text-base">
              {session?.user?.name?.split(" ")[0] || session?.user?.name}
            </span>
          </span>
        ) : (
          <span>Not Signed in</span>
        )}
      </div>
    </div>
  );
};

export default Profile;
