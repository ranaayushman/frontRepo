import ImageKit from "imagekit";

// Function to validate ImageKit configuration
function validateImageKitConfig() {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;
  
  if (!publicKey || !privateKey || !urlEndpoint) {
    console.error("Missing ImageKit configuration:", {
      publicKeyExists: !!publicKey,
      privateKeyExists: !!privateKey,
      urlEndpointExists: !!urlEndpoint
    });
    
    // Provide fallback to prevent errors but log warnings
    return {
      publicKey: publicKey || "missing-public-key",
      privateKey: privateKey || "missing-private-key",
      urlEndpoint: urlEndpoint || "https://ik.imagekit.io/gdgdhit"
    };
  }
  
  return {
    publicKey,
    privateKey,
    urlEndpoint
  };
}

const config = validateImageKitConfig();

const imagekit = new ImageKit({
  publicKey: config.publicKey,
  privateKey: config.privateKey,
  urlEndpoint: config.urlEndpoint,
});

// Simple test function to check if configuration works
export async function testImageKitConnection() {
  try {
    const result = await imagekit.getAuthenticationParameters();
    return { success: true, result };
  } catch (error) {
    console.error("ImageKit connection test failed:", error);
    return { success: false, error };
  }
}

export default imagekit;