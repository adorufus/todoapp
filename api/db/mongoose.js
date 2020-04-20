//handle connection to the mongodb database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager', {useNewUrlParser: true}).then(() => {
    console.log("Connected to mongodb successfully");
}).catch((e) => {
    console.log("error while connecting to mongodb");
    console.log(e);
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

module.exports = {
    mongoose
};