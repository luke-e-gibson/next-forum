import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"; 

export const subfourm = pgTable("subfourm", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const subfourm_post = pgTable("subfourm_post", {
  id: serial("id").primaryKey(),
  subfourm_id: integer("subfourm_id").notNull().references(() => subfourm.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const post_comment = pgTable("post_comment", {
  id: serial("id").primaryKey(),
  post_id: integer("post_id").notNull().references(() => subfourm_post.id),
  comment: text("comment").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});