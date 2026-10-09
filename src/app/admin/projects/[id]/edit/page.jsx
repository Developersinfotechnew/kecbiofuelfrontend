"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { adminFetch } from "../../../utils/adminAuth";
import ProjectForm from "../../../../Components/Admin/ProjectForm";

export default function EditProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch(`/projects/admin/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div className="text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm">{error}</div>;
  if (!project)
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  return <ProjectForm initial={project} />;
}
