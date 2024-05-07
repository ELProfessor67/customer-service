'use client'
import socket from '@/components/socket'
import React, { useEffect, useState, useRef } from 'react'
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import MessageBox from '@/components/MessageBox';

function page() {
  const questions = ["Hi, I am bot assitant. Hope u have a lovely day Today.", "What's your name sir?(just type name)", "Thanks, Can i know your phone number too?"]
  const [categories, setcategories] = useState([])
  const [messages, setMessages] = useState([])
  const [message, setmessage] = useState("")
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setmediaRecorder] = useState(null);
  const [startBot, setstartBot] = useState(true)
  const [currentBotMsg, setcurrentBotMsg] = useState("")
  const [typingAnimation, settypingAnimation] = useState(false)
  const [loadingHide, setLoadingHide] = useState(false);

  
  

  const [questionindex, setquestionindex] = useState(0);
  const [answers, setanswers] = useState("")
  const audioRef = useRef(null);
  

  useEffect(() => {
    const startBotChatting = async () => {
      await setTypeAnimationAndSendMessage(questions[0], 0, 2000);
      await setTypeAnimationAndSendMessage(questions[1], 1, 2000);


    };

    startBotChatting();
  }, []);

  const setTypeAnimationAndSendMessage = async (message, index, delay) => {
    setquestionindex(index)
    settypingAnimation(true);
    await wait(delay);
    settypingAnimation(false);


    setMessages((prev) => [...prev, { msg: message, status: "incoming" }]);

    await wait(delay);
  };

  useEffect(() => {
    
    if(messages.length == 5){
      setMessages((prev) => [...prev, { msg: "options", status: "options" }]);
    }
  },[messages])

  const sendQuestions = async (questions) => {
    for (const question of questions) {
      await setTypeAnimationAndSendMessage(question,0, 2000);
    }
  };

  const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));


  const startRecording = async () => {
    try {
      if(recording==false){
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current=new MediaRecorder(stream);
      
      const chunks = [];

      mediaRecorder.current.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        audioBlob.current=blob;
      };

      mediaRecorder.current.start();
      setRecording(true);
    }
    else if(recording==true){
      
      mediaRecorder.current.stop();
        setRecording(false);
        socket.emit("send-msg", {
          message:audioBlob.current,
          socketId: socket.id,
          category: user.category,
          role: "employee",
          customerSocket: currentCustomer,
          isaudio:true,
        });
        setRecording(false)
    
     
     } // 5 seconds recording time, you can adjust as needed
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };


  useEffect(async () => {
    const fetchCategories = async () => {
      let categories_ = []
      let res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories`);
      res.data.categories.map(category => {
        if (!categories.includes(category.name)) {
          categories_.push(category.name)
          setcategories((prev) => [...prev, category.name])
        }
      })
      return categories_;
    }



    let categories_req = await fetchCategories();
    const randomIndex = Math.floor(Math.random() * categories_req.length);
    console.log(categories_req)
    socket.emit("new-member", { name: "unknown", socketId: socket.id, category: "developers", role: "customer" });




  }, [])



  const handleReceiveMessage = (data) => {


    if (data.isaudio && data.message) {
      console.log("there is audio we recive ", data.message)
      const audioBlob = new Blob([data.message], { type: 'audio/webm' });

      const audioURL = URL.createObjectURL(audioBlob);
      setMessages((prev) => [...prev, { msg: audioURL, status: "incoming", isaudio: data.isaudio }])

    }
    else {
      setMessages((prev) => [...prev, { msg: data.message, status: "incoming", isaudio: data.isaudio }])
    }

  }
  useEffect(() => {
    socket.on("recieve-msg", handleReceiveMessage)

    return () => {
      socket.off("recieve-msg", handleReceiveMessage)

    }
  }, [socket])
  const handleSendMessage = async (e) => {
    if (startBot) {
      if (questions.length <= questionindex) {
        setstartBot(false)
        console.log("returning")
        return
      }
      setanswers((prev) => [...prev, message]);
      setMessages((prev) => [...prev, { msg: message, status: "outgoing" }])
      setmessage("")

      await setTypeAnimationAndSendMessage(questions[questionindex + 1], questionindex + 1, 2000);
    }
    else {
      e.preventDefault();
      socket.emit("send-msg", { message, socketId: socket.id, role: "customer" })
      setmessage("")
      setMessages((prev) => [...prev, { msg: message, status: "outgoing" }])
    }
  }


  useEffect(() => {
    setTimeout(() => {
      setLoadingHide(true)
    }, 3000);
  },[])

  
  return (
    // this is thediv
    <>
    {
      !loadingHide && 
      <div className='h-screen w-full bg-gradient absolute z-10 flex flex-col justify-center items-center gap-5'>
        <h2 className='text-white/80 text-3xl'>Hello I am Niala</h2>
        <img src='/images/bot.png' className='w-16 h-16 rounded-full'/>
        <h2 className='text-white/80 text-2xl'>How can i help you ?</h2>
        <button className='py-2 px-4 rounded-3xl bg-white text-[#330867]' onClick={() => setLoadingHide(true)}>Chat Now !</button>
      </div>
    }
      
      <div className='gradint p-3 rounded-t-md flex justify-between items-center shadow-md shadow-[#330867]'>
        <div className='flex gap-2 items-center'>
          <img src='/images/bot.png' className='w-16 h-16 rounded-full'/>
          <div className=''>
            <h1 className='text-white text-2xl'>Verbot</h1>
            <p className='text-white/80'>we are online</p>
          </div>
        </div>
      </div>
      <div class="  shadow-lg  bg-white p-4">
  
  
        <MessageBox messages={messages}  typingAnimation={typingAnimation} setMessages={setMessages}  message={message} setmessage={setmessage} handleSendMessage={handleSendMessage} audioBlob={audioBlob}  startRecording={startRecording} sendQuestions={sendQuestions}/>
        
  
      </div>
    </>






  )
}

export default page