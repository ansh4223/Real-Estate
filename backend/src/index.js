const mongoose = require('mongoose');
const app = require('./App');
const port = 8081;

mongoose.connect('mongodb://localhost:27017/real-estate', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => console.log(`App listening on port ${port}!`));
