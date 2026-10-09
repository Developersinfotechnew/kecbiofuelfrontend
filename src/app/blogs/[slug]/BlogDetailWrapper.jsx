"use client";

import dynamic from "next/dynamic";
import Navbar from "@/app/Components/Navbar";
import BlogDetailClient from "./BlogDetailClient";

const Footer = dynamic(() => import("@/app/Components/Footer"), { ssr: false });

// Page chrome (navbar + footer) around the blog article.
export default function BlogDetailWrapper({ blog, relatedBlogs }) {
  return (
    <>
      <Navbar />
      <BlogDetailClient blog={blog} relatedBlogs={relatedBlogs} />
      <Footer />
    </>
  );
}
