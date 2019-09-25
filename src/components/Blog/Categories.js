import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import kebabCase from "lodash/kebabCase";

const Categories = ({ categories, theme }) => (
  <React.Fragment>
    {categories.map((cat, i) => (
      <React.Fragment key={cat}>
        {!!i && ", "}
        <Link to={`/category/${kebabCase(cat)}`} style={{ color: theme.color.neutral.green }}>
          {cat}
        </Link>
      </React.Fragment>
    ))}
  </React.Fragment>
);

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
};

export default Categories;
