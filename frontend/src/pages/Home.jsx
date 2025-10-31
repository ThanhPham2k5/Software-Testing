import { useEffect } from "react";
import "../styles/pages/Home.css";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    document.title = "Home | Flogin";
  }, []);

  return (
    <>
      <div className="home">
        <div className="header">
          <Link to={"/"} className="brand">
            <div className="brand-logo">
              <img src="/logo.svg" alt="logo" className="logo" />
            </div>
            <div className="brand-name">gin</div>
          </Link>

          <Link to={"/login"} className="signin">
            <div className="signin-ico">
              <img src="/ico.svg" alt="ico" className="ico" />
            </div>
            <div className="signin-name">Sign in</div>
          </Link>
        </div>

        <div className="body">
          <div className="intro">
            <div className="intro-main-slogan">Open Your World</div>
            <div className="intro-sub-slogan">
              Discover stories, knowledge, and inspiration — one page at a time
            </div>
            <Link to={"/login"} className="intro-button">
              <div className="intro-button-name">Get Started</div>
            </Link>
          </div>

          <div className="picture">
            <img src="/img.svg" alt="img" className="picture-img" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
