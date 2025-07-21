// Utility functions for image upload and AI processing

/**
 * Upload image to ImgBB
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<string>} - Returns the image URL
 */
export const uploadToImgBB = async (imageFile) => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  
  if (!apiKey) {
    throw new Error('ImgBB API key not configured');
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
      return data.data.url;
    } else {
      throw new Error(data.error?.message || 'Failed to upload image');
    }
  } catch (error) {
    console.error('ImgBB upload error:', error);
    throw error;
  }
};

/**
 * Process image with AI service
 * @param {string} imageUrl - URL of the image to process
 * @param {string} serviceType - 'leafguard' or 'neuraweed'
 * @returns {Promise<Object>} - Returns AI processing result
 */
export const processWithAI = async (imageUrl, serviceType) => {
  const aiServiceUrl = process.env.NEXT_PUBLIC_AI_SERVICE_URL;
  
  if (!aiServiceUrl) {
    throw new Error('AI Service URL not configured');
  }

  // Determine endpoint based on service type
  const endpoint = serviceType === 'leafguard' ? '/predict/disease' : '/predict/weed';
  
  try {
    const response = await fetch(`${aiServiceUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_url: imageUrl,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI Service error: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('AI Service error:', error);
    throw error;
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