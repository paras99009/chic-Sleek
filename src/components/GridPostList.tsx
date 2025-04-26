import { Models } from 'appwrite';
import { Link } from 'react-router-dom';
import CardStats from './CardStats';
import { useUserContext } from '../context/AuthContext';

type Products = {
  $id: string;
  name: string;
  skinType: string[];
  productUrl: string;
  price: string;
  imageUrl: string;
  tags?: string[];
};
 

type GridPostListProps = {
  post: (Products | Models.Document)[],
  showUser?: boolean,
  showStats?: boolean
}

function GridPostList({ post, showStats = true }: GridPostListProps) {
  const { user } = useUserContext();



  
    return (
      <ul className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4" style={{ listStyle: "none", padding: 0 }}>
        {post.map((postItem, index) => (
          <li className="col" key={index}>
            <div
              className="card h-100 border-1 rounded-4 shadow-md transition d-flex flex-column"
              style={{
                transition: "transform 0.3s ease",
                cursor: "pointer",
                minHeight: "400px", // Ensure consistent card height
                overflow: "hidden",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {/* Image */}
              {postItem.imageUrl && (
                <img
                  src={postItem.imageUrl.replace("preview", "view")}
                  className="card-img-top rounded-top"
                  alt={postItem.name}
                  style={{
                    height: "200px", // Fixed height for images
                    objectFit: 'contain', // Change to 'contain' if you want to avoid cropping
      
                  }}
                />
              )}
  
              {/* Card Body */}
              <div className="card-body d-flex flex-column h-100">
                {/* Name */}
                <h5 className="card-title text-truncate" style={{ maxWidth: "100%" }}>
                  {postItem.name}
                </h5>
  
                <div className="d-flex flex-wrap gap-1 mb-2">
                  {postItem.tags &&
                    postItem.tags.map((tag: string, i: number) => (
                      <span key={i} className="badge bg-light text-dark mb-2">
                        #{tag}
                      </span>
                    ))}
                </div>
  
                {/* Price */}
                <h6 className="card-subtitle mb-2 text-muted">Price: ₹{postItem.price}</h6>
  
                {/* Skin Type */}
                <div className="d-flex flex-wrap gap-1 mb-2">
                  Skin Type:
                  {postItem.skinType &&
                    postItem.skinType.map((type: string, i: number) => (
                      <span key={i} className="badge bg-light text-dark border mb-2">
                        {type}
                      </span>
                    ))}
                </div>
  
                {/* Push below to bottom */}
                <div className="mt-auto d-flex justify-content-between align-items-center">
                {showStats && 'likes' in postItem && <CardStats userId={user.id} post={postItem} />}

                  <Link
                    to={postItem.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm"
                    style={{ backgroundColor: "#9E99FE", color: "white" }}
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  

export default GridPostList;
