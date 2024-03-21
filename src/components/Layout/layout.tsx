import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Analytics } from '@vercel/analytics/next';

type LayoutProps = {
  children: any
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>
        {children}
        <Analytics />
      </main>
    </>
  );
};

export default Layout;
