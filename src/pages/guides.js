
import PropTypes from "prop-types";
import React from "react";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import { ThemeContext } from "../layouts";
import Button from "antd/lib/button";
import FaAngleDown from "react-icons/lib/fa/bolt";

import Link from "gatsby-link";

import "antd/lib/button/style/index.css";

import Seo from "../components/Seo";


const GuidesPage = props => {
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
              <Headline title="All Our Guides To Cannabis Culture" theme={theme} />
            </header>
            <div className="cardslist">
              <Link to="/subscription-boxes">
                <div className="card">
                  <img src="https://source.unsplash.com/random/75x75" alt="" />
                  <h2 className="heading">420 Subscription Box Guide</h2>
                  <p className="meta">Find the best monthly subscription boxes so that you never run out of essentials again</p>
                </div>
              </Link>
              <Link to="/subscription-boxes">
                <div className="card">
                  <img src="https://source.unsplash.com/random/75x75" alt="" />
                  <h2 className="heading">Vapes and Wax Pens Guide</h2>
                  <p className="meta">Learn which vaporizer pen is best for consuming cannabis and wax on the go.</p>
                </div>
              </Link>
              <Link to="/subscription-boxes">
                <div className="card">
                  <img src="https://source.unsplash.com/random/75x75" alt="" />
                  <h2 className="heading">Desktop Vaporizer Guide</h2>
                  <p className="meta">Make sure you read our vape guide before choosing your desktop vaporizor - testing longer height.</p>
                </div>
              </Link>
              <Link to="/subscription-boxes">
                <div className="card">
                  <img src="https://source.unsplash.com/random/75x75" alt="" />
                  <h2 className="heading">Desktop Vaporizer Guide</h2>
                  <p className="meta">Make sure you read our vape guide before choosing your desktop vaporizor.</p>
                </div>
              </Link>
              <Link to="/subscription-boxes">
                <div className="card">
                  <img src="https://source.unsplash.com/random/75x75" alt="" />
                  <h2 className="heading">Desktop Vaporizer Guide</h2>
                  <p className="meta">Make sure you read our vape guide before choosing your desktop vaporizor.</p>
                </div>
              </Link>
            </div>
            {/* --- STYLES --- */}
            <style jsx>{`
              .cardslist {
                text-align:center;

              }

              .card {
                padding: 1em;
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                transition: 0.3s;
                border-radius: 5px;

                :global(img) {
                  fill: ${theme.icon.color};
                  margin:  ${theme.space.default};
                  border: 1px solid ${theme.line.color};
                  border: 1px solid #ecebea;
                  border-radius: 90%;
                  padding: 4px;
                }
              }

              .meta {

              }

              @from-width tablet {
                .cardslist {

                }
              }

              @from-width desktop {

                .cardslist {
                  display: flex;
                  flex-wrap: wrap;
                  align-items: flex-end;
                }

                .card {
                  background: white;
                  margin: 5px;
                  width: 223px;
                }

                @media (hover: hover) {
                  :global(.card:hover) {
                    -webkit-transform: scale(1.2);
                    -ms-transform: scale(1.2);
                    transform: scale(1.2);
                  }

                }
              }
            `}</style>
          </Article>

        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
    </React.Fragment>
  );
};

GuidesPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default GuidesPage;

export const query = graphql`
  query GuidesQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
