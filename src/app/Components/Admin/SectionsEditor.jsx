"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Card, Field, TextArea, TextInput, btnGhost } from "./ui";
import ImageSetField from "./ImageSetField";

const blankSection = () => ({ subheading: "", content: "", image: { desktop: "", mobile: "", alt: "" } });

function move(list, from, to) {
  if (to < 0 || to >= list.length) return list;
  const copy = [...list];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

/** Repeatable "sub-section" blocks: heading + text + desktop/mobile image. */
export default function SectionsEditor({ sections, onChange }) {
  const update = (i, patch) => onChange(sections.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));

  return (
    <Card
      title="Sub-sections"
      subtitle="Each block shows as: heading → image → text. Use a blank line in the text for a new paragraph."
      action={
        <button type="button" onClick={() => onChange([...sections, blankSection()])} className={btnGhost}>
          <Plus className="w-4 h-4" /> Add section
        </button>
      }
    >
      {sections.length === 0 ? (
        <div className="border-2 border-dashed border-gray-200 rounded-xl py-10 text-center">
          <p className="text-sm text-gray-500">No sections yet.</p>
          <button
            type="button"
            onClick={() => onChange([blankSection()])}
            className="text-green-700 font-semibold text-sm hover:underline mt-1"
          >
            + Add the first section
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((s, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-gray-50/50">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 bg-white rounded-t-xl">
                <span className="text-sm font-bold text-green-800">Section {i + 1}</span>
                <div className="flex items-center gap-1">
                  <button type="button" disabled={i === 0} onClick={() => onChange(move(sections, i, i - 1))}
                    className="w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center" aria-label="Move up">
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button type="button" disabled={i === sections.length - 1} onClick={() => onChange(move(sections, i, i + 1))}
                    className="w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 flex items-center justify-center" aria-label="Move down">
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button type="button"
                    onClick={() => confirm(`Remove section ${i + 1}?`) && onChange(sections.filter((_, idx) => idx !== i))}
                    className="w-8 h-8 rounded-lg text-red-500 hover:bg-red-50 flex items-center justify-center" aria-label="Remove section">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <Field label="Sub-heading">
                  <TextInput value={s.subheading} onChange={(v) => update(i, { subheading: v })} />
                </Field>
                <Field label="Content">
                  <TextArea rows={7} value={s.content} onChange={(v) => update(i, { content: v })} />
                </Field>
                <Field label="Section image (optional)">
                  <ImageSetField value={s.image} onChange={(v) => update(i, { image: v })} desktopHint="1200×800" mobileHint="800×600" />
                </Field>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
