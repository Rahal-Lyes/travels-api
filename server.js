const dotenv=require('dotenv');//toujours doit etre le premier 
dotenv.config({path:'./config.env'});//et ceci doit etre le 2
const app=require('./app.js');

const PORT = process.env.PORT;
console.log(process.env);
app.listen(PORT, function () {
  console.log(`Running on port: ${PORT}`);
});


