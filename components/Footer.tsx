import { logout } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function Footer({ user, type = "desktop" }: FooterProps) {
  const router = useRouter();
  const handleLogout = async () => {
    const loggedOut = await logout();
    if (loggedOut) {
      router.push("/sign-in");
    }
  };
  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user?.firstName[0]}</p>
      </div>
      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate font-normal text-gray-800">
          {user?.firstName}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user?.email}
        </p>
      </div>
      <div className="footer_image" onClick={handleLogout}>
        <Image src={"icons/logout.svg"} fill alt="logo" />
      </div>
    </footer>
  );
}

export default Footer;
