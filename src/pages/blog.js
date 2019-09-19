import React from "react";

import Link from "gatsby-link";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Cardslist from "../components/Card/Cardslist";

import Seo from "../components/Seo";

const BlogPage = ({ data }) => {
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
              {data.allPrismicBlogpost.edges.map(({ node }, index) => {
                let categories = false;
                if (node.data.categories.length > 0 && node.data.categories[0].category) {
                  categories = node.data.categories.map(c => c.category.document[0].data.name);
                }
                return (
                  <div key={index}>
                    <Link to={"/" + node.uid}>
                      <div className="card">
                        <img src={node.data.image.url} alt={node.data.title.text} />
                        <div className="text">
                          <h2 className="heading">{node.data.title.text}</h2>
                          <div>
                            {node.last_publication_date} Author{" "}
                            {categories &&
                              categories.map((cat, i) => (
                                <React.Fragment key={cat}>
                                  {!!i && ", "}
                                  {/* <Link to={`/categories/${kebabCase(cat)}`}>{cat}</Link> */}
                                  {cat}
                                </React.Fragment>
                              ))}
                          </div>
                          <p className="meta">{node.data.excerpt.text}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
              <style jsx>{`
                .card {
                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                  transition: 0.3s;
                  border-radius: 20px;

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
                    margin: 10px;
                    display: flex;
                    align-items: center;
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

export default BlogPage;

export const query = graphql`
  query Posts1Query {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    allPrismicBlogpost(sort: { fields: [last_publication_date], order: DESC }) {
      edges {
        node {
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
  }
`;
