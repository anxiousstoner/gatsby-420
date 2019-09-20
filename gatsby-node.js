//const webpack = require("webpack");
const _ = require("lodash");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const Promise = require("bluebird");

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    const separtorIndex = ~slug.indexOf("--") ? slug.indexOf("--") : 0;
    const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;
    createNodeField({
      node,
      name: `slug`,
      value: `${separtorIndex ? "/" : ""}${slug.substring(shortSlugStart)}`
    });
    createNodeField({
      node,
      name: `prefix`,
      value: separtorIndex ? slug.substring(1, separtorIndex) : ""
    });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allPrismicGuide {
          edges {
            node {
              id
              uid
            }
          }
        }
        allPrismicReview {
          edges {
            node {
              id
              uid
            }
          }
        }
        allPrismicBlogpost {
          edges {
            node {
              id
              uid
              data {
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
        allPrismicRecipe {
          edges {
            node {
              id
              uid
            }
          }
        }
      }
    `).then(result => {
      result.data.allPrismicGuide.edges.forEach(({ node }) => {
        createPage({
          path: node.uid,
          component: path.resolve(`./src/templates/GuideTemplate.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.uid
          }
        });
      });
      result.data.allPrismicReview.edges.forEach(({ node }) => {
        createPage({
          path: node.uid,
          component: path.resolve(`./src/templates/ReviewTemplate.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.uid,
            tags: node.tags
          }
        });
      });
      result.data.allPrismicBlogPost.edges.forEach(({ node }) => {
        createPage({
          path: node.uid,
          component: path.resolve(`./src/templates/BlogPostTemplate.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.uid
          }
        });
      });
      result.data.allPrismicRecipe.edges.forEach(({ node }) => {
        createPage({
          path: node.uid,
          component: path.resolve(`./src/templates/RecipeTemplate.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.uid
          }
        });
      });
      resolve();
    });
  });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  switch (stage) {
    case "build-javascript":
      {
        // let components = store.getState().pages.map(page => page.componentChunkName);
        // components = _.uniq(components);
        // config.plugin("CommonsChunkPlugin", webpack.optimize.CommonsChunkPlugin, [
        //   {
        //     name: `commons`,
        //     chunks: [`app`, ...components],
        //     minChunks: (module, count) => {
        //       const vendorModuleList = []; // [`material-ui`, `lodash`];
        //       const isFramework = _.some(
        //         vendorModuleList.map(vendor => {
        //           const regex = new RegExp(`[\\\\/]node_modules[\\\\/]${vendor}[\\\\/].*`, `i`);
        //           return regex.test(module.resource);
        //         })
        //       );
        //       return isFramework || count > 1;
        //     }
        //   }
        // ]);

        config.plugin("BundleAnalyzerPlugin", BundleAnalyzerPlugin, [
          {
            analyzerMode: "static",
            reportFilename: "./report/treemap.html",
            openAnalyzer: true,
            logLevel: "error",
            defaultSizes: "gzip"
          }
        ]);

        config.loader("yaml-loader", {
          test: /\.yaml$/,
          include: path.resolve("data"),
          loader: "yaml"
        });
      }
      break;
  }

  return config;
};

exports.modifyBabelrc = ({ babelrc }) => {
  return {
    ...babelrc,
    plugins: babelrc.plugins.concat([
      [
        "styled-jsx/babel",
        {
          plugins: [
            "styled-jsx-plugin-postcss",
            [
              "styled-jsx-plugin-stylelint",
              {
                stylelint: {
                  rules: {
                    "block-no-empty": true,
                    "color-no-invalid-hex": true,
                    "unit-no-unknown": true,
                    "property-no-unknown": true,
                    "declaration-block-no-shorthand-property-overrides": true,
                    "selector-pseudo-element-no-unknown": true,
                    "selector-type-no-unknown": true,
                    "media-feature-name-no-unknown": true,
                    "no-empty-source": true,
                    "no-extra-semicolons": true,
                    "function-url-no-scheme-relative": true,
                    "declaration-no-important": true,
                    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }],
                    "shorthand-property-no-redundant-values": true,
                    "no-duplicate-selectors": null,
                    "declaration-block-no-duplicate-properties": null,
                    "no-descending-specificity": null
                  }
                }
              }
            ]
          ]
        }
      ],
      [
        "import",
        {
          libraryName: "antd",
          style: "css"
        }
      ],
      `syntax-dynamic-import`,
      `dynamic-import-webpack`
    ])
  };
};
