import React from 'react';
import Link from 'next/link';

import Layout from '../components/Layout';

const Index = () => (
  <Layout>
    <Link href="/01-functional-component">Functional Components</Link>
    <Link href="/02-stateful-component">Stateful Components</Link>
    <Link href="/03-connected-component">Connect Component</Link>
  </Layout>
);

export default Index;
