import React from "react";
import './Question.css'
// types
import { AnswersObject } from '../App'

type Props = {
  question: string;
  answers: string[];
  userAnswer: AnswersObject | undefined;
  questionNo: number;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  totalQuestion: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  questionNo,
  callback,
  userAnswer,
  totalQuestion,
  answers
}) => {
  const AnswerDisplay = answers.map(answer => {
    return(
    <div key={answer}>
      <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
        <span dangerouslySetInnerHTML={{ __html: answer }} />
      </button>
    </div>
  )})
  return (
    <div className='question-div'>
      <div>
        <h2>
          Question {questionNo} / {totalQuestion}
        </h2>
      </div>
      <div>
        <p dangerouslySetInnerHTML={{ __html: question }} />
      </div>
      {AnswerDisplay}
    </div>
  );
};
export default QuestionCard;