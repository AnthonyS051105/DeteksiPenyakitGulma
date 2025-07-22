/**
 * Upload image directly to AI service and predict disease
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<Object>} - Returns AI processing result
 */
export const processWithLeafGuardAI = async (imageFile) => {
  const aiServiceUrl = process.env.NEXT_PUBLIC_AI_SERVICE_URL;

  if (!aiServiceUrl) {
    throw new Error("AI Service URL not configured.");
  }

  try {
    console.log("Uploading and processing with LeafGuard AI:", imageFile.name);

    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await fetch(`${aiServiceUrl}/predict-disease/upload`, {
      method: "POST",
      body: formData,
    });

    console.log("LeafGuard AI response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI Service error: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("LeafGuard AI result:", result);

    return {
      success: true,
      prediction: result.prediction || result.result || result.class || "Tidak terdeteksi penyakit",
      confidence: result.confidence || null,
      description: result.description || result.message || "Analisis selesai.",
      recommendation: result.recommendation || result.treatment || "Konsultasikan dengan ahli pertanian.",
      processed_image_url: result.processed_image_url || null,
      raw_result: result,
    };
  } catch (error) {
    console.error("LeafGuard AI error:", error);
    throw new Error(`LeafGuard AI failed: ${error.message}`);
  }
};

/**
 * Upload image to weed detection AI and receive processed image
 * @param {File} imageFile - Image file to upload
 * @returns {Promise<Object>} - Result with image URL
 */
export const processWithNeuraWeedAI = async (imageFile) => {
  const aiServiceUrl = process.env.NEXT_PUBLIC_AI_SERVICE_URL;

  if (!aiServiceUrl) {
    throw new Error("AI Service URL not configured.");
  }

  try {
    console.log("Uploading to NeuraWeed AI:", imageFile.name);

    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await fetch(`${aiServiceUrl}/detect-weed/upload`, {
      method: "POST",
      body: formData,
    });

    console.log("NeuraWeed AI response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI Service error: ${response.status} - ${errorText}`);
    }

    // Convert blob response (image) to object URL
    const imageBlob = await response.blob();
    const imageObjectUrl = URL.createObjectURL(imageBlob);

    return {
      success: true,
      processed_image_url: imageObjectUrl,
      description: "Berhasil mendeteksi gulma pada gambar.",
    };
  } catch (error) {
    console.error("NeuraWeed AI error:", error);
    throw new Error(`NeuraWeed AI failed: ${error.message}`);
  }
};
