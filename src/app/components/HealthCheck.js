"use client";

import { useState, useEffect } from "react";
import { checkAIServiceHealth, testImgBBApiKey } from "../../utils/imageUpload";

export default function HealthCheck() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [imgbbStatus, setImgbbStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      setIsLoading(true);
      try {
        // Check AI service
        const status = await checkAIServiceHealth();
        console.log('Health check result:', status);
        setHealthStatus(status);
        
        // Check ImgBB API key
        const imgbbResult = await testImgBBApiKey();
        console.log('ImgBB test result:', imgbbResult);
        setImgbbStatus(imgbbResult);
      } catch (error) {
        console.error('Health check error:', error);
        setHealthStatus({ success: false, error: error.message });
      } finally {
        setIsLoading(false);
      }
    };

    checkHealth();
    
    // Check health every 2 minutes (less frequent to avoid rate limiting)
    const interval = setInterval(checkHealth, 120000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded-lg text-xs z-50">
        🔄 Checking AI Service...
      </div>
    );
  }

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-100 border-gray-400 text-gray-700';
    if (status.success) {
      return status.warning 
        ? 'bg-yellow-100 border-yellow-400 text-yellow-700'
        : 'bg-green-100 border-green-400 text-green-700';
    }
    return 'bg-red-100 border-red-400 text-red-700';
  };

  const getStatusIcon = (status) => {
    if (!status) return '❓';
    if (status.success) {
      return status.warning ? '⚠️' : '✅';
    }
    return '❌';
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {/* AI Service Status */}
      <div 
        className={`px-3 py-2 rounded-lg text-xs cursor-pointer ${getStatusColor(healthStatus)}`}
        title={healthStatus?.error || healthStatus?.status || 'Click for details'}
        onClick={() => {
          if (healthStatus) {
            alert(`AI Service Status:\n\n${healthStatus.success ? '✅ ' + (healthStatus.status || 'Online') : '❌ Offline: ' + (healthStatus.error || 'Unknown error')}\n\nURL: ${process.env.NEXT_PUBLIC_AI_SERVICE_URL}\n\nNote: Even if health check shows issues, the AI processing might still work when you upload images.`);
          }
        }}
      >
        {getStatusIcon(healthStatus)} AI Service
      </div>
      
      {/* ImgBB Status */}
      <div 
        className={`px-3 py-2 rounded-lg text-xs cursor-pointer ${getStatusColor(imgbbStatus)}`}
        title={imgbbStatus?.error || imgbbStatus?.status || 'Click for details'}
        onClick={() => {
          if (imgbbStatus) {
            alert(`ImgBB Status:\n\n${imgbbStatus.success ? '✅ ' + (imgbbStatus.status || 'Working') : '❌ Error: ' + (imgbbStatus.error || 'Unknown error')}\n\nNote: Make sure your ImgBB API key is correctly configured in environment variables.`);
          }
        }}
      >
        {getStatusIcon(imgbbStatus)} ImgBB
      </div>
    </div>
  );
}