import React, {useState,useEffect,useMemo, useCallback } from 'react';

const API_token = 'SZ1Y8cLXDrSQjPEF0eWei8DJYT6Qu4pedzZ5axH6';
const url = `https://quizapi.io/api/v1/questions?apiKey=${API_token}&limit=10`;

// `https://quizapi.io/api/v1/questions?apiKey=SZ1Y8cLXDrSQjPEF0eWei8DJYT6Qu4pedzZ5axH6&limit=10`

const Quiz = () => {

    const [questions,setQuestions] = useState([]);
    //const questions = [{"id":1036,"question":"Which command will you use to check your Ansible version?","description":null,"answers":{"answer_a":"ansible-ctl --version","answer_b":"ansible --version","answer_c":"ansible v","answer_d":"ansiblectl v","answer_e":null,"answer_f":null},"multiple_correct_answers":"false","correct_answers":{"answer_a_correct":"false","answer_b_correct":"true","answer_c_correct":"false","answer_d_correct":"false","answer_e_correct":"false","answer_f_correct":"false"},"correct_answer":"answer_a","explanation":null,"tip":null,"tags":[{"name":"DevOps"}],"category":"DevOps","difficulty":"Easy"},{"id":705,"question":"Deployment Controllers are part of","description":null,"answers":{"answer_a":"Master Controller Manager","answer_b":"kube-scheduler","answer_c":"etcd manager","answer_d":"API Controller Manager","answer_e":null,"answer_f":null},"multiple_correct_answers":"false","correct_answers":{"answer_a_correct":"true","answer_b_correct":"false","answer_c_correct":"false","answer_d_correct":"false","answer_e_correct":"false","answer_f_correct":"false"},"correct_answer":"answer_a","explanation":"A Deployment provides declarative updates for Pods and ReplicaSets.You describe a desired state in a Deployment, and the Deployment Controller changes the actual state to the desired state at a controlled rate. You can define Deployments to create new ReplicaSets, or to remove existing Deployments and adopt all their resources with new Deployments.","tip":null,"tags":[{"name":"Kubernetes"}],"category":"Linux","difficulty":"Easy"},{"id":824,"question":"test123","description":null,"answers":{"answer_a":"test","answer_b":"test2","answer_c":null,"answer_d":null,"answer_e":null,"answer_f":null},"multiple_correct_answers":"false","correct_answers":{"answer_a_correct":"true","answer_b_correct":"false","answer_c_correct":"false","answer_d_correct":"false","answer_e_correct":"false","answer_f_correct":"false"},"correct_answer":null,"explanation":null,"tip":null,"tags":[{"name":"Angular"}],"category":"Linux","difficulty":"Easy"},{"id":289,"question":"How many types of plans are available in wordpress by default?","description":null,"answers":{"answer_a":"4","answer_b":"6","answer_c":"2","answer_d":"3","answer_e":null,"answer_f":null},"multiple_correct_answers":"false","correct_answers":{"answer_a_correct":"true","answer_b_correct":"false","answer_c_correct":"false","answer_d_correct":"false","answer_e_correct":"false","answer_f_correct":"false"},"correct_answer":"answer_a","explanation":null,"tip":null,"tags":[{"name":"WordPress"}],"category":"CMS","difficulty":"Medium"},{"id":1060,"question":"Which of the following are true for routes in Laravel?","description":null,"answers":{"answer_a":"You can not pass any arguments to your routes.","answer_b":"Routes can point to a method on a controller and also dictate which HTTP methods are able to hit that URI.","answer_c":"A route is an endpoint specified by a URI (Uniform Resource Identifier).","answer_d":"Routes can only handle GET requests","answer_e":null,"answer_f":null},"multiple_correct_answers":"false","correct_answers":{"answer_a_correct":"false","answer_b_correct":"true","answer_c_correct":"true","answer_d_correct":"false","answer_e_correct":"false","answer_f_correct":"false"},"correct_answer":"answer_a","explanation":null,"tip":null,"tags":[{"name":"Laravel"}],"category":"Code","difficulty":"Easy"},{"id":250,"question":"Which type you will select if you need to store binary data?","description":null,"answers":{"answer_a":"BLOB","answer_b":"BIGINT","answer_c":"INT","answer_d":"None of the above","answer_e":"Both BIGINT and INT","answer_f":null},"multiple_correct_answers":"false","correct_answers":{"answer_a_correct":"true","answer_b_correct":"false","answer_c_correct":"false","answer_d_correct":"false","answer_e_correct":"false","answer_f_correct":"false"},"correct_answer":"answer_a","explanation":null,"tip":null,"tags":[{"name":"MySQL"}],"category":"SQL","difficulty":"Medium"},{"id":599,"question":"How are objects in PHP passed by?","description":null,"answers":{"answer_a":"Objects are passed by value.","answer_b":"Objects are passed by reference.","answer_c":"Neither of the mentioned","answer_d":null,"answer_e":null,"answer_f":null},"multiple_correct_answers":"false","correct_answers":{"answer_a_correct":"false","answer_b_correct":"true","answer_c_correct":"false","answer_d_correct":"false","answer_e_correct":"false","answer_f_correct":"false"},"correct_answer":"answer_a","explanation":null,"tip":null,"tags":[{"name":"PHP"}],"category":"Code","difficulty":"Easy"},{"id":467,"question":"What type of a language is HTML?","description":null,"answers":{"answer_a":"Scripting Language","answer_b":"Markup Language","answer_c":"Programming Language","answer_d":"Network Protocol","answer_e":null,"answer_f":null},"multiple_correct_answers":"false","correct_answers":{"answer_a_correct":"false","answer_b_correct":"true","answer_c_correct":"false","answer_d_correct":"false","answer_e_correct":"false","answer_f_correct":"false"},"correct_answer":"answer_a","explanation":null,"tip":null,"tags":[{"name":"HTML"}],"category":"Code","difficulty":"Easy"},{"id":938,"question":"Kubernetes Manifests can be in JSON or YAML format","description":null,"answers":{"answer_a":"True","answer_b":"False","answer_c":null,"answer_d":null,"answer_e":null,"answer_f":null},"multiple_correct_answers":"false","correct_answers":{"answer_a_correct":"true","answer_b_correct":"false","answer_c_correct":"false","answer_d_correct":"false","answer_e_correct":"false","answer_f_correct":"false"},"correct_answer":null,"explanation":null,"tip":"not good","tags":[{"name":"Kubernetes"}],"category":"DevOps","difficulty":"Medium"},{"id":819,"question":"Can a Docker container restart by itself?","description":null,"answers":{"answer_a":"True","answer_b":"False","answer_c":null,"answer_d":null,"answer_e":null,"answer_f":null},"multiple_correct_answers":"false","correct_answers":{"answer_a_correct":"true","answer_b_correct":"false","answer_c_correct":"false","answer_d_correct":"false","answer_e_correct":"false","answer_f_correct":"false"},"correct_answer":null,"explanation":null,"tip":null,"tags":[{"name":"Docker"}],"category":"Docker","difficulty":"Medium"}]
    const [quesNo , setQuesNo] = useState(0);
    const [showScore , setShowScore] = useState(false);
    const [score,setScore] = useState(0);
    //const [options,setOptions] = useState({});
    //const [correctAnswers,setCorrectAnswers] = useState({});
    const [userAnswers,setUserAnswers] = useState({});
//    const [timer,setTimer] = useState(10*60);

    useEffect(()=>{
        fetch(url)
            .then(response => response.json())
            .then(data => {
               // console.log(data);
               const newData = data.map(item => {
                   const optionArray = Object.values(item.answers).filter(item => item);

                   item.options = optionArray;
                   return item;
               })
                setQuestions(newData);
            });
    },[])

    useEffect(() => {
        if(timer > 0){
            setInterval(() => setTimer(timer - 1),1000);
        }
        else{
            handleSubmit();
        }
        
    })

    // const extractOptions = useCallback(() => {

    //     let tempOptions = questions.map(question => {
    //         let curr = [];
    //         for(let key in question.answers){
                
    //             if(question.answers[key] !== null){
    //                 let item = [];
    //                 item.push(question.answers[key]);
    //                 item.push({checked: false});    
    //                 curr.push(item);
    //             }
    //         }
    //         return curr;
    //     });

    //     //setOptions(tempOptions);
        
    // },[questions])

    // const extractAnswers = useCallback(() => {
    //     let correctOptions = questions.map(question => {
    //         let curr = [];
    //         for(let key in question.correct_answers){
    //             if(question.correct_answers[key] === "true")
    //                 curr.push(key);
    //         }
    //         return curr;
    //     })
        
    //     let id = 0 ;
    //     let tempAnswers={};
    //     for(let question of questions){
    //         let currQuesAns = [];
    //         for(let key in question.answers){
             
    //             let temp = key + '_correct';
    //             if(correctOptions[id].includes(temp)){
    //                 currQuesAns.push(question.answers[key]);
    //             }
    //         }
           
    //         tempAnswers[id] = currQuesAns;
    //         id++;
    //     }
    //     setCorrectAnswers(tempAnswers);
    // },[questions])


   

    const handleNextButtonClick = () =>{
        const nextQues = quesNo + 1;
        if(nextQues < 10)
            setQuesNo(nextQues);
    }
    const handlePreviousButtonClick = () =>{
        const prevQues = quesNo - 1;
        if(prevQues >= 0)
            setQuesNo(prevQues);
    }

    const handleOptionClick = (e) => {
         const value = e.target.innerHTML;
        
        // let copy = {...userAnswers};
        // if(copy[quesNo] === undefined){
        //     copy[quesNo] = [];
        // }
     
        // if(copy[quesNo].includes(value)){
        //     let index = copy[quesNo].indexOf(value);
        //     copy[quesNo].splice(index,1);
        // }
        // else{
         
        //     copy[quesNo].push(value);
        // }
        
        // let copyOptions = {...options};

        // for(let option of copyOptions[quesNo]){
      
        //     if(option[0] === value){
        //         option[1].checked = !option[1].checked;
        //     }
        // }
        // debugger
        //  setUserAnswers(copy);
        // setOptions(copyOptions);
        let copy = {...userAnswers};
        if(copy[quesNo]){
            if(copy[quesNo].includes(value)){
                if(copy[quesNo].length == 1){
                    delete copy[quesNo];
                }
                else{
                    let index = copy[quesNo].indexOf(value);
                    copy[quesNo].splice(index,1);
                }
            } 
            else{
                copy[quesNo].push(value);
            }  
        } 
        else{
            copy[quesNo] = [value];
        }  
        setUserAnswers(copy);



    }

    // const handleSubmit = () =>{
    //     let count = 0;
        
    //     for(let key in correctAnswers){
    //         let areEqual = true;
    //         if(userAnswers[key] !== undefined){
    //             for(let item of correctAnswers[key]){
    //                 if(!userAnswers[key].includes(item)){
    //                     areEqual = false;
    //                     break;
    //                 }
    //             }
    //         }
    //         if(areEqual)
    //             count++;
    //     }
    //     setScore(count);
    //     setShowScore(true);
    // }


    // useEffect(() => {
    //     extractOptions();
    //     extractAnswers();
    //     //console.log(questions);
    // },[extractOptions,extractAnswers])


    return (
        <>
            {/* <div className="timer-text">Time Left : {Math.floor(timer/60)}:{timer%60}</div> */}
            {showScore ? (
				<div className='score-section'>You scored {score} out of {questions.length}</div>
			) : (
				questions.length !== 0 ? <>
                    <div className="question">
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question {quesNo + 1}</span>/{questions.length}
                            </div>
                            <div className='question-text'>{questions[quesNo].question}</div>
                        </div>
                        <div className='answer-section'>
                            {questions?.[quesNo].options.map((option,index) => {
                                if(userAnswers[quesNo]?.includes(option)){ 
                                    return (<button className="option-button selected" key={index} onClick={(e) => handleOptionClick(e)}>{option}</button>)
                                }
                                else return (<button className="option-button" key={index} onClick={(e) => handleOptionClick(e)}>{option}</button>)}
                            )}
                        </div>
                    </div>
                    <div className="navigation-section">
                        <button className="previous-button" onClick={handlePreviousButtonClick}>{`<< Previous`}</button>
                        <button className="next-button" onClick={handleNextButtonClick}>{`Next >>`}</button>
                    </div>
				</> : <></>
			)}
            {quesNo === 9 ? (<div className="submit-button-container">
                    {/* <button onClick={handleSubmit} className="submit-button">Submit quiz</button> */}
                </div>) : <></>}
        </>
    );
}
// {Object.entries(questions[quesNo].answers).map(([key,value]) => {if(value) return <button className="option-button" key={key} onClick={(e) => handleOptionClick(e)}>{value}</button>})}

export default Quiz;
