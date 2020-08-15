import React, { useState } from "react";
import "./styles.css";
// components
import QuestionCard from "./components/QuestionCard";
import Loading from './components/loading'
// images
import brain from './assets/brain.png'
import computer from './assets/computer.png'
import history from './assets/history.png'
import music from './assets/music.png'
import science from './assets/science.png'
import sport from './assets/sports.png'
import quiz from './assets/quiz.png'
// api and type
import { fetchQuestion, QuestionsState } from './Api'

export type AnswersObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}

export default function App() {

  // let time: any;

  const totalQuestion = 10
  // setting states 
  const [loading, setloading] = useState(false)
  const [question, setquestion] = useState<QuestionsState[]>([])
  var [number, setnumber] = useState(0)
  const [userAnswer, setAnswer] = useState<AnswersObject[]>([])
  const [score, setscore] = useState(0)
  const [gameOver, setgameOver] = useState(true)

  // options
  const [diff, setdiff] = useState('easy')
  const [category, setCategory] = useState('9')
  let [categoryname , setCategoryname] = useState('General Knowledge')
  // timer 
  // let [min, setmin] = useState(0)
  // let [sec, setsec] = useState(0)

  // funtions

  // start
  const startQuiz = async () => {
    setgameOver(false)
    setloading(true)

    const newQuestion = await fetchQuestion(totalQuestion, diff, category)
    setquestion(newQuestion)
    setscore(0)
    setAnswer([])
    setnumber(0)
    setloading(false)
    // time = setInterval(timer, 1000);
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
      setnumber(next)
    }
  };

  // // // timer
  // function timer() {
  //   setsec(sec++)
  //   if (sec === 60) {
  //     setmin(min++)
  //     setsec(sec = 0)
  //   }

  // }
  // // useEffect(() => {
  //   if (number === 9) {
  //     console.log('hello')
  //     clearInterval(time)
  //     setsec(sec = 0)
  //     setmin(min = 0)
  //   } else if (min === 1) {
  //     clearInterval(time)
  //   }
  // // } , [])


  // difficulty 
  const getDifficulty = (e: React.MouseEvent<HTMLButtonElement>) => {
    setdiff(e.currentTarget.value)
  }
  // category
  const getCategory = (e: React.MouseEvent<HTMLDivElement>) => {
    setCategory(e.currentTarget.title)
    cate()
  }
  function cate(){
    if (category === '9'){
      setCategoryname(categoryname = 'General Knowledge')
    }else if(category === '12'){
      setCategoryname(categoryname = 'Music')
    }else if(category === '17'){
      setCategoryname(categoryname = 'Science And Nature')
    }else if (category === '18'){
      setCategoryname(categoryname = 'Computer')
    }else if(category === '21'){
      setCategoryname(categoryname = 'Sports')
    }else{
      setCategoryname(categoryname = 'History')
    }
  }

  return (


    <div className='dark'>
      <div className='main-div container'>
        <div className='head-flex'>
          <div className='heading'>
            <img src={quiz} alt='qiz' />
            <h1>Quiz App</h1>
          </div>
          <div className='cate'>
            <h4>{categoryname}({diff})</h4>
          </div>
        </div>
        {gameOver || userAnswer.length === totalQuestion ? (
          <>
            <div className='category'>
              <h4>Category</h4>
            </div>
            <div className='option-category'>
              <div onClick={getCategory} title='9'>
                <img src={brain} alt='brain' />
                <h6>General Knowledge</h6>
              </div>
              <div onClick={getCategory} title='12'>
                <img src={music} alt='music' />
                <h6>Music</h6>
              </div>
              <div onClick={getCategory} title='17'>
                <img src={science} alt='sci' />
                <h6>Science And Nature</h6>
              </div>
              <div onClick={getCategory} title='18'>
                <img src={computer} alt='comp' />
                <h6>Computer</h6>
              </div>
              <div onClick={getCategory} title='23'>
                <img src={history} alt='history' />
                <h6>History</h6>
              </div>
              <div onClick={getCategory} title='21'>
                <img src={sport} alt='sport' />
                <h6>Sports</h6>
              </div>
            </div>
            <div className='category'>
              <h4>Difficulty</h4>
            </div>

            <div className='option-difficulty'>
              <button value='easy' onClick={getDifficulty}>Easy</button>
              <button value='medium' onClick={getDifficulty}>Medium</button>
              <button value='hard' onClick={getDifficulty}>Hard</button>
            </div>


            <div className='start-quiz'>
              <button onClick={startQuiz} >Start Quiz</button>
            </div>
          </>
        ) : null}

        {!gameOver && !loading ?
          <div className='score'>
            <p>Socre : {score} / 10</p>
          </div>
          : null}

        <div className='loading-api'>
          {loading && <Loading />}
        </div>

        {!loading && !gameOver && (
          <div>
            <QuestionCard
              question={question[number].question}
              questionNo={number + 1}
              callback={checkAnswer}
              userAnswer={userAnswer ? userAnswer[number] : undefined}
              totalQuestion={totalQuestion}
              answers={question[number].answers}
            />
          </div>
        )}

        {!gameOver && !loading && userAnswer.length === number + 1 && number !== totalQuestion - 1 ? (
          <div className='next'>
            <button onClick={nextQuestion}>Next Question</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
