// Utility functions for image upload and AI processing

/**
 * Upload image to ImgBB
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<string>} - Returns the image URL
 */
export const uploadToImgBB = async (imageFile) => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  
  if (!apiKey) {
    throw new Error('ImgBB API key not configured. Please add NEXT_PUBLIC_IMGBB_API_KEY to your environment variables.');
  }

  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('key', apiKey);

  try {
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('Image uploaded successfully to ImgBB:', data.data.url);
      return data.data.url;
    } else {
      throw new Error(data.error?.message || 'Failed to upload image to ImgBB');
    }
  } catch (error) {
    console.error('ImgBB upload error:', error);
    throw new Error(`ImgBB upload failed: ${error.message}`);
  }
};

/**
 * Process image with AI service for disease detection (LeafGuard)
 * @param {string} imageUrl - URL of the image to process
 * @returns {Promise<Object>} - Returns AI processing result
 */
export const processWithLeafGuardAI = async (imageUrl) => {
  const aiServiceUrl = process.env.NEXT_PUBLIC_AI_SERVICE_URL;
  
  if (!aiServiceUrl) {
    throw new Error('AI Service URL not configured. Please add NEXT_PUBLIC_AI_SERVICE_URL to your environment variables.');
  }

  try {
    console.log('Processing with LeafGuard AI:', imageUrl);
    
    const response = await fetch(`${aiServiceUrl}/predict-disease/link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: imageUrl,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI Service error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('LeafGuard AI result:', result);
    
    return {
      success: true,
      prediction: result.result || result.prediction || 'Tidak terdeteksi penyakit',
      confidence: result.confidence || null,
      description: result.description || 'Analisis penyakit daun telah selesai.',
      recommendation: result.recommendation || 'Silakan konsultasikan dengan ahli pertanian untuk penanganan lebih lanjut.',
      processed_image_url: result.processed_image_url || null,
      raw_result: result
    };
  } catch (error) {
    console.error('LeafGuard AI processing error:', error);
    throw new Error(`AI processing failed: ${error.message}`);
  }
};

/**
 * Process image with AI service for weed detection (NeuraWeed)
 * @param {string} imageUrl - URL of the image to process
 * @returns {Promise<Object>} - Returns AI processing result
 */
export const processWithNeuraWeedAI = async (imageUrl) => {
  const aiServiceUrl = process.env.NEXT_PUBLIC_AI_SERVICE_URL;
  
  if (!aiServiceUrl) {
    throw new Error('AI Service URL not configured. Please add NEXT_PUBLIC_AI_SERVICE_URL to your environment variables.');
  }

  try {
    console.log('Processing with NeuraWeed AI:', imageUrl);
    
    const response = await fetch(`${aiServiceUrl}/detect-weed/link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: imageUrl,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI Service error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log('NeuraWeed AI result:', result);
    
    return {
      success: true,
      prediction: result.result || result.prediction || 'Tidak terdeteksi gulma',
      confidence: result.confidence || null,
      description: result.description || 'Analisis deteksi gulma telah selesai.',
      recommendation: result.recommendation || 'Silakan lakukan pembersihan gulma jika diperlukan.',
      processed_image_url: result.processed_image_url || null,
      raw_result: result
    };
  } catch (error) {
    console.error('NeuraWeed AI processing error:', error);
    throw new Error(`AI processing failed: ${error.message}`);
  }
};

/**
 * Legacy function for backward compatibility
 * @param {string} imageUrl - URL of the image to process
 * @param {string} serviceType - 'leafguard' or 'neuraweed'
 * @returns {Promise<Object>} - Returns AI processing result
 */
export const processWithAI = async (imageUrl, serviceType) => {
  if (serviceType === 'leafguard') {
    return await processWithLeafGuardAI(imageUrl);
  } else if (serviceType === 'neuraweed') {
    return await processWithNeuraWeedAI(imageUrl);
  } else {
    throw new Error(`Unknown service type: ${serviceType}`);
  }
};

/**
 * Convert base64 to blob for file upload
 * @param {string} base64Data - Base64 encoded image data
 * @param {string} contentType - MIME type of the image
 * @returns {Blob} - Blob object
 */
export const base64ToBlob = (base64Data, contentType = 'image/jpeg') => {
  const byteCharacters = atob(base64Data.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};

/**
 * Health check for AI service
 * @returns {Promise<Object>} - Returns health status
 */
export const checkAIServiceHealth = async () => {
  const aiServiceUrl = process.env.NEXT_PUBLIC_AI_SERVICE_URL;
  
  if (!aiServiceUrl) {
    return { success: false, error: 'AI Service URL not configured' };
  }

  try {
    // Try to access the main page first since /health endpoint might not exist
    const response = await fetch(`${aiServiceUrl}/`, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    if (response.ok || response.status === 200) {
      return { success: true, status: 'AI Service is accessible' };
    } else {
      return { success: false, error: `Service returned status: ${response.status}` };
    }
  } catch (error) {
    console.error('AI Service health check error:', error);
    return { success: false, error: `Connection failed: ${error.message}` };
  }
};