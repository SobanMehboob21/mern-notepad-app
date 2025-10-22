import Blog from "../models/blog.models.js";

export const CreateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Fields cannot be empty" });
    }

    // Optionally attach author if user is authenticated
    const author = req.user?.id || null;

    const createBlog = await Blog.create({
      title,
      content,
      author,
    });

    return res.status(201).json({
      message: "Blog created successfully",
      blog: createBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res
      .status(500)
      .json({ message: "Server error while creating blog", error: error.message });
  }
};
export const GetAllBlogs = async (req, res) => {
  try {
    const myBlogs = await Blog.find().populate("author", "username");
    res.status(200).json(myBlogs);
  } catch (error) {
    return res.status(402).json({ message: error.message });
  }
};
