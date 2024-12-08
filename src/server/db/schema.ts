import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import exp from "constants";
import { relations } from "drizzle-orm";

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  username: varchar("username").notNull(),
  profilePicture: varchar("profilePictureUrl").notNull(),
});

export const subfourm = pgTable("subfourm", {
  id: serial("id").primaryKey(),
  title: text("title").notNull().unique(),
  description: text("description").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  num_posts: integer("num_posts").notNull().default(0),
});

export const subfourm_post = pgTable("subfourm_post", {
  id: serial("id").primaryKey(),
  subfourm_id: integer("subfourm_id")
    .notNull()
    .references(() => subfourm.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  created_by: integer("created_by")
    .notNull()
    .references(() => profile.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const post_comment = pgTable("post_comment", {
  id: serial("id").primaryKey(),
  post_id: integer("post_id")
    .notNull()
    .references(() => subfourm_post.id),
  title: text("title").notNull(),
  comment: text("comment").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  created_by: integer("created_by").notNull().references(()=> profile.id)
});

export const commentRelations = relations(post_comment, ({ one }) => ({
  profile: one(profile, {
    fields: [post_comment.created_by],
    references: [profile.id],
  })
}))

export const subforumPostRelations = relations(subfourm_post, ({ one }) => ({
  profile: one(profile, {
    fields: [subfourm_post.created_by],
    references: [profile.id],
  })
}));
