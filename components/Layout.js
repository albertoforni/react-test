import React, { PropTypes } from 'react';
import Head from 'next/head';

const Layout = props => (
  <div>
    <Head>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Roboto');

        body {
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          max-width: 600px;
          margin: 2rem auto;
        }

        a {
          cursor: pointer;
        }

        button {
          border: 0;
          background: #4caf50;
          color: #f2f2f2;
          padding: 0.5em;
          border-radius: 2px;
          font-size: 16px;
          width: 130px;
          margin-right: 1rem;
        }

        .select {
          border: none;
          width: 300px;
          height: 30px;
          margin-bottom: 0.5rem;
          font-size: 16px;
        }

        .select-options {
          margin-bottom: 0.5rem;
          font-weight: bold;
        }

        .buttons {
          text-align: center;
        }

        .quote {
          position:relative;
          margin: 1.5em 0 1.5em;
          padding: 0 1em;
          font-size: 24px;
          text-align: center;
        }
        .quote:before
        {
          color: #ccc;
          font-size: 5em;
          position:absolute;
          left:5px;
          top: 0.3em;
          line-height: 0.1em;
        }

        .quote:after
        {
          color: #ccc;
          font-size: 5em;
          position:absolute;
          right:3px;
          bottom: 0em;
          line-height: 0.1em;
        }
    `}</style>
    </Head>
    {props.children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
