import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { Button } from "./ui/button";

const NavBar = () => {
  return (
    <header className="shadow-sm">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Link href={"/"} className="flex items-center gap-3">
          <Image src={logo} alt="Job blog" height={40} width={40} />
          <span className="text-xl font-bold tracking-tight">Job Blog</span>
        </Link>
        <Button asChild>
          {/*  asChild make as to style like button but in html it take what's inside  */}
          <Link href="/jobs/new">Post a job</Link>
        </Button>
      </nav>
    </header>
  );
};

export default NavBar;
