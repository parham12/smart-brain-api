const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '623625bf91cc4d05a4a635d82ec2d4fb'
  });

const imageApiHandler = () => (req, res) => {
    imageUrl = req.body.input;
    app.models.predict(Clarifai.FACE_DETECT_MODEL, imageUrl)
        .then(data => res.json(data))
        .catch(console.log)
}

const imageHandler = postgres => (req, res) => {
    const { id } = req.body;
    postgres('users')
        .where({id})
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('error getting user'));
}

module.exports = {
    imageHandler,
    imageApiHandler
}