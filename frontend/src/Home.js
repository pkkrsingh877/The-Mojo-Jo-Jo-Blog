import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
    const title = "All Blogs";
    const { data, isPending, error } = useFetch('https://the-mojo-jo-jo-blog.prabhatkumar123.repl.co/');

    return (
        <div className="home">
            {error && <p>{error}</p>}
            {isPending && <p>Loding Data... </p>}
            {data && <BlogList blogs={data} title={title} />}
        </div>
    );
}

export default Home;