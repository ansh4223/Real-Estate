const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    basicInfo: {
        propertyType: String,
        negotiable: Boolean,
        price: Number,
        ownership: String,
        propertyAge: String,
        propertyApproved: Boolean,
        propertyDescription: String,
        bankLoan: Boolean
    },
    propertyDetails: {
        length: Number,
        breadth: Number,
        totalArea: Number,
        areaUnit: String,
        bhk: Number,
        floors: Number,
        attached: Boolean,
        westernToilet: Boolean,
        furnished: Boolean,
        carParking: Boolean,
        lift: Boolean,
        electricity: String,
        facing: String
    },
    generalInfo: {
        name: String,
        mobile: String,
        postedBy: String,
        saleType: String,
        featuredPackage: String,
        ppdPackage: String,
    },
    locationInfo: {
        email: String,
        city: String,
        area: String,
        pincode: String,
        address: String,
        landmark: String,
        latitude: Number,
        longitude: Number
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);