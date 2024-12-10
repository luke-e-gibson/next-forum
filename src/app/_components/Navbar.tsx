"use client"

import Link from "next/link";
import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-between bg-indigo-500 p-6">
      <div className="mr-6 flex flex-shrink-0 items-center text-white">
        <span className="text-xl font-semibold tracking-tight">Forum</span>
      </div>
      <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
        <div className="text-sm lg:flex-grow">
          <Link
            href="/"
            className="mr-4 mt-4 block text-white hover:text-indigo-200 lg:mt-0 lg:inline-block"
          >
            Home
          </Link>
        </div>
        <div className="">
          <Suspense>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </Suspense>
          <Suspense>
            <SignedIn>
              <SignOutButton />
            </SignedIn>
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
