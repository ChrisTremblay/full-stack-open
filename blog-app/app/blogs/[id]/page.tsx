import { notFound } from "next/navigation"
import { getBlogById } from "../../services/blogs"
import { incrementLikes } from "../../actions/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div key={blog.id}>
        <h3>{blog.title} - by {blog.author}</h3>
        <a href={blog.url}>Link to original post</a>
        <p>{blog.content}</p>
        <p><em>{blog.likes} people liked this blog</em></p>

        <form action={incrementLikes}>
            <input type="hidden" name="id" value={blog.id} />
            <button type="submit">
                Smash that like button
            </button>
        </form>
    </div>
  )
}

export default BlogPage