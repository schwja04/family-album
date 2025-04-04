import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";
import Link from "next/link";

export function TopNav() {
  return (
    <nav className="flex max-h-1/4 w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>
        <Link href="/" target="_self" className="">
          {" "}
          Family Album
        </Link>
      </div>
      <div className="flex flex-row items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
