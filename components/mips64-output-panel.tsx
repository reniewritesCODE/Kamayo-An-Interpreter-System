"use client"

interface Mips64OutputPanelProps {
  output: string
}

export default function Mips64OutputPanel({ output }: Mips64OutputPanelProps) {
  return (
    <div className="bg-[#161618] rounded border border-[#2d2d30] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#2d2d30]">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#9ca3af]">[MIPS64 OUTPUT]</h2>
      </div>

      {/* Console Output */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm bg-[#0a0a0a] bg-opacity-50">
        <pre className="text-[#a1a7b8] whitespace-pre-wrap wrap-break-words">{output || "// Output will appear here"}</pre>
      </div>
    </div>
  )
}
