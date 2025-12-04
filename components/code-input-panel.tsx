import { Play } from "lucide-react";

// Define interface for props to avoid TypeScript warnings
interface CodeInputProps {
  code: string;
  setCode: (value: string) => void;
  onRun: () => void;
  loading: boolean;
}

export default function CodeInputPanel({ code, setCode, onRun, loading }: CodeInputProps) {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-lg flex flex-col overflow-hidden">
      <div className="bg-[#161616] p-2 flex justify-between items-center border-b border-gray-800">
        <span className="text-xs font-bold text-blue-500">[CODE INPUT]</span>
        <button 
          onClick={onRun}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Running..." : <><Play size={12} /> Run</>}
        </button>
      </div>
      
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        // 3. Set the Placeholder here
        placeholder="Input code here"
        className="flex-1 bg-transparent p-4 font-mono text-sm text-gray-300 resize-none focus:outline-none placeholder-gray-600"
        spellCheck={false}
      />
    </div>
  );
}