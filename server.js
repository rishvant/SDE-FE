import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app=express();
const port=3000;

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1/survey');

const userSchema = new mongoose.Schema({
  answers: { type: Object, required: true }
});

const survey = mongoose.model('survey', userSchema);  


  app.get('/', (req, res) => {
      res.render('survey');
  });

app.post('/submit', async (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);
  const surveyData = new survey({
    answers: {
      currentQuestion: formData.currentQuestion,
      answer: formData.answer
    }
    });
  try {
    surveyData.save();
    res.send('Survey submitted successfully!');
    console.log("Saved");
  } catch (error) {
    res.status(500).send('Error submitting survey.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
