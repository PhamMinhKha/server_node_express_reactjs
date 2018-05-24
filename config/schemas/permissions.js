const mongodb = require('mongoose');
const config = require('./../config');
mongodb.connect(config.connectdb);

class permissions{
    constructor() {
       const Schema = mongodb.Schema({
            id_quyen: Number,
            ten_quyen: String,
            ghi_chu: String
        
        })
        this.document = mongodb.model('permissions', Schema);
    }
    
    insert(id_quyen = Number, ten_quyen = String, ghi_chu = String ){
        this.document.create({
            id_quyen,
            ten_quyen,
            ghi_chu
        });
    }
    remove(id_quyen = Number)
    {
        this.document.remove({id_quyen});
    }
    update(id_quyen = Number, data = JSON)
    {
        this.document.update({id_quyen : id_quyen}, data, null, (err, data)=>{
            console.log(data);
        })
    }
}
module.exports = permissions;