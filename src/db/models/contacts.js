import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        enum: ['work', 'home', 'personal']
    },
    userId: { type: Schema.ObjectId, ref: 'users', required: true },
},
    {
        timestamps: true,
        versionKey: false,
    },
);

export const Contact = model('contacts', contactSchema);
