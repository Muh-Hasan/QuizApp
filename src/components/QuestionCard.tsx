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
  answers,
}) => {
  const AnswerDisplay = answers.map(answer => {
    return (
      <div key={answer}>
        <button key={answer} disabled={userAnswer ? true : false} value={answer} onClick={callback} >
          <span dangerouslySetInnerHTML={{ __html: answer }} />
        </button>
      </div>
    )
  })
  return (
    <div className='question-div'>
      <div className='question-div-q'>
        <p dangerouslySetInnerHTML={{ __html: `${questionNo}. ${question}` }} />
      </div>
      <div className='question-ans-div'>
        {AnswerDisplay}
      </div>
    </div>
  );
};
export default QuestionCard;