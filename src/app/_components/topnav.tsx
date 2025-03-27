import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";

export function TopNav() {
    return (
        <nav className="max-h-1/4 flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
            <div>Family Album</div>
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
    )
}