import "server-only";
import { db } from ".";
import { auth } from "@clerk/nextjs/server";

export async function getMyImages() {
    const user = await auth();

    if (!user.userId) throw new Error("Unauthorized");

    const images = await db.query.images.findMany({
        where: (images, { eq }) => eq(images.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.id),
    });
    return images;
}