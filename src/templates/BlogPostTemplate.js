import React from "react";
import { Link } from "react-router-dom";

import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Bodytext from "../components/Article/Bodytext";

import Cardslist from "../components/Card/Cardslist";

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

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline title={post.data.title.text} theme={theme} />
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
            <Bodytext theme={theme} html="<h1>Latest Blogs:</h1>" />
            <br />
            <Cardslist>
              {postList.edges.map(({ node }, index) => (
                <div key={index}>
                  <Link to={"/" + node.uid}>
                    <div className="card">
                      <img src={node.data.image.url} alt={node.data.title.text} />
                      <div className="text">
                        <h2 className="heading">{node.data.title.text}</h2>
                        <p className="meta">{node.data.excerpt.text}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
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
                  margin: 5px;
                  width: 223px;
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

                .SocialMediaShareButton {
                  padding: 10px;
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
      data {
        title {
          html
          text
        }
        image {
          url
        }
        body {
          html
          text
        }
      }
    }
    allPrismicBlogPost(limit: 3, sort: { fields: [last_publication_date], order: DESC }) {
      edges {
        node {
          uid
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
