"use client";

import { useState, useEffect } from "react";
import { checkAIServiceHealth } from "../../utils/imageUpload";

export default function HealthCheck() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      setIsLoading(true);
      try {
        const status = await checkAIServiceHealth();
        console.log('Health check result:', status);
        setHealthStatus(status);
      } catch (error) {
        console.error('Health check error:', error);
        setHealthStatus({ success: false, error: error.message });
      } finally {
        setIsLoading(false);
      }
    };

    checkHealth();
    
    // Check health every 60 seconds (less frequent to avoid rate limiting)
    const interval = setInterval(checkHealth, 60000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded-lg text-sm z-50">
        🔄 Checking AI Service...
      </div>
    );
  }

  return (
    <div className={`fixed top-4 right-4 px-3 py-2 rounded-lg text-sm z-50 cursor-pointer ${
      healthStatus?.success 
        ? healthStatus?.warning
          ? 'bg-yellow-100 border border-yellow-400 text-yellow-700'
          : 'bg-green-100 border border-green-400 text-green-700'
        : 'bg-red-100 border border-red-400 text-red-700'
    }`}
    title={healthStatus?.error || healthStatus?.status || 'Click for details'}
    onClick={() => {
      if (healthStatus) {
        alert(`AI Service Status:\n\n${healthStatus.success ? '✅ ' + (healthStatus.status || 'Online') : '❌ Offline: ' + (healthStatus.error || 'Unknown error')}\n\nNote: Even if health check shows issues, the AI processing might still work when you upload images.`);
      }
    }}>
      {healthStatus?.success 
        ? healthStatus?.warning 
          ? '⚠️ AI Service (Limited Check)'
          : '✅ AI Service Online'
        : '❌ AI Service Offline'
      }
    </div>
  );
}