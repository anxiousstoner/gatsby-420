import React from "react";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import kebabCase from "lodash/kebabCase";

import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Bodytext from "../components/Article/Bodytext";

import Cardslist from "../components/Card/Cardslist";
import Categories from "../components/Blog/Categories";

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

import FacebookProvider, { Comments as FBComments } from "react-facebook";

import config from "../../content/meta/config";

export default ({ data }) => {
  const post = data.prismicBlogPost;
  const facebook = data.site.siteMetadata.facebook;
  const url = config.siteUrl + config.pathPrefix + "/" + post.uid;

  const iconSize = 36;
  const filter = count => (count > 0 ? count : "");

  const postList = data.allPrismicBlogPost;

  let categories = false;
  if (post.data.categories.length > 0 && post.data.categories[0].category) {
    categories = post.data.categories.map(c => c.category.document[0].data.name);
  }

  // Filter posts here since Gatsby 1.9 GraphQL issue
  // https://github.com/gatsbyjs/gatsby/issues/4799
  // https://github.com/gatsbyjs/gatsby/pull/6315
  // https://github.com/gatsbyjs/gatsby/pull/8294
  const morePosts = postList.edges
    .filter(edge => edge.node.id !== data.prismicBlogPost.id)
    .filter(
      edge =>
        categories
          ? edge.node.data.categories.length > 0 &&
            edge.node.data.categories.some(c => c.category.document[0].data.name === categories[0])
          : true
    )
    .slice(0, 3);

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
              <div className="metaInfo">
                {post.last_publication_date}
                {post.data.author && " | " + post.data.author.document[0].data.name}
                {categories && " | "}
                {categories && <Categories categories={categories} theme={theme} />}
              </div>
              <img src={post.data.image.url} />
            </header>
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
            <br />
            <MailchimpForm theme={theme} />
            <br />
            <br />
            <h1>
              Latest Blogs{categories && ` from `}
              {categories && (
                <Link
                  to={`/categories/${kebabCase(categories[0])}`}
                  style={{ color: theme.color.neutral.blue }}
                >
                  {categories[0]}
                </Link>
              )}:
            </h1>
            <br />
            <Cardslist>
              {morePosts.map(({ node }, index) => {
                let pCategories = false;
                if (node.data.categories.length > 0 && node.data.categories[0].category) {
                  pCategories = node.data.categories.map(c => c.category.document[0].data.name);
                }

                return (
                  <div key={index}>
                    <Link to={"/" + node.uid}>
                      <div className="card">
                        <img src={node.data.image.url} alt={node.data.title.text} />
                        <div className="text">
                          <h2 className="heading">{node.data.title.text}</h2>
                          <div className="metaInfo">
                            {node.last_publication_date}
                            {node.data.author && " | " + node.data.author.document[0].data.name}
                            {pCategories && " | "}
                            {pCategories && <Categories categories={pCategories} theme={theme} />}
                          </div>

                          <p className="meta">{node.data.excerpt.text}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </Cardslist>

            <div id="post-comments" className="comments">
              <FacebookProvider appId={facebook.appId}>
                <FBComments
                  href={`${config.siteUrl}${post.uid}`}
                  width="100%"
                  colorscheme="light"
                />
              </FacebookProvider>
            </div>

            <style jsx>{`
              img {
                min-width: 100%;
                max-width: 100%;
                max-height: 400px;
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

              .metaInfo {
                margin-top: -${theme.space.inset.m};
                margin-bottom: ${theme.space.inset.m};
              }

              @from-width tablet {
                .share {
                  flex-direction: row;
                  margin: ${theme.space.inset.l};
                }
                .label {
                  margin: ${theme.space.inline.m};
                }
              }

              .card {
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                transition: 0.3s;
                border-radius: 5px;

                .metaInfo {
                  margin-top: 10px;
                  margin-bottom: 0;
                }

                :global(img) {
                  min-width: 100%;
                  max-width: 100%;
                  min-height: 180px;
                  max-height: 180px;
                }
              }

              .text {
                padding: 0.7em;
              }

              @from-width desktop {
                .card {
                  background: white;
                  margin: 10px;
                  display: flex;
                  align-items: center;
                  border-radius: 20px;
                  width: 100%;

                  img {
                    width: 300px;
                    min-width: 300px;
                    height: 225px;
                    min-height: 225px;
                    border-radius: 20px;
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                    object-fit: cover;
                  }
                  .text {
                    padding: 0 0.7em;

                    h2 {
                      margin-top: 0;
                    }
                  }
                  .metaInfo {
                    opacity: 0.7;
                    font-size: 0.9rem;
                    margin-top: 10px;
                    margin-bottom: 0;
                  }
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

                @media (hover: hover) {
                  :global(.card:hover) {
                    -webkit-transform: scale(1.1);
                    -ms-transform: scale(1.1);
                    transform: scale(1.1);
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
  query BlogPostbyUIDQuery($slug: String!) {
    prismicBlogPost(uid: { eq: $slug }) {
      id
      uid
      last_publication_date(formatString: "MM/DD/YYYY")
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
        author {
          document {
            data {
              name
            }
          }
        }
        categories {
          category {
            document {
              data {
                name
              }
            }
          }
        }
      }
    }
    allPrismicBlogPost(sort: { fields: [last_publication_date], order: DESC }) {
      edges {
        node {
          id
          uid
          last_publication_date(formatString: "MM/DD/YYYY")
          data {
            title {
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
            author {
              document {
                data {
                  name
                }
              }
            }
            categories {
              category {
                document {
                  data {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
