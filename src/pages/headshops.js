
import PropTypes from "prop-types";
import React from "react";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import { ThemeContext } from "../layouts";

import Headshops from "../components/Headshops";
import Seo from "../components/Seo";

const HeadshopsPage = props => {
  const {
    data: {
      pots: { edges: pots = [] },
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;

  return (
    <React.Fragment>


      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline title="Finding The Best Online Headshops Guide" theme={theme} />
            </header>
            <hr />
              <br />
              <h3>Which Head Shop Is Best?</h3>
              <br />
                <p>
                  Imagine seeing a YouTube video or reading a review about an amazing new bong or vape. Then when it arrives it feels cheap and flimsy, and only lasts one or two sessions before clogging up or breaking. Sadly, most cannabis companies can be a little shady and sell either fake products or worse. Utter crap, that ends up sitting in your draw and wasting your hard earned cash that could have gone towards buying that extra ounce. Being vigilant and spending a few minutes reading our buyer’s guides can save you from the waste and stress dealing with less than reputable providers. We only recommend the very best cannabis related products and companies to promote.
                  <br /><br />
                  Whether you are looking to buy a new glass bong, dab rig, vape, grinder, smoking accessories or even just some rolling papers we got your back and review the best gear that actual real stoners are using daily.
                  <br /><br />
                  So forget the hype, roll a blunt, sit back and browse our guide until you feel comfortable you are purchasing the very best products, from the very best cannabis brands.
                </p>
              <br />
          </Article>
        )}
      </ThemeContext.Consumer>

      <ThemeContext.Consumer>
        {theme => <Headshops posts={pots} theme={theme} />}
      </ThemeContext.Consumer>

      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>

              <h3>Differences Between Headshops:</h3>
              <br />
                <p>
                  Not all headshops are the same. Some may carry a wider variety of dab rigs or specialize in vaporizers. You must be careful shopping glass at local physical stores as they often import cheap glass from China that will break. A trusted online head shop usually stocks only the highest quality gear, as they rely on customer reviews to grow, unlike physical stores.
                  <br /><br />
                  Because of the large variety and selection online we recommend having a distinct idea of what you want to purchase first before being browsing, otherwise, you may get sucked into some advert, hyping a vape or bong you later regret purchasing. Take a look at our updated stoner buying guides to find out which item has the features you looking for and then make your purchase.
                </p>
                <br />
                <h3>Things to Consider:</h3>
                <br />
                  <p>
                    When you looking online there are a few things you want to take a note of:
                  </p>
                  <br />
                  <ul>
                    <li>Do they offer discounts or coupons?</li>
                    <li>Do they offer free shipping?</li>
                    <li>How about stealth and packaging?</li>
                    <li>Is the product quiality up to scratch?</li>
                    <li>Do they have a majority of good reviews online?</li>
                    <li>Do they offer a returns policy?</li>
                  </ul>
                <br />
                  <p>
                    Other things to remember are:
                  </p>
                  <br />
                  <ul>
                    <li>Checking the companies social media tags to see if others are using the product.</li>
                    <li>Making sure they are a legit retailer.</li>
                  </ul>
                <br />

                <h3>Reasons to shop at an online head shop:</h3>
                <br />
                <p>Wondering why you should order online rather than shooting down to your nearest local head shop?:</p>
                <br />
                <ol>
                 	<li><strong>Cheap A F</strong> - Without expensive overheads such as rent and staff online head-shops can pass those savings to their customers and beat out the price of almost any store.</li>
                  <br />
                 	<li><strong>Almost Always Stocked</strong> - Online retailers have a much easier time with stock management as they do not have to fill a store or have any display items. Keeping displays stocked in physical stores can mean the shop owners are more selective as what they keep in stock.</li>
                  <br />
                  <li><strong>Trendy</strong> - Physical stores often hold too much old stock and are then stuck with outdated glass and accessories nobody ends up ever wanting. Online stores can hold sales and even give away stock that is no longer moving out the door.</li>
                 	<br />
                  <li><strong>Save Money</strong> - Online stores are more competitive so they are often shooting out major discounts to there email subscribers and previous customers. These savings and discounts can often result in a 50% savings compared to shopping in a physical store.</li>
                </ol>
                <br />
                Some head-shops are focused more on those that use glass bongs and others for those that vape. There are even dab specific retailers. Shopping from an online retailer that specializes can mean a better customer experience and always knowing they have consumables in stock.
                <br /><br />
                <h4>Stoner Headshops F.A.Q </h4>
                <br />
                <strong>Are online retailers any good?</strong>
                <br />
                - <em>Extremely. We prefer online headshops due to the reasons listed above. As long as you choose a good one, you can shop online safely and securely.</em>
                <br /><br />
                <strong>How do online retailers manage to sell items that cheap?</strong>
                <br />
                - <em>Without major overheads and good connections to wholesalers, online headshops can maintain competitive pricing.</em>
                <br /><br />
                <strong>Should I only use one retailer?</strong>
                <br />
                - <em>No, you can use as many as you like. We use the 3 listed in the top of this post as they all provide free shipping in the states so it does not matter how many times we order. If you living outside the U.S. check the shipping costs so that you do not spend too much.</em>
                <br /><br />
                <strong>Are online headshops legit?</strong>
                <br />
                - <em>Most are legit, though online there will always be scams. The best is to pay with PayPal so that you can lay a dispute and get your money back if it is a scam. </em>
                <br /><br />
                <strong>What are popular online headshops?</strong>
                <br />
                - <em>The oldest and most trusted retailer that stocks almost everything from glass water pipes, bongs, dab rigs and more, is grasscity but dankstop and TokerSupply have both been making strives in the market to provide top notch service and support.</em>
                <br /><br />
                With the laziness that is often associated with blazing, it is awesome to be able to get your smoking gear delivered and never leave the house!
          </Article>
        )}
      </ThemeContext.Consumer>
    </React.Fragment>
  );
};

HeadshopsPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default HeadshopsPage;


export const query = graphql`
  query HeadshopsQuery {
    pots: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//posts/guide+.*--/" } }
      sort: { fields: [fields___prefix], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            category
            author
            cover {
              children {
                ... on ImageSharp {
                  sizes(maxWidth: 800, maxHeight: 360) {
                    ...GatsbyImageSharpSizes_withWebp
                  }
                }
              }
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
  }
`;
