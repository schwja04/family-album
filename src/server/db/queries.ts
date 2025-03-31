import "server-only";
import { db } from ".";
import { auth } from "@clerk/nextjs/server";
import { albumImages, albums, images } from "./schema";
import { and, eq } from "drizzle-orm";

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
}

export async function getMyAlbums() {
    const user = await auth();

    if (!user.userId) throw new Error("Unauthorized");

    // Fetch albums with their cover image
    const results = await db.select({
        id: albums.id,
        title: albums.title,
        description: albums.description,
        userId: albums.userId,
        coverImage: {
            id: images.id,
            url: images.url,
            name: images.name,
            userId: images.userId,
            createdAt: images.createdAt,
            updatedAt: images.updatedAt,
        },
        createdAt: albums.createdAt,
        updatedAt: albums.updatedAt,
    })
        .from(albums)
        .leftJoin(images, and(
            eq(albums.coverImageId, images.id),
            eq(albums.userId, images.userId)
        )) // Join with images to get the cover image
        .where(eq(albums.userId, user.userId));

    return results;
}

export async function getAlbumById(id: number) {
    const user = await auth();

    if (!user.userId) throw new Error("Unauthorized");

    // Fetch album with its cover image
    const result = await db.select({
        id: albums.id,
        title: albums.title,
        description: albums.description,
        userId: albums.userId,
        coverImage: {
            id: images.id,
            url: images.url,
            name: images.name,
            userId: images.userId,
            createdAt: images.createdAt,
            updatedAt: images.updatedAt,
        },
        createdAt: albums.createdAt,
        updatedAt: albums.updatedAt,
    })
        .from(albums)
        .leftJoin(images, and(
            eq(albums.coverImageId, images.id),
            eq(albums.userId, images.userId)
        ))
        .where(and(
            eq(albums.id, id),
            eq(albums.userId, user.userId)
        ));


    if (!result) throw new Error("Album not found or unauthorized");

    if (result.length === 0) {
        // If no album is found, return null
        return null;
    }

    return result[0];
}

export async function getAlbumWithImagesById(id: number) {
    const album = await getAlbumById(id);

    if (!album) return null;

    // Fetch images in the album
    const results = await db.select({
        id: images.id,
        url: images.url,
        name: images.name,
        userId: images.userId,
        createdAt: images.createdAt,
        updatedAt: images.updatedAt,
    }).from(images)
        .innerJoin(albumImages, and(
            eq(albumImages.imageId, images.id),
            eq(albumImages.albumId, id), // Ensure the image belongs to the same user as the album
        ))
        .where(eq(images.userId, album.userId)); // Ensure the images belong to the same user as the album

    return Object.assign({}, album, {
        images: results
    });
}