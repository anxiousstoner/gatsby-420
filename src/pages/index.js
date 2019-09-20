import PropTypes from "prop-types";
import React from "react";

import Link from "gatsby-link";
import { ThemeContext } from "../layouts";
import Hero from "../components/Hero";
import Seo from "../components/Seo";
import Article from "../components/Article";
import HomeSection from "../components/Article/HomeSection";
import Subtitle from "../components/Article/Subtitle";
import Cardslist from "../components/Card/Cardslist";
import Bodytext from "../components/Article/Bodytext";
import MailchimpForm from "../components/MailchimpForm";
import Categories from "../components/Blog/Categories";

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
        allPrismicBlogpost,
        allPrismicGuide,
        prismicHomepage,
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
            <HomeSection theme={theme}>
              <header>
                <Subtitle title="Our Top Guides To Cannabis Culture" theme={theme} />
              </header>
              <Cardslist horizontal>
                {allPrismicGuide.edges.map(({ node }, index) => (
                  <div key={index}>
                    <Link to={"/" + node.uid}>
                      <div className="card">
                        <div className="icon">
                          <img src={node.data.icon.url} alt={node.data.title.text} />
                        </div>
                        <h3 className="heading">{node.data.title.text}</h3>
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

                      h3 {
                        font-size: 1.5em;
                        -webkit-margin-before: 0.83em;
                        -webkit-margin-after: 0.83em;
                        -webkit-margin-start: 0px;
                        -webkit-margin-end: 0px;
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
                          width: 211px;
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
              <div className="more">
                <br />
                <a className="button" type="primary" href="./guides">
                  See All Our Guides
                </a>
                <style jsx>{`
                  .more {
                    text-align: center;
                    margin: 16px;
                  }

                  .button {
                    background: #5ab200;
                    color: white;
                    border-radius: 5px;
                    margin-left: 5px;
                    letter-spacing: 1px;
                    font-weight: 700;
                    position: relative;
                    border: 0.1px solid #d9d9d9;
                    padding: 20px;
                    font-size: larger;
                  }
                `}</style>
              </div>
              <div className="Body">
                <Bodytext theme={theme} html={prismicHomepage.data.body.html} />
              </div>
            </HomeSection>
          )}
        </ThemeContext.Consumer>

        <ThemeContext.Consumer>
          {theme => (
            <HomeSection theme={theme}>
              <MailchimpForm theme={theme} />
              <br />
              <br />
              <Subtitle title="Our Latest Blogs" theme={theme} />

              <Cardslist>
                {allPrismicBlogpost.edges.map(({ node }, index) => {
                  let categories = false;
                  if (node.data.categories.length > 0 && node.data.categories[0].category) {
                    categories = node.data.categories.map(c => c.category.document[0].data.name);
                  }

                  return (
                    <div key={index}>
                      <Link to={node.uid}>
                        <div className="card">
                          <img src={node.data.image.url} alt="{node.data.title.text}" />
                          <div className="text">
                            <h3 className="heading">{node.data.title.text}</h3>
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
              </Cardslist>
              <div className="more">
                <br />
                <a className="button" type="primary" href="./blog">
                  See All Our Blogs
                </a>
              </div>
              <div className="Body2">
                <Bodytext theme={theme} html={prismicHomepage.data.body2.html} />
              </div>
              <style jsx>{`
                hr {
                  margin: 0;
                  border: 0;
                }

                .button {
                  background: #5ab200;
                  color: white;
                  border-radius: 5px;
                  margin-left: 5px;
                  letter-spacing: 1px;
                  font-weight: 700;
                  position: relative;
                  border: 0.1px solid #d9d9d9;
                  padding: 20px;
                  font-size: larger;
                }

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

                h3 {
                  font-size: 1.5em;
                  -webkit-margin-before: 0.83em;
                  -webkit-margin-after: 0.83em;
                  -webkit-margin-start: 0px;
                  -webkit-margin-end: 0px;
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
                }

                .more {
                  text-align: center;
                  margin: 16px;
                }

                @from-width desktop {
                  .card {
                    background: white;
                    margin: 10px;
                    display: flex;
                    align-items: center;
                    width: 100%;
                    border-radius: 20px;

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
            </HomeSection>
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
    allPrismicBlogpost(limit: 8, sort: { fields: [last_publication_date], order: DESC }) {
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
    allPrismicGuide(limit: 8) {
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
    prismicHomepage {
      data {
        title {
          html
          text
        }
        body {
          html
          text
        }
        body2 {
          html
          text
        }
      }
    }
  }
`;

//hero-background
