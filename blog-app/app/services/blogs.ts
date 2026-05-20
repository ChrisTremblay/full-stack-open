const blogs = [
    { id: 1, author: "Chris", title: "The best blog", url:"https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs/chapter-2", likes:20, content:"This is the best blog ever created" },
    { id: 2, author: "Martin", title: "How to write a bad blog", url:"https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs/chapter-1", likes:0, content:"Copy Chris" },
    { id: 3, author: "Sarah", title: "Let's end blogs forever", url:"https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs/chapter-3", likes:10000, content:"Who ready blog nowadays anyways, there's no ways" },
]

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const addBlog = (content: string, author: string, title: string, url: string, likes: number) => {
  blogs.push({ id: nextId++, author, title, url, likes, content })
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}

export const increaseLikes = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id)
  if (blog) {
    blog.likes = blog.likes + 1
  }
}