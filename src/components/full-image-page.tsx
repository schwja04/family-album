import { getImageById } from "~/server/db/queries";

export default async function FullPageImageView(props: {
    id: number;
}) {
    // Fetch the image from the database using the id
    const image = await getImageById(props.id);

    return (
        <div className="flex w-full h-full min-w-0">
            <div className="flex-shrink flex justify-center items-center">
                <img src={image.url} alt={image.name} className="flex-shrink object-contain" />
            </div>
            <div className="flex flex-col w-48 flex-shrink-0">
                <div className="text-xl font-bold">{image.name}</div>
            </div>
        </div>);
}