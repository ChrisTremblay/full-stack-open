import { eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

export const getBlogs = async (title?: string) => {
  const where =
    title
      ? (blogs, { ilike }) =>
          ilike(blogs.title, `%${title}%`)
      : undefined
  return db.query.blogs.findMany({
    where,
    orderBy: (blogs, { desc }) => [
      desc(blogs.likes),
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