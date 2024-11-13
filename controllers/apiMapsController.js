module.exports = {
    getReviews: async (req, res) => {
        try {
            const { input } = req.query;
            const apiKey = process.env.GOOGLE_MAPS_API_KEY;  // Define esta clave en tu archivo .env en Render.
            const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=place_id&key=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
    
            res.json(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            res.status(500).json({ error: "Error fetching data" });
        }
    }
}