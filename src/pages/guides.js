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
            <Cardslist>
              {data.allPrismicGuide.edges.map(({ node }, index) => (
                <div key={index}>
                  <Link to={node.uid}>
                    <div className="card">
                      <img src={node.data.icon.url} alt={node.data.title.text} />
                      <h2 className="heading">{node.data.title.text}</h2>
                      <p className="meta">{node.data.subtitle.text}</p>
                    </div>
                  </Link>
                </div>
              ))}
              <style jsx>{`
                .card {
                  padding: 1em;
                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                  transition: 0.3s;
                  border-radius: 5px;

                  :global(img) {
                    fill: ${theme.icon.color};
                    margin: ${theme.space.default};
                    border: 1px solid ${theme.line.color};
                    border: 1px solid #ecebea;
                    border-radius: 90%;
                    padding: 4px;
                    max-width: 150px;
                  }
                }

                @from-width desktop {
                  .card {
                    background: white;
                    margin: 5px;
                    width: 223px;
                  }

                  @media (hover: hover) {
                    :global(.card:hover) {
                      -webkit-transform: scale(1.2);
                      -ms-transform: scale(1.2);
                      transform: scale(1.2);
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
