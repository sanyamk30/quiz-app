import React, { useRef } from 'react';

const Ques = ({quesNo,id,details,rightAns,previousButton,nextButton}) => {

    const mcqRef = useRef(null);

    const handleSubmit = () =>{
        console.log(mcqRef.current.children);
        for(let child of mcqRef.current.children){
            let ele = child.getElementsByTagName('input')[0];
            if(ele){
                let value = ele.value === 'true';
                if(value !== ele.checked){
                    return;
                }
            }
        }
        rightAns();     
    }

    const handlePreviousClick = (e) => {
        handleSubmit();
        previousButton();
    }
    const handleNextClick = (e) => {
        handleSubmit();
        nextButton();
    }

    return (
        <>
            {details && <h1>{details.question}</h1> }

            <div ref={mcqRef}>
                {details && Object.keys(details.answers).map(key => {
                    if(details.answers[key])
                        return <><p key={details.id}><input type="checkbox" name={details.answers[key]} value={details.correct_answers[`${key}_correct`]} />{details.answers[key]}</p></>;
                    else return <></>
                })}
                {quesNo !== 0 && <button onClick={handlePreviousClick}>Previous</button>}
                {quesNo !== 9 && <button onClick={handleNextClick}>Next</button>}
                
            </div>
        </>
    );
}

export default Ques;

