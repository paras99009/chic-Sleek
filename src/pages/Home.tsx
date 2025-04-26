import { Link } from "react-router-dom";
import AllSkin from "../_root/home/AllSkin";
import TopFavourite from "../_root/home/TopFavourite";
import TopSuggested from "../_root/home/TopSuggested";

function Home() {
  return (
    <div>
      <div id="skinCareCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1600428853876-fb5a850b444f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2tpbiUyMGNhcmV8ZW58MHx8MHx8fDA%3D"
              className="d-block w-100"
              alt="Skin Care Slide 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://plus.unsplash.com/premium_photo-1682096423780-41ca1b04af68?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block w-100"
              alt="Skin Care Slide 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNraW4lMjBjYXJlfGVufDB8fDB8fHww"
              className="d-block w-100"
              alt="Skin Care Slide 3"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#skinCareCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#skinCareCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* All Products Section */}
      <AllSkin />
      <div className="text-center mt-4">
        <Link to="/explore" className="btn  explore-btn" 
          style={{ backgroundColor: "#9E99FE", color: "white" }}>
          Explore
        </Link>
      </div>

      {/* Services Section */}
      <section className="container my-5">
        <h2 className="section-title">Our Services</h2>
        <div className="row g-4">
          <div className="col-md-3">
          <Link to={"/ai-chat/assistant"} className="text-decoration-none">
            <div className="card h-100 text-center shadow p-3 small-card-body">
              <i className="fas fa-robot service-icon" />
              <h5 className="card-title">A.I Assistant</h5>
              <p className="card-text">Personalized skin care advice powered by AI.</p>
            </div>
            </Link>

          </div>
          <div className="col-md-3">
            <Link to={"/ai-chat/skin-test"} className="text-decoration-none">
           
            <div className="card h-100 text-center shadow p-3 small-card-body">
              <i className="fas fa-microscope service-icon" />
              <h5 className="card-title">Skin Test</h5>
              <p className="card-text">Detailed analysis to understand your skin better.</p>
            </div>
            </Link>
          </div>
          <div className="col-md-3">
          <Link to={"explore"} className="text-decoration-none">
            <div className="card h-100 text-center shadow p-3 small-card-body">
              <i className="fas fa-search service-icon" />
              <h5 className="card-title">Explore Products</h5>
              <p className="card-text">Discover your skin type and suitable products.</p>
            </div>
            </Link>
          </div>
          <div className="col-md-3">
          <Link to={"/nearby"} className="text-decoration-none">
            <div className="card h-100 text-center shadow p-3 small-card-body">
              <i className="fas fa-map-marker-alt service-icon" />
              <h5 className="card-title">Nearby Dermatologists</h5>
              <p className="card-text">Find trusted dermatologists near you.</p>
            </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Suggested Products Section */}
      <section className="container my-5 fade-in-section">
        <h2 className="section-title">Suggested Products</h2>
        <div className="row g-4">
          <TopSuggested />
        </div>
        <div className="text-center mt-4">
          <Link to="/explore" className="btn  explore-btn"   style={{ backgroundColor: "#9E99FE", color: "white" }}>
            Explore
          </Link>
        </div>
      </section>

      {/* Favourite Pickups Section */}
      <section className="container my-5 mb-5 fade-in-section">
        <h2 className="section-title">Favourite Pickups</h2>
        <div className="row g-4">
          <TopFavourite />
        </div>
        <div className="text-center mt-4">
          <Link to="/explore" className="btn explore-btn"   style={{ backgroundColor: "#9E99FE", color: "white" }}>
            Explore
          </Link>
        </div>
      </section>

      {/* Chat Icon */}
      <Link
        to="/ai-chat/assistant"
        className="chat-icon-link"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        <img
          src="/assets/icons/chat.svg"
          alt="Chat Icon"
          style={{
            height: "60px",
            width: "60px",
            borderRadius: "50%",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        />
      </Link>
    </div>
  );
}

export default Home;
