const { OpenAI } = require('openai');
// const franc = require('franc-min'); // language detector
const { franc } = require('franc');

const SymptomLog = require('../models/SymptomLog');

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

exports.checkSymptoms = async (req, res) => {
  const { userInput } = req.body;

  try {
    // 🧠 Detect language
    const langCode = franc(userInput);
    let language = 'English';
    if (langCode === 'hau') language = 'Hausa';
    if (langCode === 'yor') language = 'Yoruba';

    // 💬 Send to AI with language instruction
    const completion = await openai.chat.completions.create({
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        { role: 'system', content: `You are a helpful medical assistant. Respond in ${language}.` },
        { role: 'user', content: userInput },
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    // 📝 Save entry to MongoDB
    await SymptomLog.create({
      userInput,
      aiResponse,
      language,
      createdAt: new Date()
    });

    // ✅ Return response
    res.json({ aiResponse, language });

  } catch (err) {
    console.error('OpenRouter Error:', err.message);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};

// const { OpenAI } = require('openai');

// const openai = new OpenAI({
//   apiKey: process.env.OPENROUTER_API_KEY,
//   baseURL: 'https://openrouter.ai/api/v1',
// });

// // exports.checkSymptoms = async (req, res) => {
// //   const { userInput } = req.body;

// //   try {
// //     const completion = await openai.chat.completions.create({
// //       model: 'mistralai/mistral-7b-instruct', // or any available model
// //       messages: [
// //         { role: 'system', content: 'You are a helpful medical assistant.' },
// //         { role: 'user', content: userInput },
// //       ],
// //     });

// //     const aiResponse = completion.choices[0].message.content;
// //     res.json({ aiResponse });
// //   } catch (err) {
// //     console.error('OpenRouter Error:', err.message);
// //     res.status(500).json({ error: 'Something went wrong' });
// //   }
// // };


// const SymptomLog = require('../models/SymptomLog'); 

// exports.checkSymptoms = async (req, res) => {
//   const { userInput } = req.body;

//   try {
//     const completion = await openai.chat.completions.create({
//       model: 'mistralai/mistral-7b-instruct',
//       messages: [
//         { role: 'system', content: 'You are a helpful medical assistant.' },
//         { role: 'user', content: userInput },
//       ],
//     });

//     const aiResponse = completion.choices[0].message.content;

//     // ✅ Save to MongoDB
//     await SymptomLog.create({ userInput, aiResponse });

//     res.json({ aiResponse });
//   } catch (err) {
//     console.error('OpenRouter Error:', err.message);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// };


exports.getSymptomHistory = async (req, res) => {
  try {
    const history = await SymptomLog.find().sort({ createdAt: -1 }); // newest first
    res.json(history);
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};
