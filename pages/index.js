import React from 'react';
import Link from 'next/link';

import Layout from '../components/Layout';

const Index = () => (
  <Layout>
    <ol>
      <Link href="/01-functional-component"><li><a>Functional Components</a></li></Link>
      <Link href="/02-stateful-component"><li><a>Stateful Components</a></li></Link>
      <Link href="/03-connected-component"><li><a>Connect Component</a></li></Link>
    </ol>
    <style>{`
      ol {
        padding: 0;
      }
      li {
        margin-bottom: 1rem;
      }
    `}</style>
  </Layout>
);

export default Index;
