
type ProductCardProps = {
    imgSrc: string;
    title: string;
    price: string;
    preferredFor: string;
    };

const ProductCard = ({ imgSrc, title, price, preferredFor } : ProductCardProps) => (
    <div className="col-md-3">
      <div className="card h-100 shadow">
        <img src={imgSrc} className="card-img-top small-card-img" alt={title} />
        <div className="card-body small-card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-details">Price: {price}</p>
          <p className="card-details">Preferred for: {preferredFor}</p>
          <button className="btn btn-outline-primary btn-sm card-view-btn minimal-btn">View Now</button>
        </div>
      </div>
    </div>
  );

export default ProductCard
