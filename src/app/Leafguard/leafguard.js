"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Leafguard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [analysisResult, setAnalysisResult] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [pullUpHeight, setPullUpHeight] = useState(80); // Starting height in pixels
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [initialHeight, setInitialHeight] = useState(80);
  const fileInputRef = useRef(null);
  const pullUpRef = useRef(null);

  const MIN_HEIGHT = 80; // Minimum height (collapsed)
  const MAX_HEIGHT = 600; // Maximum height (expanded)
  const SNAP_THRESHOLD = 50; // Threshold for snapping

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsProcessed(false);
      setProcessedImageUrl(null);
      setAnalysisResult("");
      setPullUpHeight(MIN_HEIGHT);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleProcess = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setProcessedImageUrl(previewUrl);
      setAnalysisResult("Terdeteksi penyakit bercak daun dengan tingkat keparahan sedang. Rekomendasi: Gunakan fungisida berbahan aktif mankozeb dan lakukan pemangkasan daun yang terinfeksi. Tingkatkan sirkulasi udara di sekitar tanaman untuk mencegah penyebaran lebih lanjut.");
      setIsProcessing(false);
      setIsProcessed(true);
    }, 3000);
  };

  // Handle mouse events for drag
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setInitialHeight(pullUpHeight);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaY = startY - e.clientY; // Inverted because pulling up decreases Y
    const newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, initialHeight + deltaY));
    setPullUpHeight(newHeight);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Snap to nearest position
    if (pullUpHeight < MIN_HEIGHT + SNAP_THRESHOLD) {
      setPullUpHeight(MIN_HEIGHT);
    } else if (pullUpHeight > MAX_HEIGHT - SNAP_THRESHOLD) {
      setPullUpHeight(MAX_HEIGHT);
    } else if (pullUpHeight < (MIN_HEIGHT + MAX_HEIGHT) / 2) {
      setPullUpHeight(MIN_HEIGHT);
    } else {
      setPullUpHeight(MAX_HEIGHT);
    }
    
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setInitialHeight(pullUpHeight);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const deltaY = startY - e.touches[0].clientY;
    const newHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, initialHeight + deltaY));
    setPullUpHeight(newHeight);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // Snap to nearest position
    if (pullUpHeight < MIN_HEIGHT + SNAP_THRESHOLD) {
      setPullUpHeight(MIN_HEIGHT);
    } else if (pullUpHeight > MAX_HEIGHT - SNAP_THRESHOLD) {
      setPullUpHeight(MAX_HEIGHT);
    } else if (pullUpHeight < (MIN_HEIGHT + MAX_HEIGHT) / 2) {
      setPullUpHeight(MIN_HEIGHT);
    } else {
      setPullUpHeight(MAX_HEIGHT);
    }
  };

  // Calculate content opacity based on height
  const contentOpacity = Math.max(0, (pullUpHeight - MIN_HEIGHT) / (MAX_HEIGHT - MIN_HEIGHT));
  const isExpanded = pullUpHeight > (MIN_HEIGHT + MAX_HEIGHT) / 2;

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#139186] mb-4" style={{ fontFamily: 'cursive' }}>
            LeafGuard
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            LeafGuard yaitu Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque 
            id sem vel nibh hendrerit pulvinar. In vitae tellus dictum, rhoncus lacus at, rhoncus est. 
            Fusce non dui orci. Vestibulum pharetra at risus rhoncus auctor. Aenean ut nunc velit.
          </p>
        </div>

        {/* Steps Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#139186] text-center mb-8">
            LANGKAH-LANGKAH
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#C8E6C9] rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-[#139186] mb-4">1</div>
              <p className="text-[#139186] font-semibold">
                AMBIL FOTO<br />
                KONDISI DAUN<br />
                PADA TANAMAN<br />
                ANDA
              </p>
            </div>
            <div className="bg-[#C8E6C9] rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-[#139186] mb-4">2</div>
              <p className="text-[#139186] font-semibold">
                LAMPIRKAN<br />
                FOTO PADA<br />
                FITUR YANG<br />
                TERSEDIA
              </p>
            </div>
            <div className="bg-[#C8E6C9] rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-[#139186] mb-4">3</div>
              <p className="text-[#139186] font-semibold">
                KLIK PROSES<br />
                DAN TUNGGU<br />
                HASIL DETEKSI<br />
                PENYAKIT DAUN<br />
                PADA TANAMAN<br />
                ANDA
              </p>
            </div>
          </div>
        </div>

        {/* Upload and Process Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {/* File Upload Section */}
          <div className="mb-8">
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                Choose file
              </button>
              <span className="py-2 text-gray-600">
                {selectedFile ? selectedFile.name : "Unggah file/foto di sini"}
              </span>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Preview Sections */}
          <div className={`grid gap-8 mb-8 ${isProcessed ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
            {/* Preview Input - Always shown */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Preview Input</h3>
              <div
                className={`w-full h-80 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors ${
                  isDragOver ? 'border-[#139186] bg-[#C8E6C9]' : 'border-gray-300 bg-gray-50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {previewUrl ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <p>Drag & drop gambar di sini</p>
                    <p>atau klik Choose file</p>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Output - Only shown after processing */}
            {isProcessed && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Preview Output</h3>
                <div className="w-full h-80 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg flex items-center justify-center">
                  {processedImageUrl ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={processedImageUrl}
                        alt="Processed Result"
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <p>Hasil segmentasi akan ditampilkan di sini</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Process Button */}
          <div className="text-center">
            <button
              onClick={handleProcess}
              disabled={!selectedFile || isProcessing}
              className={`px-12 py-3 rounded-full text-white font-semibold text-lg transition-all ${
                !selectedFile || isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#139186] hover:bg-[#0F7A70] active:scale-95'
              }`}
            >
              {isProcessing ? 'MEMPROSES...' : isProcessed ? 'PROSES BERHASIL' : 'PROSES'}
            </button>
          </div>
        </div>
      </div>

      {/* Draggable Pull-up Panel - Only shown after processing */}
      {isProcessed && (
        <div
          ref={pullUpRef}
          className="fixed bottom-0 left-0 right-0 bg-[#139186] rounded-t-3xl shadow-2xl transition-all duration-300 ease-out z-40"
          style={{
            height: `${pullUpHeight}px`,
            transform: isDragging ? 'none' : 'translateY(0)',
          }}
        >
          {/* Drag Handle */}
          <div
            className="w-full p-4 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="w-12 h-1 bg-white/40 rounded-full mx-auto mb-2"></div>
            <p className="text-white text-center font-semibold">
              {isExpanded ? 'TARIK KE BAWAH UNTUK TUTUP' : 'TARIK UNTUK DESKRIPSI HASIL DETEKSI'}
            </p>
            <div className="text-center mt-1">
              <span className="text-white text-lg">
                {isExpanded ? '⬇️' : '⬆️'}
              </span>
            </div>
          </div>

          {/* Content Area */}
          <div 
            className="px-6 pb-6 overflow-hidden"
            style={{ 
              opacity: contentOpacity,
              height: `${pullUpHeight - 80}px`
            }}
          >
            {pullUpHeight > MIN_HEIGHT + 50 && (
              <>
                <h3 className="text-white text-lg font-semibold mb-4 text-center">
                  PREVIEW OUTPUT
                </h3>
                
                {/* Processed Image */}
                <div className="bg-white rounded-lg p-4 mb-4 overflow-hidden">
                  {processedImageUrl && (
                    <div className="relative w-full h-48">
                      <Image
                        src={processedImageUrl}
                        alt="Hasil Segmentasi"
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Analysis Description */}
                {pullUpHeight > 300 && (
                  <div className="bg-[#0F7A70] rounded-lg p-4">
                    <h4 className="text-white text-sm font-semibold mb-2 text-center">
                      DESKRIPSI HASIL DETEKSI
                    </h4>
                    <p className="text-white text-sm leading-relaxed text-center">
                      {analysisResult}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
