import { pgTable, serial, text, integer } from "drizzle-orm/pg-core"

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").notNull().default(0),
})
