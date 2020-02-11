import React from "react";
import PropTypes from "prop-types";

import Link from "gatsby-link";
import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Cardslist from "../components/Card/Cardslist";
import Categories from "../components/Blog/Categories";

import Seo from "../components/Seo";

const CategoryPage = ({ data, pathContext: { category } }) => {
  // Filter posts here since Gatsby 1.9 GraphQL issue
  // https://github.com/gatsbyjs/gatsby/issues/4799
  // https://github.com/gatsbyjs/gatsby/pull/6315
  // https://github.com/gatsbyjs/gatsby/pull/8294
  const posts = data.posts.edges.filter(
    edge =>
      edge.node.data.categories.length > 0 &&
      edge.node.data.categories.some(c => c.category.document[0].data.name === category)
  );

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline title={`Posts in ${category} (${posts.length})`} theme={theme} />
            </header>
            <Cardslist>
              {posts.map(({ node }, index) => {
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
                          <div className="metaInfo">
                            {node.last_publication_date}
                            {node.data.author && " | " + node.data.author.document[0].data.name}
                            {categories && " | "}
                            {categories && <Categories categories={categories} theme={theme} />}
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

                .metaInfo {
                  opacity: 0.7;
                  font-size: 0.9rem;
                  margin-top: 10px;
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

CategoryPage.propTypes = {
  pathContext: PropTypes.shape({
    category: PropTypes.string.isRequired
  }).isRequired,
  data: PropTypes.shape({
    posts: PropTypes.shape({
      edges: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default CategoryPage;

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  # query CategoryPage($category: String!) {
  query CategoryPage {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    posts: allPrismicBlogPost(sort: { fields: [last_publication_date], order: DESC }) {
      totalCount
      edges {
        node {
          uid
          last_publication_date(formatString: "MM/DD/YYYY")
          data {
            title {
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
  }
`;
