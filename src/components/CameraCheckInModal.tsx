'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Landmark } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface CameraCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  landmark: Landmark;
  onCheckInComplete: (photoUrl: string) => void;
}

export default function CameraCheckInModal({ isOpen, onClose, landmark, onCheckInComplete }: CameraCheckInModalProps) {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    stopCamera();
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setError("Không thể truy cập camera. Vui lòng cấp quyền hoặc thử lại.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    
    // Draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Add overlays programmatically on canvas to save them in image
    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px Arial';
    ctx.fillText(t(landmark.name), 40, 80);
    
    const date = new Date().toLocaleString('vi-VN');
    ctx.font = '24px Arial';
    ctx.fillText(date, 40, 120);

    ctx.font = 'bold 30px Arial';
    ctx.fillText('Khám Phá Việt Nam', canvas.width - 320, canvas.height - 40);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    
    setTimeout(() => {
      onCheckInComplete(dataUrl);
      onClose();
    }, 500);
  };

  const handleDemoCapture = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 200);
    const demoUrl = "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800";
    setTimeout(() => {
      onCheckInComplete(demoUrl);
      onClose();
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Main Viewfinder */}
      <div className="relative w-full h-full max-w-2xl mx-auto flex items-center justify-center">
        {error ? (
          <div className="text-white text-center p-6 bg-red-900/50 rounded-xl m-4">
            <p className="text-xl mb-4">⚠️ {error}</p>
            <button 
              onClick={handleDemoCapture}
              className="px-6 py-3 bg-white text-black font-bold rounded-full"
            >
              Chụp Demo / Demo Capture
            </button>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
          />
        )}

        {/* AR Overlay UI */}
        {!error && (
          <div className="absolute inset-0 pointer-events-none border-8 border-transparent" style={{ borderImage: 'linear-gradient(to right, #4ade80, #3b82f6) 1' }}>
            {/* Top Info */}
            <div className="absolute top-8 left-8 text-white drop-shadow-lg text-shadow">
              <h2 className="text-2xl md:text-4xl font-bold">{t(landmark.name)}</h2>
              <p className="text-sm md:text-lg opacity-90">{new Date().toLocaleString('vi-VN')}</p>
            </div>
            
            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white m-4 opacity-70"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white m-4 opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white m-4 opacity-70"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white m-4 opacity-70"></div>

            {/* Bottom Left Sticker */}
            <div className="absolute bottom-32 left-8 bg-white/20 backdrop-blur rounded-full p-2 flex items-center gap-2">
              <span className="text-4xl">🐉</span>
              <span className="text-white font-bold bg-amber-500 px-2 py-0.5 rounded-full text-xs">Lv.1</span>
            </div>

            {/* Bottom Right Watermark */}
            <div className="absolute bottom-32 right-8 text-white font-bold text-lg md:text-xl drop-shadow-lg opacity-80 text-right">
              <p>Khám Phá</p>
              <p>Việt Nam</p>
            </div>
          </div>
        )}

        {/* Flash Effect */}
        {isFlashing && <div className="absolute inset-0 bg-white z-10 animate-ping"></div>}
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex gap-4">
        {!error && (
          <button 
            onClick={() => setFacingMode(prev => prev === 'environment' ? 'user' : 'environment')}
            className="w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur hover:bg-black/70"
          >
            <span className="text-xl">🔄</span>
          </button>
        )}
        <button 
          onClick={onClose}
          className="w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur hover:bg-red-500/80"
        >
          ✕
        </button>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
        {!error ? (
          <button 
            onClick={handleCapture}
            className="w-20 h-20 bg-white/30 rounded-full p-2 backdrop-blur-sm border-2 border-white/50 active:scale-95 transition-transform"
          >
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-black font-bold shadow-inner">
              📸
            </div>
          </button>
        ) : null}
      </div>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
