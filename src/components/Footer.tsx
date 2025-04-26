
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div style={{ backgroundColor: '#f0f0f0' }}>
      <div className="footer jumbotron-footer">
        <div className="container py-5 pb-0 text-center text-lg-start">
          <div className="row border-down">
            {/* Left Section */}
            <div className="col-md-5 mb-3">
              <h3 className="footer-h">Chic & Sleek</h3>
              <div className="d-flex">
                <i className="fa fa-info-circle"></i>
                <p className="pe-md-5 pe-0 address">
                  Your one-stop destination for personalized skin care product
                  recommendations and connecting with local skin care experts.
                  Discover the best products and services tailored just for you.
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-md-7">
              <div className="row">
                <div className="col-12">
                  <h2 className="h5 footer-h">Important Links</h2>
                </div>
                <div className="col-md-4">
                  <ul className="list-unstyled b-li">
                    <li className="mb-3">
                      <Link
                        to="https://www.skincancer.org"
                        style={{ color: '#9E99FE' }}
                      >
                        Skin Cancer Foundation
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to="https://www.aad.org"
                        style={{ color: '#9E99FE' }}
                      >
                        American Academy of Dermatology
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to="https://www.mayoclinic.org"
                        style={{ color: '#9E99FE' }}
                      >
                        Mayo Clinic - Skin Care
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <ul className="list-unstyled b-li">
                    <li className="mb-3">
                      <Link
                        to="https://www.dermstore.com"
                        style={{ color: '#9E99FE' }}
                      >
                        Dermstore
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to="https://www.paulaschoice.com"
                        style={{ color: '#9E99FE' }}
                      >
                        Paula's Choice
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to="https://www.sephora.com/skincare"
                        style={{ color: '#9E99FE' }}
                      >
                        Sephora Skincare
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <ul className="list-unstyled b-li">
                    <li className="mb-3">
                      <Link
                        to="https://www.goodhousekeeping.com/beauty-products/skincare"
                        style={{ color: '#9E99FE' }}
                      >
                        Good Housekeeping - Skincare
                      </Link>
                    </li>
                    <li className="mb-3">
                      <Link
                        to="https://www.skinstore.com"
                        style={{ color: '#9E99FE' }}
                      >
                        SkinStore
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="d-flex justify-content-between mt-4 pt-4">
            <p className="mb-0">© {new Date().getFullYear()} All Rights Reserved</p>
            <p className="mb-0">Created by @Pragati Yadav</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
