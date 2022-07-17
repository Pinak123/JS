const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname +"/sign.html")
})
app.post("/", function(req, res){
  const first = req.body.first;
  const last = req.body.last;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:first,
          LNAME:last
      }
    }
  ]
}
  const jsondata = JSON.stringify(data);
// Making a request to mailchimp
  const url = "https://us11.api.mailchimp.com/3.0/lists/c60f1e21ca"
  const options ={
    method:"POST",
    auth:"pinak:61e4dcfcdacc31ade2fa2d76a37914ed-us11"
  }
    const request = https.request(url, options, function(response){
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html")
      };
      res.on("data", function(data){
          console.log(JSON.parse(data));
          console.log(res.statusCode)
    });
  });


  // https://fast-cove-79453.herokuapp.com/


  request.write(jsondata);
    request.end();
  console.log(first + " " + last + " " + email);





})

app.post('/failure', function(req, res){
  res.redirect("/")
})




app.listen(process.env.PORT || 3000, function (){
  console.log('listening on port 3000');

})
// 61e4dcfcdacc31ade2fa2d76a37914ed-us11
// c60f1e21ca ---> list id
    // const data = {
    //         email_address: emailAdd,
    //         status: "subscribed",
    //         merge_fields: {
    //             FNAME: firstName,
    //             LNAME: lastName
    //             }
    //         };
