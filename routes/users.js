let mongoose = require("mongoose");
let uri = 'mongodb://localhost/g-oauth'
mongoose.connect(uri, { useunifiedTopology: true , useNewUrlParser: true})
.then ( function(){
  console.log( 'Database connected' )
})

.catch( function(e){
  console.log(e)
})

let userSchema = mongoose.Schema({
  googleID: String
})

module.exports=mongoose.model('user',userSchema)
