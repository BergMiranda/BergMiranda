'use client';
import { useEffect, useRef } from 'react';
import SignaturePad from 'signature_pad';

export default function SignatureCapture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const pad = new SignaturePad(canvasRef.current);
    return () => pad.off();
  }, []);
  return <canvas ref={canvasRef} width={300} height={150} className="border rounded-xl bg-white" />;
}
