import home from "../md/home.md";
import ReactMarkdown from "react-markdown";

const Home = () => {
  return <ReactMarkdown className="md">{home}</ReactMarkdown>;
};

export default Home;
