import PropTypes from "prop-types";
import React from "react";

import Button from "antd/lib/button";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import { ThemeContext } from "../layouts";
import FaThumbsup from "react-icons/lib/fa/thumbs-up";
import FaThumbsdown from "react-icons/lib/fa/thumbs-down";

import "antd/lib/button/style/index.css";

import Seo from "../components/Seo";

const ProductPage = props => {
  const {
    data: {
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              // Title should come from prismic (product title)
              <Headline title="GoodyBox - This is the Title" theme={theme} />
            </header>
            // Sub-Title should come from prismic (product sub-title)
            <h2>GoodyBox has everything you need monthly - This is the subtitle</h2>
            <br />
            // Excerpt should come from prismic (product excerpt)
            <p>
              {" "}
              This is the excerpt. This is the excerpt. This is the excerpt. This is the excerpt.
              This is the excerpt Dankstop knows that not everyone has wants the same smoking gear
              and so they hand select the best quality smoking gear they can get their hands on,
              from hand blown custom glass pieces, to everyday brands. They also stock cheaper items
              and more expensive pieces for those times you want to splash out!
            </p>
            <div className="showcase">
              // Image should come from prismic (product image)
              <div className="image">
                <img src="http://www.doyougoodybox.com/wp-content/themes/goodybox/images/goodyboxes_03.png" />
              </div>
              <div className="summary-card">
                // Title should come from the first word of the prismic (product title) and then
                append the word 'Summary'
                <h3 className="summary-title">GoodyBox Summary</h3>
                <br />
                <ul>
                  // Summary-List should come from prismic pros list (product pro's list)
                  <li>Stuffed to the brim with cool stuff</li>
                  <li>Stuffed to the brim</li>
                  <li>Stuffed to the brim</li>
                </ul>
                <br />
                // Rating should come from prismic (product rating)
                <p>
                  <b>Our Rating:</b> <span className="rating">4/5</span>
                </p>
                <br />
                <div className="center">
                  // Product url come from prismic (product url)
                  <Button type="primary">Order Now</Button>
                </div>
                <br />
                // Price should come from prismic (product price)
                <p>
                  Cheapest Price: <span className="price">$140</span>
                </p>
              </div>
            </div>
            // Body should come from prismic (product body)
            <h3>The 420 Goody Box is one of the best value for money stoner boxes</h3>
            <p>
              420 Goody Box gets delivered to your door once a month. You get the finest selection
              of smokin’ gear, swag, novelty items, munchies, magazines and way more! The latest
              connoisseur’s goodies packed inside is definitely going to change your smoking
              lifestyle. Handcrafted by the best and most known, this 420 Goody Box contains
              products and supplies from the top indie brands around the globe.
            </p>
            <h3>The 420 Goody Box is one of the best value for money stoner boxes</h3>
            <p>
              420 Goody Box gets delivered to your door once a month. You get the finest selection
              of smokin’ gear, swag, novelty items, munchies, magazines and way more! The latest
              connoisseur’s goodies packed inside is definitely going to change your smoking
              lifestyle. Handcrafted by the best and most known, this 420 Goody Box contains
              products and supplies from the top indie brands around the globe.
            </p>
            <h3>The 420 Goody Box is one of the best value for money stoner boxes</h3>
            <p>
              420 Goody Box gets delivered to your door once a month. You get the finest selection
              of smokin’ gear, swag, novelty items, munchies, magazines and way more! The latest
              connoisseur’s goodies packed inside is definitely going to change your smoking
              lifestyle. Handcrafted by the best and most known, this 420 Goody Box contains
              products and supplies from the top indie brands around the globe.
            </p>
            <br />
            <div className="pros-cons">
              <div className="pros">
                <h2 className="thumbs">
                  <span>
                    <FaThumbsup />
                  </span>Pros
                </h2>
                <ul>
                  // Pro's list should come from prismic (product pros)
                  <li>Stuffed to the brim</li>
                  <li>Stuffed to the brim</li>
                  <li>Stuffed to the brim</li>
                  <li>Stuffed to the brim</li>
                </ul>
              </div>
              <div className="cons">
                <h2 className="thumbs">
                  <span>
                    <FaThumbsdown />
                  </span>Cons
                </h2>
                <ul>
                  // Con's should come from prismic (product cons)
                  <li>Stuffed to the brim</li>
                  <li>Stuffed to the brim</li>
                </ul>
              </div>
            </div>
            // Values previously defined
            <div className="summary-card-bottom">
              <p>
                <b>Our Rating:</b> <span className="rating">4/5</span>
              </p>
              <br />
              <div className="center">
                <Button type="primary">Order Now</Button>
              </div>
            </div>
            {/* --- STYLES --- */}
            <style jsx>{`
              .showcase {
                display: flex;
              }

              .summary-card {
                padding: 2em;
                margin: 1em;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                transition: 0.3s;
                border-radius: 5px;
                align-self: center;
              }

              .summary-card-bottom {
                padding: 2em;
                margin: 1em;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                transition: 0.3s;
                border-radius: 5px;
                align-self: center;
                display: flex;
                justify-content: space-between;
              }

              img {
                width: 100%;
              }

              @from-width tablet {
                .showcase {
                  flex-wrap: wrap;
                }

                .image {
                  max-width: 100%;
                }

                .summary-card {
                  width: 100%;
                }
              }

              @from-width desktop {
                .summary-card {
                  width: 290px;
                }

                .image {
                  max-width: 50%;
                  align-self: center;
                }
              }

              .summary-title {
                text-align: center;
                text-decoration: underline;
                margin: 0;
              }

              h3 {
                margin: 1em;
              }

              .rating {
                color: green;
                font-size: 2em;
                margin: 1em;
              }

              span.price {
                color: red;
                font-size: 1.2em;
                margin: 1.2em;
              }

              .center {
                text-align: center;
              }

              .pros-cons {
                display: flex;
                justify-content: space-around;
              }

              .thumbs {
                margin-bottom: 15px;
              }
            `}</style>
          </Article>
        )}
      </ThemeContext.Consumer>
    </React.Fragment>
  );
};

export default ProductPage;

export const query = graphql`
  query ProductsPageQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
