"use client"

import { Play } from "lucide-react"

interface CodeInputPanelProps {
  value: string
  onChange: (value: string) => void
  onRun: () => void
}

export default function CodeInputPanel({ value, onChange, onRun }: CodeInputPanelProps) {
  return (
    <div className="bg-[#161618] rounded border border-[#2d2d30] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d2d30]">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#9ca3af]">[code input]</h2>
        <button
          onClick={onRun}
          className="px-3 py-1 bg-transparent border border-[#3b82f6] text-[#3b82f6] rounded text-xs font-mono hover:bg-[#3b82f6] hover:text-white transition-colors"
        >
          <Play className="w-3 h-3 inline mr-1" />
          Run
        </button>
      </div>

      {/* Textarea */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-[#161618] text-[#e5e7eb] p-4 font-mono text-sm resize-none focus:outline-none border-0"
        placeholder="Enter kamayo++ code here..."
        spellCheck="false"
      />
    </div>
  )
}
