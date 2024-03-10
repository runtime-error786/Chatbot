"use client"
import React, { useState } from 'react';

function MainBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      message: "Hello I am ChatGPT",
      sender: "ChatGPT"
    }
  ]);

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const handleSend = async (event) => {
    event.preventDefault()
    const newMessage = {
      message: input,
      sender: "user"
    }

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setInput('');

    await processMessageToChatGPT(newMessages);
  }

  async function processMessageToChatGPT(chatMessages) {
    let API = "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";
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant"
      } else {
        role = "user"
      }
      return (
        { role: role, content: messageObject.message }
      )
    });

    const systemMessage = {
      role: "system",
      content: "Explain all concept like i am 10 year old"
    }

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data.choices[0].message.content);
      setMessages(
        [
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT"
          }
        ]
      )
    })
  }

  return (
    <>
    
    
    <div id='p1' className="container">
      
      <div id='p2' className="prompt-area">
        <input type="text" placeholder="Send a message..." value={input} onChange={handleChange} />
        <button className="submit" type="submit" onClick={handleSend}>Send</button>
      </div>

      <div id='p3' className="response-area">
      <h1 style={{textAlign:"center",fontWeight:"bolder",color:"lightblue"}}>ChatBot 3.5</h1>
        {messages.map((message, index) => {
          return (
           
            <div key={index} className={message.sender === "ChatGPT" ? 'gpt-message' : 'user-message'}>
              {
                message.sender === "ChatGPT" ?
                  <>
                    <div id='p5' className='icon'>
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                        <path fill="#546e7a" d="M30.7,7.27L28.33,9.1c-1.605-2.067-4.068-3.209-6.697-3.092C17.313,6.2,14,9.953,14,14.277l0,9.143	l10.5,6.12l-1,1.72l-11.706-6.827C11.302,24.146,11,23.62,11,23.051l0-8.687C11,8.1,16.129,2.79,22.39,3.007	C25.669,3.12,28.68,4.663,30.7,7.27z"></path>
                        <path fill="#546e7a" d="M12.861,9.833l0.4,2.967c-2.592,0.357-4.813,1.919-6.026,4.254c-1.994,3.837-0.4,8.582,3.345,10.745	l7.918,4.571l10.55-6.033l0.99,1.726l-11.765,6.724c-0.494,0.282-1.101,0.281-1.594-0.003l-7.523-4.343	C3.73,27.308,1.696,20.211,5.014,14.898C6.752,12.114,9.594,10.279,12.861,9.833z"></path>
                        <path fill="#546e7a" d="M6.161,26.563l2.77,1.137c-0.987,2.423-0.745,5.128,0.671,7.346	c2.326,3.645,7.233,4.638,10.977,2.476l7.918-4.572l0.05-12.153l1.99,0.006l-0.059,13.551c-0.002,0.569-0.307,1.094-0.8,1.379	l-7.523,4.343c-5.425,3.132-12.588,1.345-15.531-4.185C5.083,32.994,4.914,29.616,6.161,26.563z"></path>
                        <path fill="#546e7a" d="M17.3,40.73l2.37-1.83c1.605,2.067,4.068,3.209,6.697,3.092C30.687,41.8,34,38.047,34,33.723l0-9.143	l-10.5-6.12l1-1.72l11.706,6.827C36.698,23.854,37,24.38,37,24.949l0,8.687c0,6.264-5.13,11.574-11.39,11.358	C22.331,44.88,19.32,43.337,17.3,40.73z"></path>
                        <path fill="#546e7a" d="M35.139,38.167l-0.4-2.967c2.592-0.357,4.813-1.919,6.026-4.254c1.994-3.837,0.4-8.582-3.345-10.745	l-7.918-4.571l-10.55,6.033l-0.99-1.726l11.765-6.724c0.494-0.282,1.101-0.281,1.594,0.003l7.523,4.343	c5.425,3.132,7.459,10.229,4.141,15.543C41.248,35.886,38.406,37.721,35.139,38.167z"></path>
                        <path fill="#546e7a" d="M41.839,21.437l-2.77-1.137c0.987-2.423,0.745-5.128-0.671-7.346	c-2.326-3.645-7.233-4.638-10.977-2.476l-7.918,4.572l-0.05,12.153l-1.99-0.006l0.059-13.551c0.002-0.569,0.307-1.094,0.8-1.379	l7.523-4.343c5.425-3.132,12.588-1.345,15.531,4.185C42.917,15.006,43.086,18.384,41.839,21.437z"></path>
                      </svg>
                    </div>
                  </>
                  :
                  <>
                    <div id='p6' className='icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
                        <path fill="#546e7a" d="M30.7,7.27L28.33,9.1c-1.605-2.067-4.068-3.209-6.697-3.092C17.313,6.2,14,9.953,14,14.277l0,9.143	l10.5,6.12l-1,1.72l-11.706-6.827C11.302,24.146,11,23.62,11,23.051l0-8.687C11,8.1,16.129,2.79,22.39,3.007	C25.669,3.12,28.68,4.663,30.7,7.27z"></path>
                        <path fill="#546e7a" d="M12.861,9.833l0.4,2.967c-2.592,0.357-4.813,1.919-6.026,4.254c-1.994,3.837-0.4,8.582,3.345,10.745	l7.918,4.571l10.55-6.033l0.99,1.726l-11.765,6.724c-0.494,0.282-1.101,0.281-1.594-0.003l-7.523-4.343	C3.73,27.308,1.696,20.211,5.014,14.898C6.752,12.114,9.594,10.279,12.861,9.833z"></path>
                        <path fill="#546e7a" d="M6.161,26.563l2.77,1.137c-0.987,2.423-0.745,5.128,0.671,7.346	c2.326,3.645,7.233,4.638,10.977,2.476l7.918-4.572l0.05-12.153l1.99,0.006l-0.059,13.551c-0.002,0.569-0.307,1.094-0.8,1.379	l-7.523,4.343c-5.425,3.132-12.588,1.345-15.531-4.185C5.083,32.994,4.914,29.616,6.161,26.563z"></path>
                        <path fill="#546e7a" d="M17.3,40.73l2.37-1.83c1.605,2.067,4.068,3.209,6.697,3.092C30.687,41.8,34,38.047,34,33.723l0-9.143	l-10.5-6.12l1-1.72l11.706,6.827C36.698,23.854,37,24.38,37,24.949l0,8.687c0,6.264-5.13,11.574-11.39,11.358	C22.331,44.88,19.32,43.337,17.3,40.73z"></path>
                        <path fill="#546e7a" d="M35.139,38.167l-0.4-2.967c2.592-0.357,4.813-1.919,6.026-4.254c1.994-3.837,0.4-8.582-3.345-10.745	l-7.918-4.571l-10.55,6.033l-0.99-1.726l11.765-6.724c0.494-0.282,1.101-0.281,1.594,0.003l7.523,4.343	c5.425,3.132,7.459,10.229,4.141,15.543C41.248,35.886,38.406,37.721,35.139,38.167z"></path>
                        <path fill="#546e7a" d="M41.839,21.437l-2.77-1.137c0.987-2.423,0.745-5.128-0.671-7.346	c-2.326-3.645-7.233-4.638-10.977-2.476l-7.918,4.572l-0.05,12.153l-1.99-0.006l0.059-13.551c0.002-0.569,0.307-1.094,0.8-1.379	l7.523-4.343c5.425-3.132,12.588-1.345,15.531,4.185C42.917,15.006,43.086,18.384,41.839,21.437z"></path>
                      </svg>
                    </div>
                  </>
              }


              <div id='p7' className='message'>
                {message.message}
              </div>

            </div>
          );
        })}
      </div>

    </div>
    </>
  );
}

export default MainBox;