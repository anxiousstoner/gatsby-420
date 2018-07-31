import React from "react";
import { Link } from "react-router-dom";

import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Button from "antd/lib/button";
import FaThumbsup from "react-icons/lib/fa/thumbs-up";
import FaThumbsdown from "react-icons/lib/fa/thumbs-down";

import "antd/lib/button/style/index.css";

export default ({ data }) => {
  const post = data.prismicReview;
  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline title={post.data.title.text} theme={theme} />
            </header>
            <div className="highlight">
              <img src={post.data.image.url} alt={post.data.title.text} />
              <div className="col1">
                <h2>{post.data.item_name.text} </h2>
                <h6 className="rating">{post.data.rating} out of 5 </h6>
                <h5>{post.data.excerpt.text}</h5>
                <div className="order-button">
                  <Button type="primary" href={post.data.url.url}>
                    {post.data.button_text.text}
                  </Button>
                </div>
              </div>
            </div>
            <div className="pros-cons">
              <div className="pros">
                <h2 className="thumbs">
                  <span>
                    <FaThumbsup />
                  </span>Pros
                </h2>
                <div dangerouslySetInnerHTML={{ __html: post.data.pros.html }} />
              </div>
              <div className="cons">
                <h2 className="thumbs">
                  <span>
                    <FaThumbsdown />
                  </span>Cons
                </h2>
                <div dangerouslySetInnerHTML={{ __html: post.data.cons.html }} />
              </div>
            </div>
            <br />
            <hr />
            <div>
              <div dangerouslySetInnerHTML={{ __html: post.data.body.html }} />
            </div>
            <div className="highlight">
              <img src={post.data.image.url} alt={post.data.title.text} />
              <div className="col1">
                <h2>{post.data.item_name.text} </h2>
                <h6 className="rating">{post.data.rating} out of 5 </h6>
                <h5>{post.data.excerpt.text}</h5>
                <div className="order-button">
                  <Button type="primary" href={post.data.url.url}>
                    {post.data.button_text.text}
                  </Button>
                </div>
              </div>
            </div>
            <style jsx>{`
              .highlight {
                display: flex;
                padding: 2em;
                margin: 1em;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                transition: 0.3s;
                border-radius: 5px;
                align-self: center;

                :global(img) {
                  max-height: 200px;
                  max-width: 200px;
                  min-height: 75px;
                  padding: 15px;
                }
              }

              .col1 {
                margin-top: 10px;
                margin-bottom: 10px;
              }

              .rating {
                margin-top: 5px;
                letter-spacing: 0.1em;
                font-size: 0.8em;
                color: #0f610f;
                margin-bottom: 5px;
              }

              .order-button {
                margin-top: 10px;
                text-align: center;
              }

              .pros-cons {
                display: flex;
                justify-content: space-around;
              }

              .thumbs {
                margin-bottom: 15px;
              }
            `}</style>
          </Article>
        )}
      </ThemeContext.Consumer>
    </React.Fragment>
  );
};

export const query = graphql`
  query ReviewQuery($slug: String!) {
    prismicReview(uid: { eq: $slug }) {
      uid
      data {
        item_name {
          text
        }
        rating
        price
        image {
          url
        }
        title {
          html
          text
        }

        excerpt {
          html
          text
        }
        body {
          html
          text
        }
        pros {
          html
          text
        }
        cons {
          html
          text
        }
        button_text {
          html
          text
        }
        url {
          url
        }
      }
    }
  }
`;