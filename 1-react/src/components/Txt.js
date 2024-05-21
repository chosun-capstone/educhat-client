import React, { useState } from 'react';
import { FaHome } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { LuLogOut } from "react-icons/lu";
import { LuLogIn } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CgFormatLeft } from "react-icons/cg";
import { FaQuestion } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios'
import { redirect } from 'next/dist/server/api-utils';

function AxiosTestComponet() {
  const baseUrl = "http://localhost:8080";;
  const [data, setData] = useState();
  useEffect(() => {
    springDataSet();
  }, [])
}
async function springDataSet() {
  await axios
    .get(baseUrl + "/data-test")
    .then((res) => {
      console.log(res);
      setData(res.dat);
    })
    .catch((err) => {
      console.log(err);
    })
}

// PDF.js worker 경로 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Txt = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
  ]);
  const [numPages, setNumPages] = useState(null);
  const [file, setFile] = useState(null);

  const GoHome = () => {
    navigate("/center");
  };

  const Options = () => {
    navigate("/quest");
  };

  const handleButtonLogOut = () => {
    setIsLoggedIn(false);
  };

  const handleButtonLogIn = () => {
    setIsLoggedIn(true);
    navigate("/login");
  };

  const GoTxt = () => {
    navigate("/txt");
  };

  const GoSummary = () => {
    navigate("/summary");
  };

  const GoChat = () => {
    navigate("/chat");
  };

  const GoQuestion = () => {
    navigate("/question");
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    if (uploadedFile) {
      setUploadedFiles([...uploadedFiles, uploadedFile.name]);
    }
  };

  return (
    <div className="app">
      <div className="left">
        <div className='upper'>
          <div>
            <h2>EduCHAT:에듀챗</h2>
          </div>
        </div>
        <div className="home_icon" onClick={GoHome}>
          <FaHome /> Home
        </div>
        <div styles>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="divider" style={{ borderTop: '3px solid #ddd', margin: '10px 0' }}></div>

        <div className="file_list">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="file_item">
              {file}
            </div>
          ))}
        </div>
        <div className="under">
          <div className="envoption">
            <SlOptions onClick={Options} /> 환경설정
          </div>
          <div className="login_button">
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

      <div className="center_chat" >
        <prev>eva_Test</prev>
      </div>

      <div className="right" style={{ flex: 1, display: 'flex', flexDirection: 'column', }}>
        <div className="Tabs" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="Tabs_txt" onClick={GoTxt}>
            <IoDocumentTextOutline className="icon" />
            <div className="txt_size">문서 보기</div>
          </div>
          <div className="Tabs_summary" onClick={GoSummary}>
            <CgFormatLeft className="icon" />
            <div className="txt_size">요약 보기</div>
          </div>
          <div className="Tabs_chat" onClick={GoChat}>
            <FaQuestion className="icon" />
            <div className="txt_size">질문 하기</div>
          </div>
          <div className="Tabs_question" onClick={GoQuestion}>
            <FaBook className="icon" />
            <div className="txt_size">문제 보기</div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Txt;
