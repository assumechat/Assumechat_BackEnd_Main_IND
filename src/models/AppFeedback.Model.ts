import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['bug', 'feedback', 'feature', 'early_access'],
        required: true,
    },
    email: {
        type: String,
        required: false, // optional for anonymous feedback
        trim: true,
        lowercase: true,
    },
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    metadata: {
        browser: String,
        os: String,
        pageUrl: String,
        appVersion: String,
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'resolved'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    capped: { size: 1048576, max: 500 }, // ~1MB or 500 docs
});

export default mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);
