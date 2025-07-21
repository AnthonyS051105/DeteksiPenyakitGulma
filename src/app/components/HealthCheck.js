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
        setHealthStatus(status);
      } catch (error) {
        setHealthStatus({ success: false, error: error.message });
      } finally {
        setIsLoading(false);
      }
    };

    checkHealth();
    
    // Check health every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    
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
    <div className={`fixed top-4 right-4 px-3 py-2 rounded-lg text-sm z-50 ${
      healthStatus?.success 
        ? 'bg-green-100 border border-green-400 text-green-700' 
        : 'bg-red-100 border border-red-400 text-red-700'
    }`}>
      {healthStatus?.success ? '✅ AI Service Online' : '❌ AI Service Offline'}
    </div>
  );
}