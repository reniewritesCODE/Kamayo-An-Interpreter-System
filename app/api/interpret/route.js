// src/app/api/run/route.js
import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req) {
  try {
    const { code } = await req.json();

    // Locate the executable relative to the current working directory
    const executablePath = path.join(process.cwd(), 'bin', 'interpret');

    return new Promise((resolve) => {
      const child = spawn(executablePath, {
        timeout: 2000 // 2-second timeout for security
      });

      let outputData = '';
      let errorData = '';

      // Send the user's code to the interpreter
      child.stdin.write(code);
      child.stdin.end();

      child.stdout.on('data', (data) => {
        outputData += data.toString();
      });

      child.stderr.on('data', (data) => {
        errorData += data.toString();
      });

      child.on('close', (exitCode) => {
        if (exitCode !== 0) {
          resolve(NextResponse.json({ error: errorData || 'Unknown Error' }, { status: 400 }));
        } else {
          resolve(NextResponse.json({ output: outputData }));
        }
      });

      child.on('error', (err) => {
        resolve(NextResponse.json({ error: 'Failed to run interpreter: ' + err.message }, { status: 500 }));
      });
    });

  } catch (error) {
    return NextResponse.json({ error: 'Invalid Request' }, { status: 500 });
  }
}