import FullPageImageView from "~/components/full-image-page";

export default function ImagePage({
    params: { id: imageId },
}: {
    params: { id: string };
}) {
    const idAsNumber = Number(imageId);
    if (isNaN(idAsNumber)) throw new Error("Invalid image ID");

    return <FullPageImageView id={idAsNumber} />;
}