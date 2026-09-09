import { Fragment, ReactNode } from "react";
import type { Metadata } from "next";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "List Blog",
  description: 'Blog list'
}

export default function Layout({ children }: { children: ReactNode }) {
  return <Fragment>
    {children}
    <Footer />
  </Fragment>;
}