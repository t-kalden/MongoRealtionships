const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo')
.then(() => {
    console.log("MONGO CONNECTION OPEN");
}) 
.catch(err => {
    console.log("MONGO CONNECTION ERROR");
    console.log(err);
})

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter', 'Year Round']
    }
})
const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
})

const Product = new mongoose.model('Product', productSchema);
const Farm = new mongoose.model('Farm', farmSchema);


// Product.insertMany([
//     {name: 'Goddess Melon', price: 4.99, season: 'Summer'},
//     {name: 'Watermelon', price: 7.99, season: 'Summer'},
//     {name: 'Squash', price: 5.99, season: 'Fall'},
//     {name: 'Asparagus', price: 5.99, season: 'Spring'}
// ])

// const makeFarm = async () => {
//     const farm = new Farm({name: 'Full Belly Farms', city: 'Guinda, CA'})
//     const melon = await Product.findOne({name: 'Goddess Melon'});
//     farm.products.push(melon);
//     await farm.save();
//     console.log(farm);
// }
// makeFarm()

// const addProduct = async() => {
//     const farm = await Farm.findOne({name: 'Full Belly Farms'});
//     const watermelon = await Product.findOne({name: 'Watermelon'});
//     farm.products.push(watermelon);
//     await farm.save();
//     console.log(farm);
// }

// addProduct();