// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { desc, sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `family-album_${name}`);

export const images = createTable(
  "image",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }).notNull(),
    url: d.varchar({ length: 1024 }).notNull(),

    userId: d.varchar({ length: 256 }).notNull(),

    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)]
);

export const albums = createTable(
  "album",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    title: d.varchar({ length: 256 }).notNull(),
    description: d.varchar({ length: 1024 }).default("").notNull(),
    coverImageId: d.integer().references(() => images.id), // Foreign key to images
    userId: d.varchar({ length: 256 }).notNull(), // Owner of the album
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("title_idx").on(t.title), // Index on title for faster search
    index("user_album_idx").on(t.userId), // Index on userId for faster lookups by user
  ]
)

export const albumImages = createTable(
  "album_image",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    albumId: d.integer().references(() => albums.id).notNull(), // Foreign key to albums
    imageId: d.integer().references(() => images.id).notNull(), // Foreign key to images
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [
    index("album_image_idx").on(t.albumId), // Index on albumId for faster lookups
    index("image_album_idx").on(t.imageId), // Index on imageId for faster lookups
  ]
);