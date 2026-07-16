"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { BlockType, Page } from "@/lib/content/types";
import { BLOCK_TYPE_LABELS } from "@/lib/content/types";
import { createEmptyBlock } from "@/lib/content/blocks";

function SortableBlockRow({
  id,
  label,
  selected,
  onSelect,
  onRemove,
}: {
  id: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={`flex items-center gap-2 border px-2 py-2 text-sm ${
        selected
          ? "border-emerald-400/60 bg-zinc-900"
          : "border-zinc-800 bg-zinc-950"
      }`}
    >
      <button
        type="button"
        className="cursor-grab px-1 text-zinc-500 active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        ⋮⋮
      </button>
      <button type="button" className="flex-1 text-left" onClick={onSelect}>
        {label}
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="text-xs text-red-400 hover:text-red-300"
      >
        Remove
      </button>
    </div>
  );
}

export function BlocksPanel({
  page,
  selectedBlockId,
  onSelectBlock,
  onChangePage,
}: {
  page: Page;
  selectedBlockId: string | null;
  onSelectBlock: (id: string) => void;
  onChangePage: (page: Page) => void;
}) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = page.blocks.findIndex((b) => b.id === active.id);
    const newIndex = page.blocks.findIndex((b) => b.id === over.id);
    onChangePage({
      ...page,
      blocks: arrayMove(page.blocks, oldIndex, newIndex),
    });
  }

  function addBlock(type: BlockType) {
    const block = createEmptyBlock(type);
    onChangePage({ ...page, blocks: [...page.blocks, block] });
    onSelectBlock(block.id);
  }

  function removeBlock(id: string) {
    onChangePage({
      ...page,
      blocks: page.blocks.filter((b) => b.id !== id),
    });
    if (selectedBlockId === id) onSelectBlock("");
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">
          Blocks · {page.title}
        </h2>
        <p className="mt-1 text-xs text-zinc-500">Drag to reorder. Click to edit.</p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext
          items={page.blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {page.blocks.map((block) => (
              <SortableBlockRow
                key={block.id}
                id={block.id}
                label={BLOCK_TYPE_LABELS[block.type]}
                selected={selectedBlockId === block.id}
                onSelect={() => onSelectBlock(block.id)}
                onRemove={() => removeBlock(block.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div>
        <p className="editor-label">Add block</p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(BLOCK_TYPE_LABELS) as BlockType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => addBlock(type)}
              className="border border-zinc-700 px-2 py-1 text-xs text-zinc-300 hover:border-emerald-400/50"
            >
              {BLOCK_TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
