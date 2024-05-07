'use client'
import React, { useEffect, useRef, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { TbMessageCircleOff, TbImageInPicture } from "react-icons/tb";
import { FaMicrophone } from "react-icons/fa";


// admin bank details 
const adminBankDetails = {
    "bank": "67672763434",
    "jazzcash": "54057097593455",
    "easypaisa": "027309273902739709",
}

function MessageBox({ messages, typingAnimation, message, setmessage, handleSendMessage, startRecording, sendQuestions, setMessages }) {
    const messagesEndRef = useRef(null);
    const [userBankDetails, setUserBankDetails] = useState([]);
    const [buttonPress, setButtonPress] = useState({
        "option-create-id": false,
        "option-deposit": false,
        "option-widthraw": false,
        "option-apk": false,
        "deposit-bank": false,
        "deposit-jazzcash": false,
        "deposit-easypaisa": false,
        "widthraw-bank": false,
        "widthraw-jazzcash": false,
        "widthraw-easypaisa": false,
    })

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const buttonPressHandle = (name) => {
        setButtonPress(prev => {
            let copy = JSON.parse(JSON.stringify(prev));
            copy[name] = true;
            return copy;
        })
    }



    const HandleCrateId = () => {
        buttonPressHandle("option-create-id")
        sendQuestions(["Betpro Exch Lg Exch"])
    }

    const handleDeposit = () => {
        buttonPressHandle("option-deposit")
        setMessages((prev) => [...prev, { msg: "deposit", status: "options" }])
    }

    const handleWidthraw = () => {
        buttonPressHandle("option-widthraw")
        setMessages((prev) => [...prev, { msg: "widthraw", status: "options" }])
    }

    const handleWidthrawDetails = (name) => {
        sendQuestions([`send your ${name} account details`]);
    }
    const handleDepositDetails = (name) => {
        sendQuestions([`this is admin ${name} details. send payment on this account id${adminBankDetails[name]}`]);
    }

    // aduio record function 


    const buttons = {
        "options": () => (<div class="flex justify-start mb-4">
        <img
            src="Images/bot.png"
            class="object-cover h-10 w-10 rounded-full"
            alt=""
        />
        <div
            class="ml-2 py-3 px-4  rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
        >
            Choose
            <div className='flex flex-col space-y-3 '>
                <button type="button" class={`py-2 px-4 rounded-3xl   hover:bg-gradient hover:text-white transition-all ${buttonPress["option-create-id"] ? "bg-gradient text-white" :"border border-[#2234AE] text-[#2234AE]" }`} onClick={HandleCrateId}>Create Id</button>
                <button type="button" class={`py-2 px-4 rounded-3xl   hover:bg-gradient hover:text-white transition-all ${buttonPress["option-deposit"] ? "bg-gradient text-white" :"border border-[#2234AE] text-[#2234AE]" }`} onClick={handleDeposit}>Deposit</button>


                <button type="button" class={`py-2 px-4 rounded-3xl   hover:bg-gradient hover:text-white transition-all ${buttonPress["option-widthraw"] ? "bg-gradient text-white" :"border border-[#2234AE] text-[#2234AE]" }`} onClick={handleWidthraw}>Widthraw</button>
                <button type="button" class={`py-2 px-4 rounded-3xl   hover:bg-gradient hover:text-white transition-all ${buttonPress["option-apk"] ? "bg-gradient text-white" :"border border-[#2234AE] text-[#2234AE]" }`} onClick={() => buttonPressHandle("option-apk")}>APK IDs</button>


            </div>


        </div>
    </div>),
    "widthraw": () => 
        (<div class="flex justify-start mb-4">
        <img
            src="Images/bot.png"
            class="object-cover h-10 w-10 rounded-full"
            alt=""
        />
        <div
            class="ml-2 py-3 px-4 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
        >
            Choose
            <div className='flex flex-col space-y-3 '>
                <button type="button" class={`py-2 px-4 rounded-3xl   hover:bg-gradient hover:text-white transition-all ${buttonPress["widthraw-bank"] ? "bg-gradient text-white" :"border border-[#2234AE] text-[#2234AE]" }`}  onClick={() => {handleWidthrawDetails("Bank"); buttonPressHandle("widthraw-bank")}}>Bank</button>
                <button type="button" class={`py-2 px-4 rounded-3xl   hover:bg-gradient hover:text-white transition-all ${buttonPress["widthraw-jazzcash"] ? "bg-gradient text-white" :"border border-[#2234AE] text-[#2234AE]" }`}  onClick={() => {handleWidthrawDetails("Jazzcash"); buttonPressHandle("widthraw-jazzcash")}}>Jazzcash</button>


                <button type="button" class={`py-2 px-4 rounded-3xl   hover:bg-gradient hover:text-white transition-all ${buttonPress["widthraw-easypaisa"] ? "bg-gradient text-white" :"border border-[#2234AE] text-[#2234AE]" }`}  onClick={() => {handleWidthrawDetails("Easypaisa"); buttonPressHandle("widthraw-easypaisa")}}>Easypaisa</button>
            </div>


        </div>
    </div>),
    "deposit": () => 
        (<div class="flex justify-start mb-4">
        <img
            src="Images/bot.png"
            class="object-cover h-10 w-10 rounded-full"
            alt=""
        />
        <div
            class="ml-2 py-3 px-4 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
        >
            Choose
            <div className='flex flex-col space-y-3 '>
                <button type="button" class={`py-2 px-4 rounded-3xl   hover:bg-gradient hover:text-white transition-all ${buttonPress["deposit-bank"] ? "bg-gradient text-white" :"border border-[#2234AE] text-[#2234AE]" }`} onClick={() => {handleDepositDetails("bank"); buttonPressHandle("deposit-bank")}}>Bank</button>
                <button type="button" class={`py-2 px-4 rounded-3xl   hover:bg-gradient hover:text-white transition-all ${buttonPress["deposit-jazzcash"] ? "bg-gradient text-white" :"border border-[#2234AE] text-[#2234AE]" }`} onClick={() => {handleDepositDetails("jazzcash"); buttonPressHandle("deposit-jazzcash")}}>Jazzcash</button>


                <button type="button" class={`py-2 px-4 rounded-3xl   hover:bg-gradient hover:text-white transition-all ${buttonPress["deposit-easypaisa"] ? "bg-gradient text-white" :"border border-[#2234AE] text-[#2234AE]" }`} onClick={() => {handleDepositDetails("easypaisa"); buttonPressHandle("deposit-easypaisa")}}>Easypaisa</button>
            </div>


        </div>
    </div>)
    
    }

    return (
        <div>

            <div class="w-full px-5 flex flex-col justify-end">
                <div class="h-[70vh] overflow-y-auto flex flex-col  mb-4">



                    {
                        messages.map((msg) => {
                            if (msg.status == "options") {
                                const Component = buttons[msg.msg];
                                console.log(Component)
                                return (
                                    
                                    <Component/>
                                )
                            }
                            else if (msg.status == "incoming") {
                                return <div class="flex justify-start mb-4">
                                    <img
                                        src="Images/bot.png"
                                        class="object-cover h-10 w-10 rounded-full"
                                        alt=""
                                    />
                                    <div
                                        class="ml-2 p-2 md:py-3 md:px-4 text-black/80 shadow-md rounded-br-3xl rounded-tr-3xl rounded-tl-xl "
                                    >
                                        {msg.isaudio ? <audio src={msg.msg} controls autoPlay /> : msg.msg}
                                    </div>
                                </div>
                            }
                            else if (msg.status == "outgoing") {
                                return <div class="flex justify-end mb-4">
                                    <div
                                        class="mr-2  p-2 md:py-3 md:px-4 shadow-md text-black/80 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl "
                                    >
                                        {msg.msg}
                                    </div>

                                </div>
                            }
                        })

                    }


                    {typingAnimation ?

                        <div class="flex justify-start mb-4">
                            <img
                                src="Images/bot.png"
                                class="object-cover h-10 w-10 rounded-full"
                                alt=""
                            />
                            <div
                                class="ml-2 py-3 px-4 shadow-md rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                            >


                                <div class='flex space-x-2 justify-center items-center  dark:invert'>
                                    <span class='sr-only'>Loading...</span>
                                    <div class='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                    <div class='h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                    <div class='h-2 w-2 bg-white rounded-full animate-bounce'></div>
                                </div>






                            </div>
                        </div>
                        : ""}
                    {/* <div class="flex justify-start mb-4">
                        <img
                            src="Images/bot.png"
                            class="object-cover h-10 w-10 rounded-full"
                            alt=""
                        />
                        <div
                            class="ml-2 py-3 px-4 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                        >
                            Choose
                            <div className='flex flex-col space-y-3 '>
                                <button type="button" class="py-2 px-4 rounded-3xl text-[#2234AE] border border-[#2234AE] hover:bg-gradient hover:text-white transition-all" onClick={HandleCrateId}>Create Id</button>
                                <button type="button" class="py-2 px-4 rounded-3xl text-[#2234AE] border border-[#2234AE] hover:bg-gradient hover:text-white transition-all">Deposit</button>


                                <button type="button" class="py-2 px-4 rounded-3xl text-[#2234AE] border border-[#2234AE] hover:bg-gradient hover:text-white transition-all">with Draw</button>
                                <button type="button" class="py-2 px-4 rounded-3xl text-[#2234AE] border border-[#2234AE] hover:bg-gradient hover:text-white transition-all">APK IDs</button>


                            </div>


                        </div>
                    </div> */}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div class="md:p-5  flex flex-row justify-between items-center space-x-4">
            <button class="bg-gradient font-bold p-2 md:py-3 md:px-4 rounded-full md:rounded text-sm md:text-4xl" onClick={handleSendMessage}>
                    <TbImageInPicture/>
                </button>
                <input
                    class="w-full outline-none border border-gray-50  text-black/80 shadow-md py-2 md:py-4 px-3 rounded-xl"
                    type="text"
                    placeholder="type your message here..."
                    onChange={(e) => setmessage(e.target.value)}

                    value={message}
                />
                <button class="bg-gradient font-bold p-2 md:py-3 md:px-4 rounded-full md:rounded text-sm md:text-4xl" onClick={handleSendMessage}>
                    <IoSend/>
                </button>
                <button class="bg-gradient font-bold p-2 md:py-3 md:px-4 rounded-full md:rounded text-sm md:text-4xl" onClick={startRecording}>
                    <FaMicrophone />
                </button>
            </div>
        </div>
    )
}

export default MessageBox