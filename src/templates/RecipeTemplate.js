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

import ReactStars from "react-stars";

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
  const post = data.prismicRecipe;
  const facebook = data.site.siteMetadata.facebook;
  const nothing = ingredient => {
    if (ingredient === "none") {
      return;
    } else
      return (
        <li itemProp="recipeIngredient">
          {ingredient}
          <style jsx>{`
            li {
              margin: 5px;
            }
          `}</style>;
        </li>
      );
  };
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
              <img src={post.data.image.url} />
            </header>
            <Bodytext theme={theme} html={post.data.body.html} />
            <div className="highlight" itemScope itemType="http://schema.org/Recipe">
              <div className="row">
                <div className="image">
                  <img itemProp="image" src={post.data.image.url} alt={post.data.title.text} />
                </div>
                <div className="col1">
                  <p>
                    <b itemProp="name">{post.data.title.text} </b>
                  </p>
                  By <span itemProp="author">{post.data.author}</span>
                  <ReactStars count={5} edit={false} value={4.5} size={24} color2={"#ffd700"} />,
                  <p itemProp="description">{post.data.excerpt.text}</p>
                  <div className="tags">
                    <h6 className="tag" temprop="recipeCategory">
                      {post.data.category.text}
                    </h6>
                    <h6 className="tag" itemProp="suitableForDiet">
                      {post.data.diet_tags.text}
                    </h6>
                    <h6 className="tag" itemProp="totalTime">
                      {post.data.total_time.text}
                    </h6>
                    <h6 className="tag" itemProp="recipeYield">
                      {post.data.yield.text}
                    </h6>
                  </div>
                </div>
              </div>

              <div className="list">
                <ul>
                  {nothing(post.data.ingredient1)}
                  {nothing(post.data.ingredient2)}
                  {nothing(post.data.ingredient3)}
                  {nothing(post.data.ingredient4)}
                  {nothing(post.data.ingredient5)}
                  {nothing(post.data.ingredient6)}
                  {nothing(post.data.ingredient7)}
                  {nothing(post.data.ingredient8)}
                  {nothing(post.data.ingredient9)}
                  {nothing(post.data.ingredient10)}
                </ul>
              </div>
              <hr />
              <div className="card-body">
                <Bodytext
                  itemprop="recipeInstructions"
                  theme={theme}
                  html={post.data.instructions.html}
                />
              </div>
              <hr />
              <div className="card-body" itemScope itemType="http://schema.org/Review">
                <span itemProp="itemReviewed" itemScope itemType="http://schema.org/Thing">
                  <a itemProp="url" href={url} target="_blank">
                    <span itemProp="name">
                      <strong>{post.data.title.text}</strong>
                    </span>
                  </a>
                </span>

                <p itemProp="description">{post.data.excerpt.text}</p>
                <p itemProp="author" itemScope itemType="http://schema.org/Person">
                  <strong>Written by:</strong> <span itemProp="name">{post.data.author}</span>
                </p>
                <span itemProp="reviewRating" itemScope itemType="http://schema.org/Rating">
                  <meta itemProp="ratingValue" value="4.5" />
                  <meta itemProp="bestRating" value="5" />
                  <ReactStars count={5} edit={false} value={4.5} size={24} color2={"#ffd700"} />,
                </span>
                <span itemProp="publisher" itemScope itemType="http://schema.org/Organization">
                  <meta itemProp="name" content="420Smokers" />
                </span>
              </div>
            </div>

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
              img {
                max-width: 100%;
              }

              .highlight {
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                transition: 0.3s;
                border-radius: 5px;
                align-self: center;

                :global(img) {
                  min-height: 250px;
                  max-height: 300px;
                  min-width: 100%;
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
                margin: 15px;
              }

              .list {
                margin: 25px;
              }

              .tags {
                margin-top: 20px;
                text-align: center;
                display: flex;
                justify-content: space-between;
              }

              .tag {
                border: 0.5px #464545;
                border-style: solid;
                border-radius: 8%;
                padding: 10px;
              }

              .card-body {
                margin: 15px;
                padding-bottom: 2px;
              }

              @from-width desktop {
                .row {
                  display: flex;

                  :global(img) {
                    min-height: 200px !important;
                    min-width: 100% !important;
                    max-width: 200px !important;
                    padding: 0px;
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
  query RecipeQuery($slug: String!) {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    prismicRecipe(uid: { eq: $slug }) {
      uid
      data {
        title {
          html
          text
        }
        excerpt {
          text
        }
        image {
          url
        }
        body {
          html
          text
        }
        keywords {
          html
          text
        }
        category {
          html
          text
        }
        author
        prep_time {
          html
          text
        }
        prep_time {
          text
        }
        cook_time {
          html
          text
        }
        total_time {
          text
        }
        yield {
          html
          text
        }
        diet_tags {
          html
          text
        }
        ingredient1
        ingredient2
        ingredient3
        ingredient4
        ingredient5
        ingredient6
        ingredient7
        ingredient8
        ingredient9
        ingredient10
        instructions {
          html
          text
        }
      }
    }
  }
`;
