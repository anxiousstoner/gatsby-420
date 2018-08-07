import React from "react";
import { Link } from "react-router-dom";

import Helmet from "react-helmet";

import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Bodytext from "../components/Article/Bodytext";
import Button from "antd/lib/button";
import FaThumbsup from "react-icons/lib/fa/thumbs-up";
import FaThumbsdown from "react-icons/lib/fa/thumbs-down";

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

import "antd/lib/button/style/index.css";

import config from "../../content/meta/config";

export default ({ data }) => {
  const post = data.prismicReview;
  const facebook = data.site.siteMetadata.facebook;

  const url = config.siteUrl + config.pathPrefix + "/" + post.uid;

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
        <meta name="description" content={post.data.excerpt.text} />
        {/* OpenGraph tags */}
        <meta property="og:url" content={post.data.uid} />
        <meta property="og:title" content={post.data.title.text + " | 420Smokers.us"} />
        <meta property="og:description" content={post.data.excerpt.text} />
        <meta property="og:image" content={post.data.image.url} />
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
            <header>
              <Headline title={post.data.title.text} theme={theme} />
            </header>
            <div className="highlight" itemScope itemType="http://schema.org/Product">
              <div className="image">
                <img itemProp="image" src={post.data.image.url} alt={post.data.title.text} />
              </div>
              <div className="col1">
                <p itemProp="name">
                  <b>{post.data.item_name.text} </b>
                </p>
                <p
                  className="rating"
                  itemProp="aggregateRating"
                  itemScope
                  itemType="http://schema.org/AggregateRating"
                >
                  <span itemProp="ratingValue">{post.data.rating}</span> out of 5
                </p>
                <p itemProp="description">{post.data.excerpt.text}</p>
                <div
                  className="order-button"
                  itemProp="offers"
                  itemScope
                  itemType="http://schema.org/Offer"
                >
                  <h6 className="best-price">
                    Best Price:{" "}
                    <span className="price" itemProp="priceCurrency" content="USD">
                      $
                    </span>
                    <span className="price" itemProp="price" content={post.data.price}>
                      {post.data.price}
                    </span>
                    <p itemProp="availability">In Stock</p>
                  </h6>
                  <Button type="primary" href={post.data.url.url}>
                    {post.data.button_text.text}
                  </Button>
                </div>
              </div>
            </div>
            <div className="pros-cons">
              <div className="pros">
                <p className="thumbs">
                  <span>
                    <FaThumbsup />
                  </span>Pros
                </p>
                <div dangerouslySetInnerHTML={{ __html: post.data.pros.html }} />
              </div>
              <div className="cons">
                <p className="thumbs">
                  <span>
                    <FaThumbsdown />
                  </span>Cons
                </p>
                <div dangerouslySetInnerHTML={{ __html: post.data.cons.html }} />
              </div>
            </div>
            <br />
            <hr />
            <Bodytext theme={theme} html={post.data.body.html} />
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
              .highlight {
                padding: 2em;
                margin: 1em;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                transition: 0.3s;
                border-radius: 5px;
                align-self: center;

                :global(img) {
                  min-height: 250px;
                  max-height: 250px;
                  min-width: 250px;
                  max-width: 250px;
                  padding: 15px;
                }
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

              .image {
                width: 100%;
                text-align: center;
              }

              .col1 {
                margin-top: 10px;
                margin-bottom: 10px;
              }

              .rating {
                margin-top: 5px;
                letter-spacing: 0.1em;
                font-size: 0.8em;
                color: #0f610f;
                margin-bottom: 5px;
                font-weight: 700;
              }

              .best-price {
                padding-top: 10px;
              }

              .order-button {
                margin-top: 20px;
                text-align: center;
                display: flex;
                justify-content: space-between;
              }

              .price {
                color: green;
              }

              .pros-cons {
                display: flex;
                justify-content: space-around;
                padding: 1em;
              }

              .pros {
                padding: 1em;
              }

              .cons {
                padding: 1em;
              }

              .thumbs {
                margin-bottom: 15px;
                font-size: 24px;
              }

              @from-width desktop {
                .highlight {
                  display: flex;

                  :global(img) {
                    min-height: 230px !important;
                    max-height: 230px !important;
                    min-width: 200px !important;
                    max-width: 200px !important;
                    padding: 15px;
                  }
                }
              }
            `}</style>
          </Article>
        )}
      </ThemeContext.Consumer>
    </React.Fragment>
  );
};

export const query = graphql`
  query ReviewQuery($slug: String!) {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    prismicReview(uid: { eq: $slug }) {
      uid
      data {
        item_name {
          text
        }
        rating
        price
        image {
          url
        }
        title {
          html
          text
        }

        excerpt {
          html
          text
        }
        body {
          html
          text
        }
        pros {
          html
          text
        }
        cons {
          html
          text
        }
        button_text {
          html
          text
        }
        url {
          url
        }
      }
    }
  }
`;
