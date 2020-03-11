//dbPassword = 'mongodb+srv://dharmonly:'+ encodeURIComponent('dharm123') + '@cluster0-vijxf.mongodb.net/test?retryWrites=true&w=majority';
dbMongo = 'userDataBase';
dbPassword = 'mongodb://localhost/'+ dbMongo;
module.exports = {
    mongoURI: dbPassword
};
