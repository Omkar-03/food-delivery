const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected Successfully !!!");

        const fetched_data = mongoose.connection.db.collection("food_items");
        const itemData = await fetched_data.find({}).toArray();
        global.food_items = itemData

        const food_category = mongoose.connection.db.collection("food_category");
        const catData = await food_category.find({}).toArray()
        global.food_category = catData
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = mongoDB;