const mongoose = require('mongoose');


const RestaurantSchema = mongoose.Schema({
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
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            validate: {
                validator: (value) => {
                    return value.length === 2
                },
                message: 'Coordinates must have exactly 2 elements.'
            }
        }
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

// class name, schema, collection
const RestaurantModel = mongoose.model('RestaurantModel', RestaurantSchema, 'restaurants');


module.exports = RestaurantModel;
