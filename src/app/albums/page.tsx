import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyAlbums } from "~/server/db/queries";

export const dynamic = "force-dynamic";

function ImageCard({
  image,
}: {
  image: {
    url: string;
    name: string;
    id: number;
  } | null;
}) {
  if (image !== null) {
    return (
      <Image
        src={image.url} // Fallback image if coverImage is not available
        className="h-auto w-48"
        width="192"
        height="192"
        alt={image.name}
      />
    );
  }
  // use a div with a background color as the placeholder
  return (
    <div className="flex h-48 w-48 items-center justify-center bg-gray-200 text-gray-500">
      No Cover Image
    </div>
  );
}

async function Albums() {
  const albums = await getMyAlbums();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      <div className="grid gap-4 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {albums.map((album) => (
          <div key={album.id} className="w-48">
            <Link href={`/albums/${album.id}`}>
              <ImageCard image={album.coverImage} />
            </Link>
            <div>{album.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function AlbumsPage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-2xl">Please sign in</div>
      </SignedOut>
      <SignedIn>
        <Albums />
      </SignedIn>
    </main>
  );
}
