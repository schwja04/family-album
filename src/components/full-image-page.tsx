import { getImageById } from "~/server/db/queries";

export default async function FullPageImageView(props: {
    id: number;
}) {
    // Fetch the image from the database using the id
    const image = await getImageById(props.id);

    return <img src={image.url} alt={image.name} className="w-96" />;
}