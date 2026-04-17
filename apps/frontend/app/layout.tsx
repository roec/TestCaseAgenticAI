import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Test Case Agentic AI Platform',
  description: 'Enterprise-grade multi-agent test case generator'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
