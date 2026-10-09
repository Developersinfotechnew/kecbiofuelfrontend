"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import VideoForm from "../../../../Components/Admin/VideoForm";
import { adminFetch } from "../../../utils/adminAuth";

export default function EditShortPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch(`/videos/admin/${id}`)
      .then((res) => setVideo(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      ) : error ? (
        <div className="text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</div>
      ) : (
        <VideoForm mode="edit" video={video} videoType="short" />
      )}
    </div>
  );
}
