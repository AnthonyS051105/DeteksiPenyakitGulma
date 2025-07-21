"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function Leafguard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [analysisResult, setAnalysisResult] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsProcessed(false);
      setProcessedImageUrl(null);
      setAnalysisResult("");
      setIsDetailViewOpen(false);
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
      // For demonstration, we'll use the original image with a placeholder effect
      // In real implementation, this would be the actual processed/segmented image
      setProcessedImageUrl(previewUrl); // Using the input image as placeholder
      setAnalysisResult("Terdeteksi penyakit bercak daun dengan tingkat keparahan sedang. Rekomendasi: Gunakan fungisida berbahan aktif mankozeb dan lakukan pemangkasan daun yang terinfeksi. Tingkatkan sirkulasi udara di sekitar tanaman untuk mencegah penyebaran lebih lanjut.");
      setIsProcessing(false);
      setIsProcessed(true);
    }, 3000);
  };

  const handlePullUp = () => {
    setIsDetailViewOpen(true);
  };

  const handleCloseDetailView = () => {
    setIsDetailViewOpen(false);
  };

  // Detail view overlay
  if (isDetailViewOpen) {
    return (
      <div className="fixed inset-0 bg-[#F5F5F5] z-50 overflow-auto">
        <div className="min-h-screen py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header with close button */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-[#139186]" style={{ fontFamily: 'cursive' }}>
                LeafGuard - Hasil Analisa
              </h1>
              <button
                onClick={handleCloseDetailView}
                className="text-[#139186] hover:text-[#0F7A70] text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Full Preview Output */}
            <div className="bg-[#139186] rounded-lg p-6">
              <h3 className="text-white text-xl font-semibold mb-6 text-center">
                PREVIEW OUTPUT
              </h3>
              
              {/* Large processed image */}
              <div className="bg-white rounded-lg p-6 mb-6">
                {processedImageUrl && (
                  <div className="relative w-full h-96">
                    <Image
                      src={processedImageUrl}
                      alt="Hasil Segmentasi"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Analysis description */}
              <div className="bg-[#0F7A70] rounded-lg p-6">
                <h4 className="text-white text-lg font-semibold mb-4 text-center">
                  DESKRIPSI HASIL DETEKSI
                </h4>
                <p className="text-white leading-relaxed text-center">
                  {analysisResult}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
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
        <div className="bg-white rounded-lg shadow-lg p-8">
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
          <div className="text-center mb-8">
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

        {/* Pull-up section - Only shown after processing */}
        {isProcessed && (
          <div className="mt-8">
            <div 
              className="bg-[#139186] rounded-lg p-6 cursor-pointer hover:bg-[#0F7A70] transition-colors"
              onClick={handlePullUp}
            >
              <p className="text-white text-center font-semibold">
                TARIK UNTUK DESKRIPSI HASIL DETEKSI
              </p>
              <div className="text-center mt-2">
                <span className="text-white text-xl">⬆️</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
