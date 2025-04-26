

const AboutUs = () => {
  return (
    <div className="container py-5">
      {/* Heading Section */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="fw-bold">About Us</h1>
          <hr className="mt-3 mx-auto" style={{ width: "60px", height: "3px", backgroundColor: "#333" }} />
        </div>
      </div>

      {/* Skin Problems Section */}
       {/* Skin Problems Section */}
       <div className="row align-items-center mb-5">
        <div className="col-lg-6">
          <p className="fs-5" style={{ lineHeight: "1.8" }}>
            In today's fast-paced world, skin problems have become increasingly common. Pollution, stress, and the
            overwhelming variety of skincare products in the market make it challenging for individuals to find the
            right solutions for their unique skin needs. Many people end up using products that are either ineffective
            or harmful to their skin due to a lack of proper guidance and understanding of their skin type. This is why
            we created this platform – to simplify skincare for everyone and provide tailored solutions to your skin
            concerns.
          </p>
        </div>
        <div className="col-lg-6 text-center">
          <img
            src={"https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=600"}
            alt="About us"
            className="img-fluid rounded shadow"
            width={400}
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="row">
        <div className="col-12">
          <h2 className="fw-bold mb-4">What We Offer</h2>
          <p className="fs-5" style={{ lineHeight: "1.8" }}>
            Our website is designed to provide a comprehensive solution for all your skincare needs. Here's what makes
            us stand out:
          </p>
          <ul className="fs-5" style={{ lineHeight: "1.8" }}>
            <li><strong>Nearby Dermatologists:</strong> Find trusted dermatologists in your area with our easy-to-use map-based interface.</li>
            <li><strong>Explore Products:</strong> Browse a wide variety of skincare products tailored to different skin types and concerns.</li>
            <li><strong>Skin Type Filtering:</strong> Use our skin type filters to discover products that are best suited for your unique skin needs.</li>
            <li><strong>AI Skin Care Assistant:</strong> Get personalized skincare tips and advice directly from our AI-powered assistant.</li>
            <li><strong>Skin Type Test:</strong> Take a quick and simple skin type test to understand your skin better and get accurate recommendations.</li>
          </ul>
          <p className="fs-5" style={{ lineHeight: "1.8" }}>
            Whether you're looking for professional advice, the perfect product, or simply want to learn more about how
            to care for your skin, our platform is here to help. Join us on this journey to healthier, happier skin!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
