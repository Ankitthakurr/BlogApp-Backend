import data from "../RegisterSchema/DataSchema.js";

const BlogCreated = async (req, res) => {
  const { tittle, description } = req.body;
  if (tittle && description && req.params.userId) {
    const createdBlog = await data.create({
      tittle,
      description,
      userId: req.params.userId,
    });
    res.status(200).json(createdBlog);
  } else {
    res.status(400).json({ message: "Fill All the Details" });
  }
};

const BlogReadAll = async (req, res) => {
  if (req.params.userId) {
    try {
      const getBlog = await data.find({ userId: req.params.userId });
      res.status(200).json(getBlog);
    } catch (error) {
      res.status(400).json({ message: "No Blog Found" });
    }
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
};
const BlogUpdate = async (req, res) => {
  const { tittle, description } = req.body;
  if (req.params.blogId) {
    try {
      const updateBlog = await data.findById(req.params.blogId);
      const updatedBlog = await data.findOneAndUpdate(
        { _id: updateBlog._id },
        {
          $set: {
            tittle: tittle,
            description: description,
          },
        },
        { new: true }
      );
      if (updatedBlog) {
        res.status(200).json(updatedBlog);
      } else {
        res.status(400).json({ message: "Not updated" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ message: "No Blog Found" });
  }
};
const BlogDelete =async (req, res) => {
      if(req.params.blogId){
       try {
        const deleteBlog = await data.findByIdAndDelete(req.params.blogId)
        if(deleteBlog){
            res.status(200).json({message : "Blog Deleted"})
        }else{
            res.status(400).json({message : "Internal Server Error"})   
        }
       } catch (error) {
        res.status(400).json({message : "Internal Server Error"})
       }
      }else{
        res.status(400).json({message : "Internal Server Error"})
      }
};

const Blog = {
  BlogCreated,
  BlogDelete,
  BlogReadAll,
  BlogUpdate,
};
export default Blog;
