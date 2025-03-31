import { clerkClient } from "@clerk/nextjs/server";
import { deleteImageById, getImageById } from "~/server/db/queries";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export default async function FullPageImageView(props: { id: number }) {
  // Fetch the image from the database using the id
  const image = await getImageById(props.id);

  const client = await clerkClient();
  const uploaderInfo = await client.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex flex-shrink items-center justify-center">
        <img
          src={image.url}
          alt={image.name}
          className="max-h-full flex-shrink object-contain"
        />
      </div>
      <div className="flex w-48 flex-shrink-0 flex-grow flex-col">
        <div className="border-b p-2 text-center text-lg font-bold">
          {image.name}
        </div>

        <div className="flex flex-col p-2">
          <span>Uploaded By:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>

        <div className="flex flex-col p-2">
          <span>Created On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex flex-col p-2">
          <form
            action={async () => {
              "use server";

              await deleteImageById(props.id);
              redirect("/");
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
