import { getBlogs } from "../services/blogs"
import Link from "next/link"

const Blogs = async({
  searchParams,
}:{
  searchParams: Promise<{title?: string}>
}) => {

  const { title } = await searchParams
  const blogs = getBlogs()
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  const filteredBlogs = title
    ? sortedBlogs.filter((blog) => blog.title.toLowerCase().includes(title.toLowerCase()))
    : sortedBlogs

  return (
    <div>
      <h2>Blogs</h2>
        <form>
          <input
            type="text"
            name="title"
            placeholder="Search blogs..."
            defaultValue={title || ""}
          />
          <button type="submit">Search</button>
        </form>
      <ul>
        {filteredBlogs.map(blog => (
            <div key={blog.id}>
                <h3>{blog.title} - by {blog.author}</h3>
                <a href={blog.url}>Link to original post</a>
                <p>{blog.content}</p>
                <p><em>{blog.likes} people liked this blog</em></p>
                <Link href={`/blogs/${blog.id}`}>Link to blog page</Link>
            </div>
        ))}
      </ul>
    </div>
  )
}
export default Blogs