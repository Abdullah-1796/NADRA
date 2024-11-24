import axios from "axios";

async function recognizeFace(imageURL_1, imageURL_2) {
    const apiKey = '8563cCZkrXVeku03Zcg4JDdxCn4CC_lN';
    const apiSecret = 'hIqpwBC_JEbjs_cUupmJPkogTkfUco5d';
    const url = "https://api-us.faceplusplus.com/facepp/v3/compare";

    try {
        const response = await axios.post(
            url,
            {
                api_key: apiKey,
                api_secret: apiSecret,
                image_url1: imageURL_1,
                image_url2: imageURL_2,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded", // Required for Face++ APIs
                },
            }
        );

        const { confidence, thresholds } = response.data;
        console.log("Comparison Result:", response.data);

        // Check if the confidence score meets a certain threshold (e.g., 80%)
        const threshold = thresholds["1e-3"]; // Confidence threshold for 1:1000 false acceptance rate
        if (confidence >= threshold) {
            console.log(`Match Found! Confidence: ${confidence}`);
            return { match: true, confidence };
        } else {
            console.log(`No Match! Confidence: ${confidence}`);
            return { match: false, confidence };
        }
    } catch (error) {
        console.error("Error comparing faces:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export default recognizeFace;