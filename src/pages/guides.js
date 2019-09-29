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
              <Headline title="All Our Guides To Cannabis Culture" theme={theme} />
            </header>
            <Cardslist horizontal>
              {data.allPrismicGuide.edges.map(({ node }, index) => (
                <div key={index}>
                  <Link to={"/" + node.uid}>
                    <div className="card">
                      <div className="icon">
                        <img src={node.data.icon.url} alt={node.data.title.text} />
                      </div>
                      <h2 className="heading">{node.data.title.text}</h2>
                      <p className="meta">{node.data.subtitle.text}</p>
                    </div>
                  </Link>
                  <style jsx>{`
                    .card {
                      padding: 1em;
                      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                      transition: 0.3s;
                      border-radius: 5px;

                      :global(img) {
                        fill: ${theme.icon.color};
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
                      background-color: ${node.data.icon_background};
                      box-shadow: 3px 4px 8px 0 rgba(0, 0, 0, 0.2);
                      align-items: center;
                    }

                    @from-width desktop {
                      .card {
                        background: white;
                        margin: 5px;
                        width: 223px;
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
                </div>
              ))}
            </Cardslist>
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={data.site.siteMetadata.facebook} />
    </React.Fragment>
  );
};

export const query = graphql`
  query Guides1Query {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    allPrismicGuide {
      edges {
        node {
          id
          uid
          data {
            icon {
              url
            }
            icon_background
            title {
              text
            }
            subtitle {
              text
            }
          }
        }
      }
    }
  }
`;
