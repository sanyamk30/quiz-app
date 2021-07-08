import React, {useState,useEffect,useRef } from 'react';
import Ques from './Ques';

const API_token = 'SZ1Y8cLXDrSQjPEF0eWei8DJYT6Qu4pedzZ5axH6';
const url = `https://quizapi.io/api/v1/questions?apiKey=${API_token}&limit=10`;

// `https://quizapi.io/api/v1/questions?apiKey=SZ1Y8cLXDrSQjPEF0eWei8DJYT6Qu4pedzZ5axH6&limit=10`

const Quiz = () => {

    const [quesNo , setQuesNo] = useState(0);
    const [data , setData] = useState([]);
    const [submitted , setSubmitted] = useState(false);
    const score = useRef(0);

    useEffect(()=>{
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(data);
            });
            console.log("Render");
    },[])

    const rightAns = () => {
       score.current += 1;
    };

    const previousButton = () => {
        setQuesNo(quesNo - 1);
    }

    const nextButton = () =>{
        setQuesNo(quesNo + 1);
    }

    const handleSubmit = () => {
        setSubmitted(true);
    }

    return (
        <>
            <Ques quesNo={quesNo} id={quesNo} details={data[quesNo]} rightAns={rightAns} previousButton={previousButton} nextButton={nextButton} />
            { quesNo === 9 && <button onClick={handleSubmit}>Submit</button>}
            {submitted && <div>{score.current}</div>}
        </>
    );
}

export default Quiz;