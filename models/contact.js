//require mongoose module
const mongoose=require('mongoose');

//define a schema
const contactSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true 
    }
});

//create a model from the schema
const Contact = mongoose.model('Contact',contactSchema);

//export the model This allows us to use the 
//User model in other parts of our application
// by importing it using the require statement.
module.exports=Contact;
