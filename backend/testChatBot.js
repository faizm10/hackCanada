require("dotenv").config();
const { getLegalAdvice } = require("./fetchGoogleGermini"); // Ensure the correct filename

async function runTest() {
  try {
    const userId = "testUser123"; // A test user ID
    const message = "Can my landlord evict me without notice?";
    const province = "ontario"; // Test with "bc" or other provinces

    console.log("User Question:", message);
    const response = await getLegalAdvice(userId, message, province);
    console.log("AI Response:", response);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

runTest();
