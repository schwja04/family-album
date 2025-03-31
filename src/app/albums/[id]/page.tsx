import { getAlbumWithImagesById } from "~/server/db/queries";
import { Gallery } from "~/app/_components/gallery";
import { SignedIn, SignedOut } from "@clerk/nextjs";

async function SingleAlbumGallery(props: { id: number }) {
  const album = await getAlbumWithImagesById(props.id);

  if (!album) {
    return <div>Album not found</div>;
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">{album.title}</h1>
      <p className="mb-4">{album.description}</p>
      <Gallery images={album.images} />
    </div>
  );
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Ensure the ID is a number
  const { id } = await params;
  const idAsNumber = Number(id);
  if (isNaN(idAsNumber)) throw new Error("Invalid album ID");

  // You can also handle loading states or errors here if needed
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-2xl">Please sign in</div>
      </SignedOut>

      <SignedIn>
        <SingleAlbumGallery id={idAsNumber} />
      </SignedIn>
    </main>
  );
}
