import { getImageById } from "~/server/db/queries";

export default async function PhotoModal({
    params: { id: imageId },
}: {
    params: { id: string };
}) {
    const idAsNumber = Number(imageId);
    if (isNaN(idAsNumber)) throw new Error("Invalid image ID");

    // Fetch the image from the database using the id
    const image = await getImageById(idAsNumber);

    return (
        <div>
            <img src={image.url} alt={image.name} className="w-96" />
        </div>
    );
}