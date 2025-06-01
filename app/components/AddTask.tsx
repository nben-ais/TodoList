"use client"
import { useState } from "react";

export default function AddTask({ onAdd }: { onAdd: (task: string) => void }) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-2 rounded"
        placeholder="Add new task"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
    </form>
  );
}
