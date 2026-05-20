import { eq, ilike, desc } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

export const getBlogs = async (title?: string) => {
  return db.query.blogs.findMany({
    where: title
      ? (table, { ilike }) =>
          ilike(table.title, `%${title}%`)
      : undefined,
    orderBy: (table, { desc }) => [
      desc(table.likes),
    ],
  })

}

export const addBlog = async (content: string, author: string, title: string, url: string, likes: number) => {
  await db.insert(blogs).values({author, title, url, likes, content})
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const increaseLikes = async (id: number) => {
  const blog = await getBlogById(id)
  if (blog) {
    await db
      .update(blogs)
      .set({likes: blog.likes+1})
      .where(eq(blogs.id, id))
  }
}