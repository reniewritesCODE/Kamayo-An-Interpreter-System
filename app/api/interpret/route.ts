import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req) {
  try {
    const { code } = await req.json();

    // 1. Point to your compiled C executable
    // Make sure 'kamayo_interpreter' exists in the 'bin' folder of your project
    const executablePath = path.join(process.cwd(), 'bin', 'interpret');

    return new Promise((resolve) => {
      const child = spawn(executablePath);
      
      let rawOutput = '';
      let errorOutput = '';

      // 2. Feed the code to the C program
      child.stdin.write(code);
      child.stdin.end();

      // 3. Capture Output
      child.stdout.on('data', (data) => {
        rawOutput += data.toString();
      });

      child.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      child.on('close', (exitCode) => {
        // --- PARSING LOGIC ---
        
        let stdOut = "";
        let asmOut = "";
        let machineOut = "";

        // Use a safe splitting strategy based on your C print statements
        if (rawOutput.includes("<<SECTION:ASM>>")) {
            const asmSplit = rawOutput.split("<<SECTION:ASM>>");
            stdOut = asmSplit[0].trim(); // Everything before the tag is "d", "21"
            
            if (asmSplit[1].includes("<<SECTION:MACHINE>>")) {
                const machSplit = asmSplit[1].split("<<SECTION:MACHINE>>");
                asmOut = machSplit[0].trim(); // The .data and .code part
                machineOut = machSplit[1].trim(); // The binary/hex part
            } else {
                asmOut = asmSplit[1].trim();
            }
        } else {
            // Fallback if no sections found (e.g. only print, no code gen)
            stdOut = rawOutput.trim();
        }

        resolve(NextResponse.json({
          output: stdOut,
          asm: asmOut,
          machine: machineOut,
          error: errorOutput, // Send syntax errors if any
        }));
      });
    });
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}