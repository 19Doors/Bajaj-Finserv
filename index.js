const express = require('express');
const cors = require('cors');
const app = express()
app.use(express.json());
const corsOptions = {
  origin: 'https://bajaj-finserv-livid-ten.vercel.app/',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
};
app.use(cors(corsOptions));

const user_id = "sakaar_srivastava_19122004";
const email = "sakaarsri1904@gmail.com";
const roll_number = "22BCE11504"

function alternateCaps(str) {
  let result = "";
  let upper = true;
  for (const char of str) {
      result += upper ? char.toUpperCase() : char.toLowerCase();
      upper = !upper;
  }
  return result;
}

app.post('/bfhl', (req,res) => {
  try{
  const {data} = req.body;
  let even = [];
  let odd = [];
  let alpha = [];
  let special = [];
  let sum=0;
  let alphaC="";

  data.forEach(item => {
    const s = String(item)
    if(!isNaN(s) && s.match(/^\d+$/)) {
      const num = Number(s);
      sum+=num;

      if(num%2==0) {
	even.push(s);
      }else {
	odd.push(s)
      }
    }if(s.match(/^[a-zA-Z]+$/)) {
      alpha.push(s.toUpperCase());
      alphaC+=s;
    }else if(!s.match(/^\d+$/) && !s.match(/^[a-zA-Z]+$/)){
      special.push(s);
    }
  })

  const reversed = alphaC.split("").reverse().join("");
  const concated = alternateCaps(reversed);

  return res.status(200).json({
  is_success: true,
  user_id: user_id,
  email: email,
  roll_number: roll_number,
  even_numbers: even,
  odd_numbers: odd,
  alphabets: alpha,
  special_characters: special,
  sum: sum.toString(),
  concat_string: concated
  });
  }catch(error) {
    return res.status(500).json({
      'is_success': false,
      message: error
    })
  }
});

app.get('/', (req,res)=> {
  res.status(200).json({"success_get":true})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Running!")
});
module.exports = app;
