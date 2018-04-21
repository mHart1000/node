const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geolocation Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});

// create park Schema & model
const ParkSchema = new Schema({
    id: {
        type: Number
    },
	name: {
        type: String,
        required: [true, 'Name field is required']
    },
	geometry: GeoSchema,
    image_url: {
        type: String
    },
	address: {
        type: String
    },
    description: {
        type: String
    },
    camping: {
        type: Boolean,
        default: false
    },
    hiking: {
        type: Boolean,
        default: false
    },
    picnicking: {
        type: Boolean,
        default: false
    },
    biking: {
        type: Boolean,
        default: false
    },
    swimming: {
        type: Boolean,
        default: false
    },
    boating: {
        type: Boolean,
        default: false
    },
    fishing: {
        type: Boolean,
        default: false
    },
    hunting: {
        type: Boolean,
        default: false
    },
});

const Park = mongoose.model('park', ParkSchema);

module.exports = Park;
