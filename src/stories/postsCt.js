const Post = require("./postsMd");
const GTP = require("./configCGTP")

// List of posts
const listAllPost = (req, res, next) => {
    Post.find()
        .then((data) => {
            !data.length ? next() : res.status(200).json(data);
        })
        .catch((error) => {
            error.status = 500;
            next(error);
        });
};

// Find by title
const findByTitle = (req, res, next) => {
    const query = req.params.query;
    const regex = new RegExp(query, 'i'); // Create a case-insensitive regex for the query
    Post.find({ $or: [{ historicalFact: regex }, { story: regex }] }) // Search using the regex in historicalFact and story fields
        .exec()
        .then((result) => {
            return res.status(200).json({ result });
        })
        .catch((error) => {
            next(error);
        });
};

// Create new post
const createNewPost = async (req, res, next) => {
    try {
        const { historicalFact, hero, villain, fictionalWay } = req.body;
        const story = await GTP.generateStory(historicalFact, hero, villain, fictionalWay);
        const newPost = new Post({ historicalFact, hero, villain, fictionalWay, story });
        await newPost.save();
        res.status(201).json({ newPost, message: "New Post saved", story });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { listAllPost, findByTitle, createNewPost };