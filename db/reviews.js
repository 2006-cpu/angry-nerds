const {client} = require("./index")

/* THIS IS FOR THE getAllProductReviews ADAPTER */
async function getAllProductReviews() {
	try {
        const { rows: reviews } = await client.query(`
        SELECT *
        FROM reviews
		`);

		return reviews;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

module.exports = {
    getAllProductReviews
}