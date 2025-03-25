"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/app/utils/uploadthing";

export function TopNav() {
    const router = useRouter();

    return (
        <nav className="flex w-full justify-between items-center p-4 text-xl font-semibold border-b">
            <div>Family Album</div>
            <div className="flex flex-row">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UploadButton endpoint="imageUploader" onClientUploadComplete={() => {
                        router.refresh();
                    }} />
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}