import PropTypes from "prop-types";
import React from "react";

import Link from "gatsby-link";
import { ThemeContext } from "../layouts";
import Hero from "../components/Hero";
import Seo from "../components/Seo";
import Article from "../components/Article";
import Headline from "../components/Article";
import Cardslist from "../components/Card/Cardslist";

import Button from "antd/lib/button";
import "antd/lib/button/style/index.css";

class IndexPage extends React.Component {
  separator = React.createRef();

  scrollToContent = e => {
    this.separator.current.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  render() {
    const {
      data: {
        allPrismicBlogPost,
        allPrismicGuide,
        bgDesktop: {
          resize: { src: desktop }
        },
        bgTablet: {
          resize: { src: tablet }
        },
        bgMobile: {
          resize: { src: mobile }
        },
        site: {
          siteMetadata: { facebook }
        }
      }
    } = this.props;

    const backgrounds = {
      desktop,
      tablet,
      mobile
    };

    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => (
            <Hero scrollToContent={this.scrollToContent} backgrounds={backgrounds} theme={theme} />
          )}
        </ThemeContext.Consumer>

        <hr ref={this.separator} />

        <ThemeContext.Consumer>
          {theme => (
            <Article theme={theme}>
              <Cardslist>
                {allPrismicGuide.edges.map(({ node }, index) => (
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
              </Cardslist>
              <div className="more">
                <Button type="primary" href="./guides">
                  See all our guides
                </Button>
              </div>
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

                .more {
                  text-align: center;
                  margin: 16px;
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
            </Article>
          )}
        </ThemeContext.Consumer>

        <ThemeContext.Consumer>
          {theme => (
            <Article theme={theme}>
              <h1 className="heading">Our latest blogs...</h1>
              <br />
              <Cardslist>
                {allPrismicBlogPost.edges.map(({ node }, index) => (
                  <div key={index}>
                    <Link to={node.uid}>
                      <div className="card">
                        <img src={node.data.image.url} alt="{node.data.title.text}" />
                        <div className="text">
                          <h2 className="heading">{node.data.title.text}</h2>
                          <p className="meta">{node.data.excerpt.text}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </Cardslist>
              <div className="more">
                <Button type="primary" href="./blog">
                  See all our blogs
                </Button>
              </div>
              <style jsx>{`
                hr {
                  margin: 0;
                  border: 0;
                }

                .card {
                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                  transition: 0.3s;
                  border-radius: 5px;

                  :global(img) {
                    max-width: 100%;
                  }
                }

                .text {
                  padding: 0.7em;
                }

                .meta {
                  font-size: 14px;
                }

                .more {
                  text-align: center;
                  margin: 16px;
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
            </Article>
          )}
        </ThemeContext.Consumer>

        <Seo facebook={facebook} />
      </React.Fragment>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;

//eslint-disable-next-line no-undef
export const guery = graphql`
  query IndexQuery {
    allPrismicBlogPost {
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
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    bgDesktop: imageSharp(id: { regex: "/hero-background/" }) {
      resize(width: 1200, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgTablet: imageSharp(id: { regex: "/hero-background/" }) {
      resize(width: 800, height: 1100, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgMobile: imageSharp(id: { regex: "/hero-background/" }) {
      resize(width: 450, height: 850, quality: 90, cropFocus: CENTER) {
        src
      }
    }
  }
`;

//hero-background
