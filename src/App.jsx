import React, { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai';

function App() {

  const [input, setInput] = useState('')
  const [chat, setChat] = useState([])
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY


  const handleInput = async () => {
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = input;

      const result = await model.generateContent(prompt);
      console.log(result.response.text());
      setChat([
        ...chat,
        {
          userText: input,
          aiText: result.response.text(),
        },
      ])
      setInput('')
    }

    catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='relative-h-screen flex flex-col justify-center items-center'>

{/*  Background Pattern  */}
  <div className="absolute inset-0">
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
  </div>
      <div className="chat h-3/4">
        {
          chat.map((val) => (
            <>
              <h2 className='text-3xl text-gray-500'>{val.userText}</h2>
              <p className='text-2xl text-blue-500 text-justify'>{val.aiText}</p>
            </>
          ))
        }
      </div>
      <div className='input my-5 fixed bottom-0.5'>
        <input
          type="text"
          placeholder='Ask me something'
          className="text-3xl rounded-2xl py-5"
          name="" id=""
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
        />
        <button className="bg-black text-white p-5 text-center text-2xl rounded-4xl"
          onClick={handleInput}>Send</button>

        <button className="bg-black text-white p-5 text-center text-2xl rounded-4xl"
          onClick={()=>setChat([])}>Clear Chat</button>
      </div>
    </div>
  )
}

export default App



// AIzaSyDl143I6J-Oh0ehOVRu1JXiEvuxPzfeG2c
//npm install @google/generative-ai
// npm install dot-env

