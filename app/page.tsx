"use client";

import { useState } from "react";
import CodeInputPanel from "@/components/code-input-panel";
import CodeOutputPanel from "@/components/code-output-panel";
import MipsOutputPanel from "@/components/mips64-output-panel";
import MachineOutputPanel from "@/components/machinecode-output-panel";

export default function Home() {
  // 1. Initialize with an EMPTY string
  const [codeInput, setCodeInput] = useState("");

  const [stdOutput, setStdOutput] = useState("");
  const [asmOutput, setAsmOutput] = useState("");
  const [machineOutput, setMachineOutput] = useState("");
  
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    // 2. Check if input is empty BEFORE calling the server
    if (!codeInput.trim()) {
      setStdOutput("Please input code to run.");
      setAsmOutput("");
      setMachineOutput("");
      return; 
    }

    setLoading(true);
    setStdOutput("");
    setAsmOutput("");
    setMachineOutput("");

    try {
      const res = await fetch("/api/interpret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeInput }),
      });

      const data = await res.json();

      if (data.error && data.error.trim() !== "") {
        setStdOutput(`Syntax Error:\n${data.error}`);
      } else {
        setStdOutput(data.output || "No output.");
        setAsmOutput(data.asm || "// No assembly generated");
        setMachineOutput(data.machine || "// No machine code generated");
      }
    } catch (err) {
      setStdOutput("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 font-sans flex flex-col gap-4">
      {/* <header className="flex items-center justify-between px-2">
        <h1 className="text-xl font-bold tracking-widest text-blue-500">
          KAMAYO++ IDE
        </h1>
      </header> */}

      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4 min-h-0">
        <CodeInputPanel 
          code={codeInput} 
          setCode={setCodeInput} 
          onRun={handleRun} 
          loading={loading} 
        />
        <CodeOutputPanel output={stdOutput} />
        <MipsOutputPanel output={asmOutput} />
        <MachineOutputPanel output={machineOutput} />
      </div>
    </div>
  );
}