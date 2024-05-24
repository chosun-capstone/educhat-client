import React, {useState} from 'react';
import {FaHome} from "react-icons/fa";
import {SlOptions} from "react-icons/sl";
import {LuLogOut} from "react-icons/lu";
import {LuLogIn} from "react-icons/lu"
import {useNavigate} from "react-router-dom"

const Center = () => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const GoHome = () => {
        //Home키로 돌아갈 수 있는 기능
    };
    const Options = () => {
        // 환경설정 할 수 있는 기능
        navigate("/txt");
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const fileExtension = file.name.split('.').pop().toLowerCase();
          const supportedFormats = ['pptx', 'txt', 'pdf', 'dotx'];
  
          if (supportedFormats.includes(fileExtension)) {
              // 지원되는 파일 형식일 경우 txt.js로 이동
              navigate('/txt', { file });
          } else {
              // 지원되지 않는 파일 형식일 경우 알림 표시
              alert('지원하지 않는 파일 형식입니다.');
          }
        }
      };
      
      const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        handleFile(file);
      }
  
      const handleDragOver = (event) => {
        event.preventDefault();
      }

    const Logo = () => (
        <svg className="icon" x="0px" y="0px" viewBox="0 0 24 24">
            <path fill="transparent" d="M0,0h24v24H0V0z"/>
            <path
                fill="#FFF"
                d="M20.5,5.2l-1.4-1.7C18.9,3.2,18.5,3,18,3H6C5.5,3,5.1,3.2,4.8,3.5L3.5,5.2C3.2,5.6,3,6,3,6.5V19  c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6.5C21,6,20.8,5.6,20.5,5.2z M12,17.5L6.5,12H10v-2h4v2h3.5L12,17.5z M5.1,5l0.8-1h12l0.9,1  H5.1z"
            />
        </svg>
    );

    const Upload = () => (
        <svg style={{
            width: "87px",
            height: "87px"
        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path fill="#A3A3A3"
                  d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/>
        </svg>
    )

    return (
        <div className="app">
            <div className="left">
                <div className='upper'>
                    <h2> EduCHAT:에듀챗 </h2>
                    <div className='bar_elem' onClick={GoHome}>
                        <FaHome size={27}/>
                        <span>Home</span>
                    </div>
                </div>
                <div className='under'>
                    <div className='envoption'>
                        <div className='bar_bottom_elem' onClick={GoHome}>
                            <SlOptions onClick={Options}/>
                            <span>환경설정</span>
                        </div>
                    </div>
                    <div className='bar_bottom_elem'>
                        {isLoggedIn ? (
                            <>
                                <LuLogOut onClick={handleButtonLogOut}/> 로그아웃
                            </>
                        ) : (
                            <>
                                <LuLogIn onClick={handleButtonLogIn}/> 로그인
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="center_upload">
                <h2 style={{fontSize: "80px", margin: "0"}}>EduCHAT</h2>
                <h2 style={{fontSize: "50px", margin: "0", fontWeight: "normal"}}>여기에 설명을 입력하세요</h2>
                <label className="preview" style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <input type="file" className="file_upload" onChange={handleFileChange}/>
                    <div className="upload_box" style={{marginTop: "64px"}}>
                        <Upload/>
                        <div style={{fontSize: "32px", color: "#A3A3A3"}}>끌어서 문서 업로드</div>
                        <div className="preview_desc" style={{fontSize: "18px", color: "#A3A3A3"}}>(지원 포맷: .pptx,
                            .dotx, .pdf, .txt)</div>

                    </div>
                    <span className="preview_msg">혹은 직접 컴퓨터에서
                      <span style={{color: "#928FFF"}}> 파일 업로드</span>하기</span>


                </label>
            </div>
        </div>
    );

}

export default Center;
