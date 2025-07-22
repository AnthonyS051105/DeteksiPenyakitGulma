// Utility functions for image upload and AI processing

/**
 * Upload image to ImgBB
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<string>} - Returns the image URL
 */
export const uploadToImgBB = async (imageFile) => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error(
      "ImgBB API key not configured. Please add NEXT_PUBLIC_IMGBB_API_KEY to your environment variables."
    );
  }

  console.log(
    "Uploading to ImgBB with API key:",
    apiKey.substring(0, 8) + "..."
  );
  console.log("File details:", {
    name: imageFile.name,
    size: imageFile.size,
    type: imageFile.type,
  });

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("key", apiKey);

  try {
    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    console.log("ImgBB response status:", response.status);

    const data = await response.json();
    console.log("ImgBB response data:", data);

    if (data.success) {
      console.log("Image uploaded successfully to ImgBB:", data.data.url);
      console.log("ImgBB image details:", {
        url: data.data.url,
        display_url: data.data.display_url,
        size: data.data.size,
        delete_url: data.data.delete_url,
      });
      return data.data.url;
    } else {
      throw new Error(data.error?.message || "Failed to upload image to ImgBB");
    }
  } catch (error) {
    console.error("ImgBB upload error:", error);

    if (error.message.includes("fetch")) {
      throw new Error(
        "Tidak dapat terhubung ke ImgBB. Periksa koneksi internet Anda."
      );
    } else {
      throw new Error(`ImgBB upload failed: ${error.message}`); 
    }
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
    throw new Error(
      "AI Service URL not configured. Please add NEXT_PUBLIC_AI_SERVICE_URL to your environment variables."
    );
  }

  try {
    console.log("Processing with LeafGuard AI:", imageUrl);
    console.log("AI Service URL:", aiServiceUrl);

  const response = await fetch(`${aiServiceUrl}/predict-disease/url`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        image_url: imageUrl,
      }),
    });

    console.log("AI Service response status:", response.status);
    console.log(
      "AI Service response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Service error response:", errorText);
      throw new Error(`AI Service error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("LeafGuard AI result:", result);

    return {
      success: true,
      prediction:
        result.prediction ||
        result.result ||
        result.class ||
        "Tidak terdeteksi penyakit",
      confidence: result.confidence || null,
      description:
        result.description ||
        result.message ||
        "Analisis penyakit daun telah selesai. Sistem AI telah menganalisis gambar daun yang Anda upload.",
      recommendation:
        result.recommendation ||
        result.treatment ||
        "Silakan konsultasikan dengan ahli pertanian untuk penanganan lebih lanjut. Lakukan pemantauan rutin pada tanaman.",
      processed_image_url: result.processed_image_url || null,
      raw_result: result,
    };
  } catch (error) {
    console.error("LeafGuard AI processing error:", error);

    // Provide more specific error messages
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Tidak dapat terhubung ke AI service. Periksa koneksi internet atau coba lagi nanti."
      );
    } else if (error.message.includes("CORS")) {
      throw new Error(
        "CORS error: AI service mungkin tidak mengizinkan akses dari domain ini."
      );
    } else {
      throw new Error(`AI processing failed: ${error.message}`);
    }
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
    throw new Error(
      "AI Service URL not configured. Please add NEXT_PUBLIC_AI_SERVICE_URL to your environment variables."
    );
  }

  try {
    console.log("Processing with NeuraWeed AI:", imageUrl);
    console.log("AI Service URL:", aiServiceUrl);

    const response = await fetch(`${aiServiceUrl}/detect-weed/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        image_url: imageUrl,
      }),
    });

    console.log("AI Service response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Service error response:", errorText);
      throw new Error(`AI Service error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("NeuraWeed AI result:", result);

    return {
      success: true,
      prediction:
        result.prediction ||
        result.result ||
        result.class ||
        "Tidak terdeteksi gulma",
      confidence: result.confidence || null,
      description:
        result.description ||
        result.message ||
        "Analisis deteksi gulma telah selesai. Sistem AI telah menganalisis area sekitar tanaman.",
      recommendation:
        result.recommendation ||
        result.treatment ||
        "Silakan lakukan pembersihan gulma jika diperlukan. Gunakan metode yang ramah lingkungan.",
      processed_image_url: result.processed_image_url || null,
      raw_result: result,
    };
  } catch (error) {
    console.error("NeuraWeed AI processing error:", error);

    // Provide more specific error messages
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Tidak dapat terhubung ke AI service. Periksa koneksi internet atau coba lagi nanti."
      );
    } else if (error.message.includes("CORS")) {
      throw new Error(
        "CORS error: AI service mungkin tidak mengizinkan akses dari domain ini."
      );
    } else {
      throw new Error(`AI processing failed: ${error.message}`);
    }
  }
};

/**
 * Legacy function for backward compatibility
 * @param {string} imageUrl - URL of the image to process
 * @param {string} serviceType - 'leafguard' or 'neuraweed'
 * @returns {Promise<Object>} - Returns AI processing result
 */
export const processWithAI = async (imageUrl, serviceType) => {
  if (serviceType === "leafguard") {
    return await processWithLeafGuardAI(imageUrl);
  } else if (serviceType === "neuraweed") {
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
export const base64ToBlob = (base64Data, contentType = "image/jpeg") => {
  const byteCharacters = atob(base64Data.split(",")[1]);
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
    return { success: false, error: "AI Service URL not configured" };
  }

  console.log("Checking AI service health at:", aiServiceUrl);

  try {
    // Try to check the docs endpoint which should exist
    const response = await fetch(`${aiServiceUrl}/docs`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 seconds timeout
    });

    console.log("Health check response status:", response.status);

    // If we get 200 or 307 (redirect), service is running
    if (response.status === 200 || response.status === 307) {
      return { success: true, status: "AI service is running and accessible" };
    } else if (response.status === 404) {
      // 404 on /docs might be normal, try root endpoint
      const rootResponse = await fetch(`${aiServiceUrl}/`, {
        method: "GET",
        signal: AbortSignal.timeout(5000),
      });
      if (rootResponse.status < 500) {
        return { success: true, status: "AI service is running" };
      }
      return {
        success: false,
        error: `Service returned status: '${response.status}`,
      };
    } else {
      return {
        success: false,
        error: `Service returned status: ${response.status}`,
      };
    }
  } catch (error) {
    console.error("AI Service health check error:", error);

    // Check if it's a timeout
    if (error.name === "TimeoutError") {
      return {
        success: false,
        error: "Service timeout - mungkin sedang cold start",
      };
    }

    // Check if it's a CORS error or network error (which might mean the service is running)
    if (error.message.includes("CORS")) {
      return {
        success: true,
        status: "Service running (CORS policy active)",
        warning: true,
      };
    } else if (
      error.message.includes("fetch") ||
      error.message.includes("network")
    ) {
      return {
        success: false,
        error: "Network error - periksa koneksi atau URL service",
      };
    }

    return { success: false, error: `Connection failed: '${error.message}'` };
  }
};

/**
 * Test ImgBB API key validity
 * @returns {Promise<Object>} - Returns API key status
 */
export const testImgBBApiKey = async () => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    return { success: false, error: "ImgBB API key not configured" };
  }

  try {
    // Create a small test image (1x1 pixel PNG)
    const testImageData =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

    const formData = new FormData();
    formData.append("image", testImageData);
    formData.append("key", apiKey);

    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (data.success) {
      return { success: true, status: "ImgBB API key is valid and working" };
    } else {
      return {
        success: false,
        error: data.error?.message || "Invalid API key",
      };
    }
  } catch (error) {
    return { success: false, error: `ImgBB test failed: '${error.message}'` };
  }
};