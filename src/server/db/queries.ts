import "server-only";
import { db } from ".";
import { auth } from "@clerk/nextjs/server";
import { images } from "./schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import analyticsServerClient from "../analytics";

export async function getMyImages() {
    const user = await auth();

    if (!user.userId) throw new Error("Unauthorized");

    const images = await db.query.images.findMany({
        where: (images, { eq }) => eq(images.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.id),
    });
    return images;
}

export async function getImageById(id: number) {
    const user = await auth();

    if (!user.userId) throw new Error("Unauthorized");

    const image = await db.query.images.findFirst({
        where: (model, { eq }) => eq(model.id, id),
    });

    if (!image) throw new Error("Image not found");

    if (image.userId !== user.userId) throw new Error("Unauthorized");

    return image;
}

export async function deleteImageById(id: number) {
    const user = await auth();
    if (!user.userId) throw new Error("Unauthorized");

    await db.delete(images)
        .where(and(
            eq(images.id, id),
            eq(images.userId, user.userId) // Ensure the image belongs to the current user
        ));

    analyticsServerClient?.capture({
        distinctId: user.userId,
        event: "delete_image",
        properties: {
            imageId: id,
        }
    });

    redirect("/");
}