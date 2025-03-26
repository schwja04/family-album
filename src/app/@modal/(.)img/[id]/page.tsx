import { Modal } from "./modal";
import FullPageImageView from "~/components/full-image-page";

export default function ImageModal({
    params: { id: imageId },
}: {
    params: { id: string };
}) {
    const idAsNumber = Number(imageId);
    if (isNaN(idAsNumber)) throw new Error("Invalid image ID");

    return (
        <Modal>
            <FullPageImageView id={idAsNumber} />
        </Modal>
    );
}