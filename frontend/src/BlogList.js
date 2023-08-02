import { Link } from 'react-router-dom';

const BlogList = ({blogs, title}) => {
    
    return (
    <div className="blog-list">
        <h1 className="title">{title}</h1>
        {
        blogs.map(blog => (
        <div className="blog-preview" key={blog._id}>
            <Link to={`/blogs/${blog._id}`}>
                <h2>
                    {blog.title}
                </h2>
            </Link>
            <p>Written by {blog.author}</p>
        </div>
        ))}
    </div>
    );
}

export default BlogList;