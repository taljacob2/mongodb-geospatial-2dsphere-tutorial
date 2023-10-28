const mongoose = require('mongoose');


const NeighborhoodSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Missing name.'],
        minLength: [2, 'Name must be minimum 2 chars.'],
        maxLength: [50, 'Name can\'t exceed 50 chars.'],
        validate: {
            validator: (value) => {
                return value.indexOf('  ') === -1;
            },
            message: 'Name can\'t contain multiple spaces.'
        }
    },
    geometry: {
        type: {
            type: String,
            enum: ['Polygon'], // 'type' must be 'Polygon'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: (value) => {
                    return value.length >= 1
                },
                message: 'Coordinates must have at least 1 element.'
            }
        }
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

// class name, schema, collection
const NeighborhoodModel = mongoose.model('NeighborhoodModel', NeighborhoodSchema, 'neighborhoods');


module.exports = NeighborhoodModel;
