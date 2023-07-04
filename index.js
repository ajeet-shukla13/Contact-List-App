const express=require('express');
const path=require('path'); //inbuit module required to make our views folder
const bodyParser = require('body-parser');//required to parse the input data 

const port=8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express(); //creating an instance of express library

app.set('view engine','ejs'); //will set up the value named ejs, setting view engine
app.set('views',path.join(__dirname,'views')); // __dirname-> This will show the directory from where the server has started

//middleware to use parser
app.use(bodyParser.urlencoded({extended: false}));

//middleware to use static files
app.use(express.static('assets'));

//this var is not required after the introduction of database
var contact_list=[
    {
        name:"Ajeet",
        phone:"8881480682"
    },
    {
        name:"Mohit",
        phone:"171418373"
    },
    {
        name:"Sagar",
        phone:"171418373"
    }
]


app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
           return res.render('home',{
            title:"Contact List",
            contact_list:contacts
         });
    
    });
});


//just to play with ejs
app.get('/play',function(req,res){
    return res.render('practice',{
        title:"Let us play with ejs"
    });
});

app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    // return res.redirect('/');

    Contact.create({
        name:req.body.name,
        phone:req.body.phone

    },function(err,newContact){
        if(err){
        console.log('error in creating a contact!');
        return;
      }
      console.log('*******',newContact);
      return res.redirect('back');
    });

});

app.get('/delete-contact',function(req,res){
    //console.log(req.query);
    //get the id from the query in the url
    let id=req.query.id;
    
    
    // let contactindex=contact_list.findIndex(contact=>contact.phone==phone);
    // if(contactindex!=-1){
    //     contact_list.splice(contactindex,1);
    // }
    //find the contact in database using id and delete
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    })

    //return res.redirect('back');
});


app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);}
        console.log('Yup my express server is running on port:',port);
    });
