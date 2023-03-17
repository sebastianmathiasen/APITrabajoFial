const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    historicalFact: { type: String, require: true },
    hero: { type: String, require: true },
    villain: { type: String, require: true },
    fictionalWay: { type: String, require: true },
    story: { type: String },
    date: { type: Date, default: Date.now },
    comments: [{ body: String, date: Date }],
    hidden: { type: Boolean, default: false },
},
    { timestamps: true }
);

PostSchema.index({ historicalFact: "text", story: "text" })

// Crea indice para find by title, podria funcionar en post/find:query

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;