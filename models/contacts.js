const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type:String,
        required:true
    },
    phoneNumber:{
        type: String,
        required: true
    },
    img:{
        type: String,
        default:false
    }
});
const CONTACTS = mongoose.model('Contact', contactSchema);
module.exports=CONTACTS;