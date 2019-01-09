import React from "react";

import Link from "gatsby-link";

const SuccessPage = () => (
  <div>
    <h1>Thanks!</h1>
    <p>Your message has been sent.</p>
    <p>
      Go back to the <Link to="/">home page</Link> or explore our{" "}
      <Link to="./blog">latest blog posts</Link>.
    </p>
    <style jsx>
      {`
        div {
          margin-top: 200px;
          text-align: center;
        }
      `}
    </style>
  </div>
);

export default SuccessPage;
