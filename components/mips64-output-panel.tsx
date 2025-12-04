export default function MipsOutputPanel({ output }: { output: string }) {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-lg flex flex-col overflow-hidden">
      <div className="bg-[#161616] p-2 border-b border-gray-800">
        <span className="text-xs font-bold text-blue-500">[ASSEMBLY OUTPUT]</span>
      </div>
      <div className="flex-1 p-4 overflow-auto custom-scrollbar">
        <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
          {output}
        </pre>
      </div>
    </div>
  );
}