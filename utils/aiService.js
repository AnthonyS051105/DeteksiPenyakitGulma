import axios from "axios";

const AI_SERVICE_URL =
  process.env.NEXT_PUBLIC_AI_SERVICE_URL ||
  "https://nafalrust-plantweb.hf.space";

// Untuk halaman Neuraweed - deteksi gulma
export const detectWeedFromUrl = async (imageUrl) => {
  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/detect-weed/link`,
      {
        image_url: imageUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000, // 30 second timeout
      }
    );

    return {
      success: true,
      result: response.data.result,
      data: response.data,
    };
  } catch (error) {
    console.error("Weed detection error:", error);
    return {
      success: false,
      error: error.response?.data?.error || error.message,
    };
  }
};

// Untuk halaman Leafguard - deteksi penyakit daun
export const detectDiseaseFromUrl = async (imageUrl) => {
  try {
    const response = await axios.post(
      `${AI_SERVICE_URL}/predict-disease/link`,
      {
        image_url: imageUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    return {
      success: true,
      result: response.data.result,
      data: response.data,
    };
  } catch (error) {
    console.error("Disease detection error:", error);
    return {
      success: false,
      error: error.response?.data?.error || error.message,
    };
  }
};

// Health check
export const checkAIServiceHealth = async () => {
  try {
    const response = await axios.get(`${AI_SERVICE_URL}/health`, {
      timeout: 5000,
    });
    return {
      success: true,
      status: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
