import React from "react";

import Link from "gatsby-link";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Cardslist from "../components/Card/Cardslist";

import Seo from "../components/Seo";

export default ({ data }) => {
  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <h1 />
              <Headline title="Latest From Our Blog" theme={theme} />
            </header>
            <Cardslist>
              {data.allPrismicBlogPost.edges.map(({ node }, index) => (
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
              <style jsx>{`
                .card {
                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                  transition: 0.3s;
                  border-radius: 5px;

                  :global(img) {
                    min-width: 100%;
                    max-width: 100%;
                    min-height: 270px;
                    max-height: 270px;
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

                    :global(img) {
                      min-width: 100%;
                      max-width: 100%;
                      min-height: 160px;
                      max-height: 160px;
                    }
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
            </Cardslist>
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={data.site.siteMetadata.facebook} />
    </React.Fragment>
  );
};

export const query = graphql`
  query Posts1Query {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    allPrismicBlogPost(sort: { fields: [last_publication_date], order: DESC }) {
      edges {
        node {
          uid
          last_publication_date
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
  }
`;
