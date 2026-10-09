"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminFetch } from "../../../utils/adminAuth";
import BlogForm from "../../../../Components/Admin/BlogForm";

export default function EditBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch(`/blogs/admin/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div className="text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm">{error}</div>;
  if (!blog)
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  return <BlogForm initial={blog} />;
}
