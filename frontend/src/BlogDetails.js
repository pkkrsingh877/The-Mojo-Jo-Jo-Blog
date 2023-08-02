import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './useFetch';

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isPending, error } = useFetch(`http://localhost:8000/blogs/${id}`);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/blogs/${id}`,{
                method: 'DELETE'
            });
            if(!response.ok){
                console.log('Could not delete the blog...');
            }else{
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className='blog-details'>
            {isPending && <div>Loading Data...</div>}
            {error && <div> {error} </div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>by {blog.author}</p>
                    <div>{blog.body}</div>
                </article>           
            )}
            <button onClick={handleDelete}>Delete</button>
        </section>
    )
}

export default BlogDetails;