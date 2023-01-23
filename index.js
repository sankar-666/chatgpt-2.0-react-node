const express = require("express")

const bodParser = require("body-parser")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cors())


const port = 3080
const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
    organization: "org-w5KQyQ3m0cUIyjVEC62h32kF",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();





// creates a simple express api that calls the function
app.post('/', async (req,res)=> {
    
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
      });
      console.log(response.data.choices[0].text);
      res.json({
        message:response.data.choices[0].text
      })
})

app.listen(port,()=>{
    console.log(`App listening at http://localhost:${port}`);
})






