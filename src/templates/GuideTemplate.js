import React from "react";
import { Link } from "react-router-dom";

import Helmet from "react-helmet";

import Button from "antd/lib/button";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Bodytext from "../components/Article/Bodytext";

import ReactStars from "react-stars";

import MailchimpForm from "../components/MailchimpForm";

import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon
} from "react-share";

import config from "../../content/meta/config";

export default ({ data }) => {
  const post = data.prismicGuide;

  const url = config.siteUrl + config.pathPrefix + "/" + post.uid;
  const facebook = data.site.siteMetadata.facebook;
  const iconSize = 36;
  const filter = count => (count > 0 ? count : "");

  return (
    <React.Fragment>
      <Helmet
        htmlAttributes={{
          lang: config.siteLanguage,
          prefix: "og: http://ogp.me/ns#"
        }}
      >
        {/* General tags */}
        <title>{post.data.title.text + " | 420Smokers.us"}</title>
        <meta name="description" content={post.data.subtitle.text} />
        {/* OpenGraph tags */}
        <meta property="og:url" content={post.data.uid} />
        <meta property="og:title" content={post.data.title.text + " | 420Smokers.us"} />
        <meta property="og:description" content={post.data.subtitle.text} />
        <meta property="og:image" content={post.data.icon.url} />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content={facebook.appId} />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:creator"
          content={config.authorTwitterAccount ? config.authorTwitterAccount : ""}
        />
      </Helmet>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header className="header">
              <Headline title={post.data.title.text} theme={theme} />
              <div className="icon">
                <img src={post.data.icon.url} alt={post.data.title.text} />
              </div>
            </header>
            <div className=" row  top-list">
              {data.allPrismicReview.edges.slice(0, 3).map(({ node }, index) => (
                <div className="col-md-3" key={index}>
                  <div className="">
                    <div className="image-middle-card">
                      <img src={node.data.image.url} alt={node.data.title.text} />
                    </div>
                    <div className="details-middle">
                      <h3 className="featured-title-middle">{node.data.title.text}</h3>
                      <p className="rating-middle">
                        <ReactStars
                          count={5}
                          edit={false}
                          value={node.data.rating}
                          size={26}
                          color2={"#ffd700"}
                        />
                      </p>

                      <div className="price" itemProp="price" content={node.data.price}>
                        $ {node.data.price}
                      </div>
                    </div>
                    <div className="buttons-middle-block">
                      <div className="button-middle">
                        <a
                          className="button"
                          type="primary"
                          href={node.data.url.url}
                          target="_blank"
                        >
                          Buy Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Bodytext theme={theme} html={post.data.excerpt.html} />
            <MailchimpForm theme={theme} />
            <div className="list">
              {data.allPrismicReview.edges.map(({ node }, index) => (
                <div key={index}>
                  <div className="card-middle">
                    <p className="feature-number">{index + 1}</p>
                    <div className="image-middle-card">
                      <img src={node.data.image.url} alt={node.data.title.text} />
                    </div>
                    <div className="details-middle">
                      <h3 className="featured-title-middle">{node.data.title.text}</h3>
                      <p className="rating-middle">
                        <ReactStars
                          count={5}
                          edit={false}
                          value={node.data.rating}
                          size={22}
                          color2={"#ffd700"}
                        />
                      </p>

                      <div className="price" itemProp="price" content={node.data.price}>
                        $ {node.data.price}
                      </div>
                      <p className="rating-summary">{node.data.excerpt.text}</p>
                    </div>
                    <div className="buttons-middle-block">
                      <div className="button-middle">
                        <a className="button button-info" href={"/" + node.uid}>
                          More Info
                        </a>
                      </div>
                      <div className="button-middle">
                        <a
                          className="button"
                          type="primary"
                          href={node.data.url.url}
                          target="_blank"
                        >
                          Best Offer
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Bodytext theme={theme} html={post.data.review.html} />
            <div className="share">
              <span className="label">SHARE</span>
              <div className="links">
                <TwitterShareButton
                  url={url}
                  title={post.data.title.text}
                  additionalProps={{
                    "aria-label": "Twitter share"
                  }}
                >
                  <TwitterIcon round size={iconSize} />
                </TwitterShareButton>
                <br />
                <GooglePlusShareButton
                  url={url}
                  additionalProps={{
                    "aria-label": "Google share"
                  }}
                >
                  <GooglePlusIcon round size={iconSize} />
                  <GooglePlusShareCount url={url}>
                    {count => <div className="share-count">{filter(count)}</div>}
                  </GooglePlusShareCount>
                </GooglePlusShareButton>
                <br />
                <FacebookShareButton
                  url={url}
                  quote={post.data.title.text}
                  additionalProps={{
                    "aria-label": "Facebook share"
                  }}
                >
                  <FacebookIcon round size={iconSize} />
                  <FacebookShareCount url={url}>
                    {count => <div className="share-count">{filter(count)}</div>}
                  </FacebookShareCount>
                </FacebookShareButton>
                <br />
                <LinkedinShareButton
                  url={url}
                  title={post.data.title.text}
                  description={post.data.title.text}
                  additionalProps={{
                    "aria-label": "LinkedIn share"
                  }}
                >
                  <LinkedinIcon round size={iconSize} />
                  <LinkedinShareCount url={url}>
                    {count => <div className="share-count">{filter(count)}</div>}
                  </LinkedinShareCount>
                </LinkedinShareButton>
              </div>
            </div>
            <style jsx>{`
              .header {
                display: flex;

                :global(img) {
                  max-height: 150px;
                  max-width: 150px;
                  min-height: 75px;
                  padding: 15px;
                  min-width: 100px;
                  max-width: 100px;
                  padding: 22px;
                }
              }

              .icon {
                margin: ${theme.space.default} auto;
                border: 1px solid ${theme.line.color};
                border-radius: 90%;
                padding: 2px;
                min-width: 100px;
                max-width: 100px;
                height: 100px;
                background-color: ${post.data.icon_background};
                box-shadow: 3px 4px 8px 0 rgba(0, 0, 0, 0.2);
                align-items: center;
              }

              .row {
                display: flex;
                flex-wrap: wrap;
              }

              .col-md-3 {
                width: 33%;
              }

              .top-list {
                display: none;
              }

              .list {
                margin-top: 20px;
                margin-bottom: 20px;
              }

              .card-middle {
                padding: 0;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                transition: 0.3s;
                border-radius: 5px;
                align-items: center;
                display: flex;
                flex-wrap: wrap;
                margin: 15px 0;

                :global(img) {
                  max-height: 150px;
                  max-width: 150px;
                  min-width: 150px;
                  min-height: 150px;
                  padding: 15px;
                }
              }

              .image-middle-card {
                margin-left: auto;
              }

              .details-middle {
                padding: 0.5em;
              }

              .buttons-middle-block {
                flex-wrap: wrap;
                display: flex;
                width: 100%;
                justify-content: space-between;
              }

              .share {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }

              .links {
                display: flex;
                flex-direction: row;

                :global(.SocialMediaShareButton) {
                  margin: 0 0.8em;
                  cursor: pointer;
                }
              }

              .label {
                font-size: 1.2em;
                margin: 0 1em 1em;
              }

              .price {
                margin-top: 0.2em;
                color: #5ab200;
                font-weight: 900;
                font-size: 2em;
              }

              @from-width tablet {
                .share {
                  flex-direction: row;
                  margin: ${theme.space.inset.l};
                }
                .label {
                  margin: ${theme.space.inline.m};
                }

                .top-list {
                  display: flex;

                  img {
                    height: 200px;
                    max-width: 100%;
                  }

                  .image-middle-card {
                    text-align: center;
                  }

                  .buttons-middle-block {
                    justify-content: center;
                    margin-top: -25px;
                  }

                  .details-middle {
                    text-align: center;
                  }

                  .rating-middle {
                    max-width: 130px;
                    margin: auto;
                  }

                  .featured-title-middle {
                    min-height: 40px;
                  }
                }
              }

              @from-width desktop {
                .card-middle {
                  display: flex;
                  align-items: center;
                  flex-wrap: nowrap;

                  :global(img) {
                    max-height: 150px;
                    max-width: 150px;
                    min-width: 150px;
                    min-height: 150px;
                    padding: 15px;
                  }
                }
                .image-middle-card {
                  margin-left: 0;
                }

                .feature-number {
                  padding-top: 18% !important;
                  padding-bottom: 18% !important;
                }

                .share {
                  position: fixed;
                  top: 20%;
                  left: 5%;
                  flex-direction: column;
                }

                .share .links {
                  flex-direction: column;
                  margin-top: 20px;
                }

                .buttons-middle-block {
                  justify-content: flex-end;
                }
              }

              .feature-number {
                padding: 50px;
                font-size: 50px;
                background: #5bb300;
                color: white;
              }

              .rating-middle {
                font-size: 14px;
              }

              .rating-summary {
                font-size: 12px;
              }

              .buttons-middle-block {
                padding: 10px;
                min-width: 156px;
              }

              .button-middle {
                margin-top: 15px;
              }

              .button {
                background: #5ab200;
                color: white;
                border-radius: 5px;
                margin-left: 5px;
                letter-spacing: 1px;
                font-weight: 700;
                position: relative;
                border: 0.1px solid #d9d9d9;
                padding: 20px;
                font-size: medium;
                min-width: 150px;
                line-height: 4rem;
              }

              .button-info {
                background: white;
                border: 2px solid #5ab200;
                color: #626262;
              }
            `}</style>
          </Article>
        )}
      </ThemeContext.Consumer>
    </React.Fragment>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    prismicGuide(uid: { eq: $slug }) {
      id
      uid
      data {
        title {
          html
          text
        }
        subtitle {
          html
          text
        }
        excerpt {
          html
          text
        }
        review {
          html
          text
        }
        icon {
          url
        }
        icon_background
      }
    }
    allPrismicReview(
      filter: { tags: { eq: $slug } }
      sort: { fields: [data___rating], order: DESC }
    ) {
      edges {
        node {
          tags
          uid
          data {
            title {
              text
            }
            item_name {
              html
              text
            }
            image {
              url
            }
            excerpt {
              html
              text
            }
            price
            rating
            url {
              url
            }
          }
        }
      }
    }
  }
`;
