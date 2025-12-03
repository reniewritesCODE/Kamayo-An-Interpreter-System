"use client"

import { useState } from "react"
import CodeInputPanel from "@/components/code-input-panel"
import CodeOutputPanel from "@/components/code-output-panel"
import Mips64OutputPanel from "@/components/mips64-output-panel"
import MachineCodeOutputPanel from "@/components/machinecode-output-panel"

// Inside app/page.tsx

export default function Home() {
  // Existing state...
  const [codeInput, setCodeInput] = useState("");
  const [codeOutput, setCodeOutput] = useState("");
  
  // 1. ADD THIS: State for the CFG process list
  const [cfgSteps, setCfgSteps] = useState<string[]>([]); 
  const [isLoading, setIsLoading] = useState(false);

  // 2. UPDATE THIS: The handleRun function to fetch from your API
  const handleRun = async () => {
    setIsLoading(true);
    setCodeOutput("Running...");
    setCfgSteps([]); // Clear previous steps

    try {
      const res = await fetch('/api/interpret', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeInput }),
      });

      const data = await res.json();

      if (data.error) {
        setCodeOutput("Error:\n" + data.error);
        setCfgSteps(["Parsing Failed."]);
      } else {
        setCodeOutput(data.output);
        // Assuming your backend returns an array of strings in 'steps'
        setCfgSteps(data.steps || ["No CFG steps returned."]); 
      }
    } catch (error) {
      setCodeOutput("System Error: Failed to connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-[#0a0a0a] p-4 flex flex-col">
      {/* ... Header ... */}
      
      <div className="flex-1 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
           {/* Update props if needed to handle loading state */}
          <CodeInputPanel 
             value={codeInput} 
             onChange={setCodeInput} 
             onRun={handleRun} 
             loading={isLoading} 
          />
          <Mips64OutputPanel/>
        </div>
        <div className="flex flex-col gap-4">
          <CodeOutputPanel output={codeOutput} />
          <MachineCodeOutputPanel/>
        </div>

        {/* 3. PASS THE STATE HERE */}
        {/* <CFGProcessPanel steps={cfgSteps} /> */}
      </div>
    </div>
  );
}