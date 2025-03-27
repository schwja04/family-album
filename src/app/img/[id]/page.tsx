import FullPageImageView from "~/components/full-image-page";

export default async function ImagePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const idAsNumber = Number(id);
    if (isNaN(idAsNumber)) throw new Error("Invalid image ID");

    return <FullPageImageView id={idAsNumber} />;
}