const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo')
.then(() => {
    console.log("MONGO CONNECTION OPEN");
}) 
.catch(err => {
    console.log("MONGO CONNECTION ERROR");
    console.log(err);
})

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    addresses: [
        {
            _id: { id:false },
            street: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model('User', userSchema);

const makeUser = async() => {
    const u = new User({
        fist: 'Harry',
        last: 'Potter'
    })
    u.addresses.push({
        street: '4 Privet Drive',
        city: 'Little Whinging',
        state: 'Surrey',
        country: 'England'
    })
    const res = await u.save();
    console.log(res);
}

const addAddress = async(id) => {
    const user = await User.findById(id);
    user.addresses.push(
        {
            street: '123 45th St',
            city: 'New York',
            state: 'NY',
            country: 'USA'
        }
    )
    const res = await user.save()
    console.log(res);
}

makeUser();
addAddress('620431bd9daea6367b0595b3');