import { Link } from "react-router-dom";
import Article from "../Layouts/Article";

export default function NotFound() {
    return <Article><h1>It seems the page you're looking for doesn't exist. Go to the <Link to='/'>home page</Link></h1></Article>;
}