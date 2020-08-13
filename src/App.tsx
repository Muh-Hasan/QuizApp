import React, { useState } from "react";
import "./styles.css";
import ReactLoading from 'react-loading'
// components
import QuestionCard from "./components/QuestionCard";

// api and type
import { fetchQuestion, QuestionsState } from './Api'

export type AnswersObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}


export default function App() {

  let interval = undefined;

  const totalQuestion = 10
  // setting states 
  const [loading, setloading] = useState(false)
  const [question, setquestion] = useState<QuestionsState[]>([])
  let [number, setnumber] = useState(0)
  const [userAnswer, setAnswer] = useState<AnswersObject[]>([])
  const [score, setscore] = useState(0)
  const [gameOver, setgameOver] = useState(true)

  // options
  const [diff, setdiff] = useState('easy')
  const [category, setCategory] = useState('9')

  // timer 
  let [min, setmin] = useState(0)
  let [sec, setsec] = useState(0)

  // funtions

  // start
  const startQuiz = async () => {
    setloading(true)
    setgameOver(false)

    const newQuestion = await fetchQuestion(totalQuestion, diff, category)
    setquestion(newQuestion)
    setscore(0)
    setAnswer([])
    setnumber(0)
    setloading(false)
    // interval = setInterval(timer, 1000);
  }

  // checking answers 
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {

      const answer = e.currentTarget.value
      const correct = question[number].correct_answer === answer

      if (correct) setscore(num => num + 1)
      const answersObject = {
        question: question[number].question,
        answer,
        correct,
        correctAnswer: question[number].correct_answer
      }
      setAnswer((num) => [...num, answersObject])

    }
  };

  // next question
  function nextQuestion() {
    const next = number + 1
    if (next === totalQuestion) {
      setgameOver(true)
    } else {
      setnumber(number = next)
    }

  };

  // timer
  // function timer() {
  //   setsec(sec++)
  //   if (sec === 60) {
  //     setmin(min++)
  //     setsec(sec = 0)
  //   } else if (min === 1) {
  //     clearInterval(interval)
  //   }
  // }

  // difficulty 
  const getDifficulty = (e: React.MouseEvent<HTMLButtonElement>) => {
    setdiff(e.currentTarget.value)
  }
  // category
  const getCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCategory(e.currentTarget.value)
  }

  return (



    <div className='main-div'>
      <div>
        <h1>Quiz App</h1>
      </div>

      <div className='option-category'>
        <button onClick={getCategory} value='9'>General Knowledge</button>
        <button onClick={getCategory} value='12'>Music</button>
        <button onClick={getCategory} value='17'>Science And Nature</button>
        <button onClick={getCategory} value='18'>Computer</button>
        <button onClick={getCategory} value='23'>History</button>
        <button onClick={getCategory} value='21'>Sports</button>
      </div>

      <div className='option-difficulty'>
        <button value='easy' onClick={getDifficulty}>Easy</button>
        <button value='medium' onClick={getDifficulty}>Medium</button>
        <button value='hard' onClick={getDifficulty}>Hard</button>
      </div>

      {gameOver || userAnswer.length === totalQuestion ? (
        <button onClick={startQuiz}>Start Quiz</button>
      ) : null}

      {!gameOver ? <p>Socre : {score}</p> : null}
      
      <div className='loading-api'>
        {loading && <ReactLoad