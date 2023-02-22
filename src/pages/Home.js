import home from "../md/home.md";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Home = () => {
  return (
    <>
      <ReactMarkdown className="md">{home}</ReactMarkdown>
      <p>
        <Link
          to={"/wallet"}
          className="btn"
          onClick={() => {
            window.scroll({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          Connect with Akord Wallet
        </Link>
      </p>
    </>
  );
};

export default Home;
