/* eslint no-unused-vars: 0 */

import { navigateTo } from "gatsby-link";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import PropTypes from "prop-types";
import React from "react";

const FormItem = Form.Item;
const { TextArea } = Input;
import "antd/lib/form/style/index.css";
import "antd/lib/input/style/index.css";
import "antd/lib/button/style/index.css";
import { ThemeContext } from "../../layouts";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonp = require("jsonp");

var _jsonp2 = _interopRequireDefault(_jsonp);

var _emailValidator = require("email-validator");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/*
 * make a jsonp request to user's mailchimp list
 * url is a concatenated string of user's gatsby-config.js
 * options, along with any MC list fields as query params
 */

var subscribeEmailToMailchimp = function subscribeEmailToMailchimp(url) {
  return new Promise(function(resolve, reject) {
    // `param` object avoids CORS issues
    // timeout to 3.5s so user isn't waiting forever
    // usually occurs w/ privacy plugins enabled
    // 3.5s is a bit longer than the time it would take on a Slow 3G connection
    return (0, _jsonp2.default)(url, { param: "c", timeout: 3500 }, function(err, data) {
      if (err) reject(err);
      if (data) resolve(data);
    });
  });
};

/*
 * build a query string of MC list fields
 * ex: '&KEY1=value1&KEY2=value2'
 * (toUpperCase because that's what MC requires)
 */

var convertListFields = function convertListFields(fields) {
  var queryParams = "";
  for (var field in fields) {
    queryParams = queryParams.concat("&" + field.toUpperCase() + "=" + fields[field]);
  }
  return queryParams;
};

/*
 * accept email (String) and additional, optional
 * Mailchimp list fields (Object)
 * then make jsonp req with data
 */

var addToMailchimp = function addToMailchimp(email, fields) {
  var isEmailValid = (0, _emailValidator.validate)(email);
  var emailEncoded = encodeURIComponent(email);
  if (!isEmailValid) {
    return Promise.resolve({
      result: "error",
      msg: "Please use a valid email address and try again."
    });
  }

  // generate Mailchimp endpoint for jsonp request
  // note, we change `/post` to `/post-json`
  // otherwise, Mailchomp returns an error
  var endpoint = "https://420smokers.us13.list-manage.com/subscribe/post?u=214f6f3c4fdabdc163541423b&amp;id=8466b98927".replace(
    /\/post/g,
    "/post-json"
  );

  var queryParams = "&EMAIL=" + emailEncoded + convertListFields(fields);
  var url = "" + endpoint + queryParams;
  return subscribeEmailToMailchimp(url);
};

exports.default = addToMailchimp;

export default class MailchimpForm extends React.Component {
  state = {
    name: null,
    email: null
  };

  _handleChange = e => {
    this.setState({
      [`${e.target.name}`]: e.target.value
    });
  };

  _handleSubmit = e => {
    e.preventDefault();
    addToMailchimp(this.state.email)
      .then(({ msg, result }) => {
        console.log("msg", `${result}: ${msg}`);
        if (result !== "success") {
          throw msg;
        }
        alert(msg);
      })
      .catch(err => {
        console.log("err", err);
        alert(err);
      });
  };

  render() {
    return (
      <div>
        <div className="signUpForm">
          <h2>Join the 420 Family!</h2>
          <p>Get the Latest Content, Guides & Deals.</p>
          <p>In Your Mailbox Weekly.</p>
          <form onSubmit={this._handleSubmit}>
            <input
              type="email"
              onChange={this._handleChange}
              placeholder="Email Address"
              name="email"
            />
            <input className="button" type="submit" />
          </form>
        </div>
        {/* --- STYLES --- */}
        <style jsx>{`
          p {
            color: #9c9491;
            margin-top: 0;
          }

          h2 {
            margin-bottom: 10px;
          }
          input {
            font-weight: 700;
            position: relative;
            height: 35px;
            border: 0.1px solid #d9d9d9;
            padding: 10px;
            line-height: 4px;
          }

          form {
            margin-top: 20px;
          }

          .button {
            background: #70ae25;
            color: white;
            border-radius: 5%;
            margin-left: 5px;
            letter-spacing: 1px;
          }
          .signUpForm {
            padding: 50px;
            border-width: 2px;
            border-style: solid;
            border-color: #71af26;
            position: relative;
            background: white !important;
            text-align: left;
            max-width: 700px;
            margin: auto;
          }

          .signUpForm:after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            top: 12px;
            left: 12px;
            background-image: linear-gradient(#71af26, #87c30e);
            z-index: -1;
          }
        `}</style>
      </div>
    );
  }
}
