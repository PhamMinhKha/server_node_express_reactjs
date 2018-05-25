const mongodb = require('mongoose');
const config = require('./../../config/config');
mongodb.connect(config.connectdb);

class basicModel {
    constructor()
    {
        // this.config = config;
        // this.mongodb = mongodb;
        
    }
    Schema(data = JSON)
    {
        return mongodb.Schema(data);
    }
    Model(Collection = String, Schema = mongodb.Types.Schema)
    {
        return mongodb.model(Collection, Schema);
    }
}
module.exports = basicModel;