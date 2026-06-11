import { db } from "../../db"
import { eq } from "drizzle-orm"
import { users } from "../../db/schema"
import { blogs } from "../../db/schema"

export const getUsers = async () => {
  return db.query.users.findMany()
}

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
  })
}

export const getBlogsByUsername = async (username: string) => {
  const user = await getUserByUsername(username)
  if (!user) return []
  return db.query.blogs.findMany({
    where: eq(blogs.userId, user.id),
  })
}
export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  })
}