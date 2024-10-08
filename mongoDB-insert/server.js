const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());

app.get("/getStudents",async(req,res)=>{

  let studentsArr = await Student.find();

  res.json(studentsArr);

});

app.listen(1234,()=>{
  console.log("Listening to port 1234");
})


let studentSchema = new mongoose.Schema({ 
  firstName: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z]{2,30}(?:\s[a-zA-Z]{2,30})*$/.test(v);
      },
      message: props => `${props.value} is not a valid First Name!`
    },
    required: [true, 'User firstName is required']
  },
  lastName: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z]{2,30}(?:\s[a-zA-Z]{2,30})*$/.test(v);
      },
      message: props => `${props.value} is not a valid lastName!`
    },
    required: [true, 'User lastName is required']
  },
    age:{
      type:Number,
      min:[13,"you are too young to use our app."],
      max:[120,"you are too old to create account."],
      required:true,
    },
    email: {
      type: String,
      validate: {
        validator: function(v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
      required: [true, 'User email required']
    },
    gender:{
      type:String,
      lowercase:true,
      enum:["male","female"],
      required:true,
    },
    batchId:String,
});

let Student = new mongoose.model("student",studentSchema,"BRNStudents");

let getDataFromDB = async ()=>{
  let studentsArr = await Student.find();
  console.log(studentsArr);
};

 let insertIntoDB = async()=>{

    try{
        let vivek = new Student({
            firstName:"Vivek",
            lastName:"Reddy",
            age:24,
            email:"vivekaleti1443@gmail.com",
            gender:"MaLe",
            batchId:"MERN 2407",
        });

        //  await vivek.save();

         let virat = new Student({
          firstName:"Virat",
          lastName:"Kohli",
          age:33,
          email:"viratkohli@gmail.com",
          gender:"male",
          batchId:"MERN 2407",
      });

      Student.insertMany([vivek,virat]);
      console.log("Saved into DB");

        // await virat.save();

       }catch(err){
        console.log("Unable to insert Data into DB");
    }
 };

let connectToMDB = async () => {
  try {
   mongoose.connect("mongodb+srv://vivekaleti:vivekaleti@vivek.wwjla.mongodb.net/BRNDB?retryWrites=true&w=majority&appName=vivek")
    console.log("connected to MDB Successfully");

    // insertIntoDB();

    getDataFromDB();

  } catch(err) {
    console.log("Unable to connect to MDB");
  }
};

 connectToMDB();
