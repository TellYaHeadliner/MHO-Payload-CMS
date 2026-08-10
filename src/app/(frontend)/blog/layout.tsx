import { Fragment, ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blogs",
    description: 'Blog list'
}

export default function Layout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>;
}