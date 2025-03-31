import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/db/queries";
import { Gallery } from "./_components/gallery";

export const dynamic = "force-dynamic";

async function MyImageGallery() {
  const images = await getMyImages();

  return <Gallery images={images} />;
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-2xl">Please sign in</div>
      </SignedOut>
      <SignedIn>
        <MyImageGallery />
      </SignedIn>
    </main>
  );
}
