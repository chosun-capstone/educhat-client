import React, { useState } from 'react';
import { FaHome } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { LuLogOut } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import { IoDocumentTextOutline } from "react-icons/io5";
import { CgFormatLeft } from "react-icons/cg";
import { FaQuestion } from "react-icons/fa";
import { FaBook } from "react-icons/fa";

const Summary = () => {

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const GoHome = () => {
    //Home키로 돌아갈 수 있는 기능
    navigate("/center");
  };
  const Options = () => {
    // 환경설정 할 수 있는 기능
    navigate("/quest");
  };

  const handleButtonLogOut = () => {
    // 로그아웃 할 수 있는 기능
    setIsLoggedIn(false);
  };

  const handleButtonLogIn = () => {
    // 로그인 화면으로 넘어가는 기능
    setIsLoggedIn(true);
    navigate("/login");

  };

  const GoTxt = () => {
    // 문서 보기 클릭 시 넘어가는 기능
    navigate("/txt");
  };

  const GoSummary = () => {
    // 요약 보기 클릭 시 넘어가는 기능
    navigate("/summary");
  };

  const GoChat = () => {
    // 질문 하기 클릭 시 넘어가는 기능
    navigate("/chat");
  };

  const GoQuestion = () => {
    // 문제 보기 클릭 시 넘어가는 기능
    navigate("/question");
  };


  return (
    <div className="app">
      <div className="left">
        <div className='upper'>
          <h2> EduCHAT:에듀챗 </h2>
          <div className='home_icon' onClick={GoHome}>
            <FaHome /> Home
          </div>
        </div>
        <div className='under'>
          <div className='envoption'>
            <SlOptions onClick={Options} /> 환경설정
          </div>
          <div className='login_button'>
            {isLoggedIn ? (
              <>
                <LuLogOut onClick={handleButtonLogOut} /> 로그아웃
              </>
            ) : (
              <>
                <LuLogIn onClick={handleButtonLogIn} /> 로그인
              </>
            )}
          </div>
        </div>
      </div>

      <div className="center_chat">
        <div className="divider" style={{ borderLeft: '3px solid #ddd', left: 700, height: '710px', position: "absolute" }}>
          <div className="parent" style={{ borderRight: "1px solid #ffffff", paddingRight: "16rem", paddingLeft: "22rem", position: "absolute", right: "-615px", borderRadius: 50 }}></div>
        </div>
      </div>


      <div className="Tabs">
        <div className="Tabs_txt" onClick={GoTxt}>
          <IoDocumentTextOutline className='icon' />
          <div className='txt_size'>
            문서 보기
          </div>
        </div>
        <div className="Tabs_summary" onClick={GoSummary}>
          <CgFormatLeft className='icon' />
          <div className='txt_size'>
            요약 보기
          </div>
        </div>
        <div className="Tabs_chat" onClick={GoChat}>
          <FaQuestion className='icon' />
          <div className='txt_size'>
            질문 하기
          </div>
        </div>
        <div className="Tabs_question" onClick={GoQuestion}>
          <FaBook className='icon' />
          <div className='txt_size'>
            문제 보기
          </div>
        </div>
      </div>

    </div>
  );

}

export default Summary;

