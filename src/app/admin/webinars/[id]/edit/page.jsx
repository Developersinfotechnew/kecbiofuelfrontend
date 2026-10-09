"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import WebinarForm from "../../../../Components/Admin/WebinarForm";
import { adminFetch } from "../../../utils/adminAuth";

export default function EditWebinarPage() {
  const { id } = useParams();
  const [webinar, setWebinar] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch(`/webinars/admin/${id}`).then((r) => setWebinar(r.data)).catch((e) => setError(e.message));
  }, [id]);

  return (
    <div>
      {error ? (
        <div className="text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</div>
      ) : !webinar ? (
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      ) : (
        <WebinarForm mode="edit" webinar={webinar} />
      )}
    </div>
  );
}
