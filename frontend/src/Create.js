import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ author, setAuthor ] = useState('');
    const [ isPending, setIsPending ] = useState(false);
    const [ error, setError ] = useState('');
    const navigate = useNavigate();
    // Some change
    const handleSubmit = async (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        try {
            setIsPending(true);
            const response = await fetch('https://the-mojo-jo-jo-blog.prabhatkumar123.repl.co/create',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(blog)
            });
            if(!response.ok){
                throw new Error('Data could not be saved!');
            }
            setIsPending(false);
            navigate('/');
        } catch (error) {
            setIsPending(false);
            setError(error);
            navigate('/error');
        } 
    }
    return (
        <form className='create' onSubmit={handleSubmit}>
            <h2>Add Blog</h2>
            {/* Title */}
            <label>Title:</label>
            <input type="text" 
            value={title} 
            onChange = {(e) => setTitle(e.target.value)}
            required />
            {/* Body */}
            <label>Body:</label>
            <textarea 
            value={body} 
            onChange = {(e) => setBody(e.target.value)}
            required></textarea>
            {/* Author */}
            <label>Author:</label>
            <input type="text" 
            value={author}
            onChange = {(e) => setAuthor(e.target.value)}
            required />
            {!isPending && <button type="submit">Create
            </button>}
            {!error && isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
        </form>
    );
}

export default Create;