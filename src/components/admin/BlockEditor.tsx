"use client";

import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Heading2,
  List,
  Pilcrow,
  Plus,
  Quote,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import type { BlogBlock } from "@/lib/blog-types";

const BLOCK_META: Record<BlogBlock["type"], { label: string; icon: LucideIcon }> = {
  paragraph: { label: "Paragraph", icon: Pilcrow },
  heading: { label: "Heading", icon: Heading2 },
  quote: { label: "Pull quote", icon: Quote },
  list: { label: "Bullet list", icon: List },
};

const TEXTAREA =
  "w-full resize-y rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm leading-relaxed text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-[#29B9F2] focus:ring-2 focus:ring-[#29B9F2]/20";

function emptyBlock(type: BlogBlock["type"]): BlogBlock {
  switch (type) {
    case "heading":
      return { type: "heading", text: "" };
    case "quote":
      return { type: "quote", text: "", attribution: "" };
    case "list":
      return { type: "list", items: [""] };
    default:
      return { type: "paragraph", text: "" };
  }
}

export default function BlockEditor({
  blocks,
  onChange,
  disabled,
}: {
  blocks: BlogBlock[];
  onChange: (next: BlogBlock[]) => void;
  disabled?: boolean;
}) {
  function replace(index: number, block: BlogBlock) {
    onChange(blocks.map((existing, i) => (i === index ? block : existing)));
  }

  function remove(index: number) {
    onChange(blocks.filter((_, i) => i !== index));
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;

    if (target < 0 || target >= blocks.length) {
      return;
    }

    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function add(type: BlogBlock["type"]) {
    onChange([...blocks, emptyBlock(type)]);
  }

  return (
    <div className="space-y-3">
      {blocks.length === 0 && (
        <p className="rounded-xl border border-dashed border-white/12 px-4 py-8 text-center text-sm text-white/40">
          No content yet. Add your first block below.
        </p>
      )}

      <ol className="space-y-3">
        {blocks.map((block, index) => {
          const meta = BLOCK_META[block.type];

          return (
            <li key={index} className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 shrink-0 text-white/20" aria-hidden />
                <meta.icon className="h-3.5 w-3.5 shrink-0 text-white/45" aria-hidden />
                <span className="flex-1 text-xs font-semibold uppercase tracking-wider text-white/45">
                  {meta.label}
                </span>

                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={disabled || index === 0}
                  aria-label={`Move ${meta.label} up`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B9F2]"
                >
                  <ChevronUp className="h-4 w-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={disabled || index === blocks.length - 1}
                  aria-label={`Move ${meta.label} down`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B9F2]"
                >
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={disabled}
                  aria-label={`Delete ${meta.label}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-red-500/15 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </button>
              </div>

              <div className="mt-3 space-y-2.5">
                {block.type === "list" ? (
                  <>
                    {block.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-2">
                        <span
                          aria-hidden
                          className="mt-3.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#29B9F2]"
                        />
                        <textarea
                          rows={2}
                          value={item}
                          disabled={disabled}
                          aria-label={`List item ${itemIndex + 1}`}
                          onChange={(event) =>
                            replace(index, {
                              type: "list",
                              items: block.items.map((existing, i) =>
                                i === itemIndex ? event.target.value : existing,
                              ),
                            })
                          }
                          className={TEXTAREA}
                          placeholder="List item"
                        />
                        <button
                          type="button"
                          disabled={disabled || block.items.length === 1}
                          onClick={() =>
                            replace(index, {
                              type: "list",
                              items: block.items.filter((_, i) => i !== itemIndex),
                            })
                          }
                          aria-label={`Remove list item ${itemIndex + 1}`}
                          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white/35 transition-colors hover:bg-red-500/15 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-25"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={() => replace(index, { type: "list", items: [...block.items, ""] })}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-[#7bd4f7] transition-opacity hover:opacity-80 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B9F2]"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden />
                      Add item
                    </button>
                  </>
                ) : (
                  <>
                    <textarea
                      rows={block.type === "heading" ? 1 : 4}
                      value={block.text}
                      disabled={disabled}
                      aria-label={meta.label}
                      onChange={(event) =>
                        replace(
                          index,
                          block.type === "quote"
                            ? { type: "quote", text: event.target.value, attribution: block.attribution }
                            : { type: block.type, text: event.target.value },
                        )
                      }
                      className={TEXTAREA}
                      placeholder={block.type === "heading" ? "Section heading" : "Write here…"}
                    />

                    {block.type === "quote" && (
                      <input
                        type="text"
                        value={block.attribution ?? ""}
                        disabled={disabled}
                        aria-label="Quote attribution"
                        onChange={(event) =>
                          replace(index, {
                            type: "quote",
                            text: block.text,
                            attribution: event.target.value,
                          })
                        }
                        className={TEXTAREA}
                        placeholder="Attribution — e.g. Rohan Mehta, Practice Lead, Vectrae"
                      />
                    )}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Add block</span>
        {(Object.keys(BLOCK_META) as BlogBlock["type"][]).map((type) => {
          const meta = BLOCK_META[type];

          return (
            <button
              key={type}
              type="button"
              disabled={disabled}
              onClick={() => add(type)}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/12 px-3 text-xs font-semibold text-white/70 transition-colors duration-200 hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29B9F2]"
            >
              <meta.icon className="h-3.5 w-3.5" aria-hidden />
              {meta.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
