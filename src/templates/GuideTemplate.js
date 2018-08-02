import React from "react";
import { Link } from "react-router-dom";

import Button from "antd/lib/button";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Bodytext from "../components/Article/Bodytext";

export default ({ data }) => {
  const post = data.prismicGuide;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header className="header">
              <Headline title={post.data.title.text} theme={theme} />
              <div className="icon">
                <img src={post.data.icon.url} alt={post.data.title.text} />
              </div>
            </header>
            <Bodytext theme={theme} html={post.data.excerpt.html} />

            <div className="list">
              {data.allPrismicReview.edges.map(({ node }, index) => (
                <div key={index}>
                  <div className="card-middle">
                    <h1 className="feature-number">{index + 1}</h1>
                    <div className="image-middle-card">
                      <img src={node.data.image.url} />
                    </div>
                    <div className="details-middle">
                      <h2 className="featured-title-middle">{node.data.item_name.text}</h2>
                      <p className="rating-middle">
                        <b>{node.data.rating} out of 5</b>
                      </p>
                      <p className="rating-summary">{node.data.excerpt.text}</p>
                    </div>
                    <div className="buttons-middle-block">
                      <div className="button-middle">
                        <Button href={"/" + node.uid}>More Info</Button>
                      </div>
                      <div className="button-middle">
                        <Button href={node.data.url.url}>Visit Now</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Bodytext theme={theme} html={post.data.review.html} />

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
              }

              .feature-number {
                padding: 50px;
                font-size: 50px;
                background: #048208;
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
              }

              .button-middle {
                margin-top: 15px;
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
    prismicGuide(uid: { eq: $slug }) {
      id
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
