"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { btnGhost, btnGreen } from "./ui";

/**
 * Paste JSON -> onImport(parsedObject). The parent merges it into the form,
 * so every matching input fills automatically.
 */
export default function JsonImportModal({ title, placeholder, onImport, onClose }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const run = () => {
    setError("");
    try {
      let parsed = JSON.parse(text);
      if (Array.isArray(parsed)) parsed = parsed[0]; // be forgiving: [ {...} ]
      if (!parsed || typeof parsed !== "object") throw new Error("JSON must be an object");
      onImport(parsed);
      onClose();
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-4">
          <p className="text-sm text-gray-500 mb-3">Paste a full JSON object. All matching fields will be imported.</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            spellCheck={false}
            className="w-full h-72 border border-gray-200 rounded-xl px-4 py-3 text-xs font-mono bg-green-50/30 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 resize-y"
          />
          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button type="button" onClick={onClose} className={btnGhost}>
            Cancel
          </button>
          <button type="button" onClick={run} disabled={!text.trim()} className={btnGreen}>
            Import
          </button>
        </div>
      </div>
    </div>
  );
}
