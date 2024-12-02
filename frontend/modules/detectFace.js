import axios from "axios";

async function detectFace(imageURL) {
    const apiKey = '8563cCZkrXVeku03Zcg4JDdxCn4CC_lN';
    const apiSecret = 'hIqpwBC_JEbjs_cUupmJPkogTkfUco5d';
    const url = 'https://api-us.faceplusplus.com/facepp/v3/detect';

    try {
        const formData = new URLSearchParams();
        formData.append('api_key', apiKey);
        formData.append('api_secret', apiSecret);
        formData.append('image_url', imageURL);
        formData.append('return_attributes', 'gender,age');

        // Send Request
        const response = await axios.post(url, formData.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        //console.log('Face Detection Result:', response.data);
        return response.data;

    } catch (error) {
        if (error.response) {
            console.error("Response Error:", error.response.data);
        } else if (error.request) {
            console.error("Request Error:", error.request);
        } else {
            console.error("General Error:", error.message);
        }
        throw error;
    }
}

export default detectFace;