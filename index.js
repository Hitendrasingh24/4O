const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require('openai');
const app = express();

// const apiKey = 

// Initialize OpenAI client
const openai = new OpenAI();

// Enable parsing of JSON data in the request body
app.use(bodyParser.json());
app.use(express.static('public'));


// Define the route for handling POST requests
app.post('/api/chat', async (req, res) => {
  // Access the prompt from the request body
  const prompt = req.body.prompt;
  console.log(prompt)

  try {
      const response = await openai.chat.completions.create({
        //   model: 'gpt-3.5-turbo-instruct',
          model:'gpt-4-turbo',// Replace with your desired model
          messages: [
            {
              role: 'user',
              content:` \n${prompt}`,
            }
         ], // Your prompt here
        max_tokens: 500,
        temperature: 0.7,
        top_p: 1,
      });

    const generatedText = response.choices[0].message.content.trim();
    //   console.log(response.choices[0].message.content.trim())
    res.json({ result: generatedText });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong with the OpenAI API' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));