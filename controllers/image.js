const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '53f6091440bc4509a51a78682edb6b56'
});

const handleAPIcall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(400).json('Unable to connect with API')
    })
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    console.log(req.body);
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => {
            res.status(400).json('Unable to get entries!')
        })
}

module.exports = {
    handleImage: handleImage,
    handleAPIcall: handleAPIcall
}