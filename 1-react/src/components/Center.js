import React, {useEffect, useState} from 'react';
import {FaHome} from "react-icons/fa";
import {SlOptions} from "react-icons/sl";
import {LuLogOut} from "react-icons/lu";
import {LuLogIn} from "react-icons/lu"
import {useNavigate} from "react-router-dom"
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import axios from "axios";

const serverUrl = (path) => `https://educhat-server.yeongmin.kr${path}`;
//const serverUrl = (path) => `http://localhost:9990${path}`;

const Center = () => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [fileArray, setFileArray] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setUploading] = useState(false);

    const GoHome = () => {
        //Home키로 돌아갈 수 있는 기능
        setSelectedFile(null);
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



    const Logo = () => (
        <svg className="icon" x="0px" y="0px" viewBox="0 0 24 24">
            <path fill="transparent" d="M0,0h24v24H0V0z"/>
            <path
                fill="#FFF"
                d="M20.5,5.2l-1.4-1.7C18.9,3.2,18.5,3,18,3H6C5.5,3,5.1,3.2,4.8,3.5L3.5,5.2C3.2,5.6,3,6,3,6.5V19  c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6.5C21,6,20.8,5.6,20.5,5.2z M12,17.5L6.5,12H10v-2h4v2h3.5L12,17.5z M5.1,5l0.8-1h12l0.9,1  H5.1z"
            />
        </svg>
    );

    useEffect(() => {
        if (isUploading) return;
        (async () => {
            const res = await axios.get(serverUrl('/files'));
            setFileArray(res.data);
        })();

    }, [isUploading]);

    const onClickItem = (file) => {
        setSelectedFile(file);
    }



    return (
        <div className="app">
            <div className="left">
                <div className='upper'>
                    <h2> EduCHAT:에듀챗 </h2>
                    <div className='bar_elem' onClick={GoHome}>
                        <FaHome size={27}/>
                        <span>Home</span>
                    </div>
                    <div className='file_lis'>
                        {fileArray.map((file) => {
                            return (<div key={file.fileId} className={selectedFile === file ? 'file_itm_sel' : 'file_itm'} onClick={() => onClickItem(file)}>
                                {file.fileName}
                            </div>);
                        })}
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

                {selectedFile == null ? <Home isUploading={isUploading} setUploading={setUploading}/> :<Viewer selectedFile={selectedFile}/>}
            </div>
        </div>
    );

}

const Home = (props) => {
    const isUploading = props.isUploading;
    const setUploading = props.setUploading;
    const handleFileChange = (files) => {
        if(isUploading) return;
        const file = files[0];
        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            const supportedFormats = ['pptx', 'txt', 'pdf', 'docx', 'doc', 'ppt'];

            if (supportedFormats.includes(fileExtension)) {
                // 지원되는 파일 형식일 경우 txt.js로 이동
                setUploading(true);
                (async () => {
                    const formData = new FormData();
                    formData.append('file', file)
                    try {
                        const res = await axios.post(serverUrl('/files'), formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                    } finally {
                        setUploading(false);
                    }
                })();

            } else {
                // 지원되지 않는 파일 형식일 경우 알림 표시
                alert('지원하지 않는 파일 형식입니다.');
            }
        }
    };

    const [dragOver, setDragOver] = useState(false);

    // 드래그 중인 요소가 목표 지점 진입할때
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(true);
    };

    // 드래그 중인 요소가 목표 지점을 벗어날때
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
    };

    // 드래그 중인 요소가 목표 지점에 위치할때
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // 드래그 중인 요소가 목표 지점에서 드롭될때
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);

        // 드래그되는 데이터 정보와 메서드를 제공하는 dataTransfer 객체 사용
        if (e.dataTransfer) {
            handleFileChange(e.dataTransfer.files);
        }
    };

    const Upload = () => (
        <svg style={{
            width: "87px",
            height: "87px"
        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path fill="#A3A3A3"
                  d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/>
        </svg>
    )

    // Drag & Drop이 아닌 클릭 이벤트로 업로드되는 기능도 추가
    const handleChange = (e) => {
        handleFileChange(e.target.files);

        // input 요소의 값 초기화
        e.target.value = "";
    };
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            {isUploading?<div style={{
                width: "100vw",
                height: "100vh",
                left: 0,
                position: "fixed",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}/>:<></>}

            <h2 style={{fontSize: "80px", margin: "0"}}>EduCHAT</h2>
            <h2 style={{fontSize: "50px", margin: "0", fontWeight: "normal"}}>함께 배우고 함께 성장하는,,</h2>
            <label className="preview" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <input type="file" className="file_upload" onChange={handleChange}/>
                <div className="upload_box" style={{marginTop: "64px", backgroundColor: dragOver ? "#525252" : null}}
                     onDragEnter={handleDragEnter}
                     onDragLeave={handleDragLeave}
                     onDragOver={handleDragOver}
                     onDrop={handleDrop}>
                    <Upload/>
                    <div style={{fontSize: "32px", color: "#A3A3A3"}}>{isUploading ? "파일 업로드중...":"끌어서 문서 업로드"}</div>
                    <div className="preview_desc" style={{fontSize: "18px", color: "#A3A3A3"}}>(지원 포맷: .pptx,
                        .dotx, .pdf, .txt)</div>

                </div>
                <span className="preview_msg">혹은 직접 컴퓨터에서
                      <span style={{color: "#928FFF", cursor: "pointer"}}> 파일 업로드</span>하기</span>


            </label>
        </div>
    )
}

const Viewer = (props) => {
    console.log(props.selectedFile);
    const [summaryArr, setSummaryArr] = useState([]);
    useEffect(() => {
        axios.get(serverUrl('/summary/' + props.selectedFile.fileId)).then((res) => {
            setSummaryArr(res.data);
        });
    }, [props.selectedFile]);
    const [viewMode, setViewMode] = useState(0); //0 문서보기 1 요약보기 2 질문하기 3 문제보기
    const docs = [
        { uri: serverUrl("/files/" + props.selectedFile.fileId),
            fileName: props.selectedFile.fileName
        }, // Remote file
    ];
    const onTapSwitch = (num) => {
        setViewMode(num);
    }
    const docView = <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} style={{
        height: "100%"
    }} theme={{
        primary: "#262626",
        secondary: "#ffffff",
        tertiary: "#525252",
        textPrimary: "#ffffff",
        textSecondary: "#5296d8",
        textTertiary: "#ffffff",
        disableThemeScrollbar: false,
    }} config={{
        pdfVerticalScrollByDefault: true,
        pdfZoom: {
            defaultZoom: 1.0, // 1 as default,
            zoomJump: 0.2, // 0.1 as default,
        },
    }}

    />

    const summaryView = () => {
        const resArr = []
        summaryArr.forEach((item) => {
            resArr.push(<div key={item.id} className='summary_item'>
                <h2>페이지 {item.page}</h2>
                {item.content}
            </div>);
        });
        return <div style={{
            display:'flex',
            flexDirection: 'row',
            height: '100%',
        }}>
            <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} style={{
                 height: "100%",
                flexGrow: '2',
                width: '50%'
            }} theme={{
                primary: "#262626",
                secondary: "#ffffff",
                tertiary: "#525252",
                textPrimary: "#ffffff",
                textSecondary: "#5296d8",
                textTertiary: "#ffffff",
                disableThemeScrollbar: false,
            }} config={{
                pdfVerticalScrollByDefault: true,
                pdfZoom: {
                    defaultZoom: 1.0, // 1 as default,
                    zoomJump: 0.2, // 0.1 as default,
                },
            }}

            />
            <div style={{
                padding: '20px 16px 20px 16px',
                flexGrow: '1',
                width: '50%'
            }}>{resArr}</div>

        </div>
    }

    const getViewByViewMode = () => {
        switch (viewMode) {
            case 0:
                return docView;
            case 1:
                return summaryView();
        }
    }
    return <div className='view_main'>
        <div style={{height: '100%', backgroundColor: '#262626', flexGrow: 1}}>
            {
                getViewByViewMode()
            }
        </div>
        <div className='view_sidebar' style={{height: '100%', backgroundColor: '#E5E5E5', flexGrow: 0}}>
            <div className={viewMode === 0 ? 'sidebar_btn_sel' : 'sidebar_btn'} onClick={() => {
                onTapSwitch(0);
            }}>
                <svg style={{
                    width: '23px',
                    height: '23px'
                }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill='#E5E5E5' d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64zm56 256c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24H264c13.3 0 24-10.7 24-24s-10.7-24-24-24H120z"/></svg>
                <a>문서 보기</a>
            </div>
            <div className={viewMode === 1 ? 'sidebar_btn_sel' : 'sidebar_btn'} onClick={() => {
                onTapSwitch(1);
            }}>
                <svg style={{
                    width: '23px',
                    height: '23px'
                }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill='#E5E5E5' d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg>
                <a>요약 보기</a>
            </div>
            <div className={viewMode === 2 ? 'sidebar_btn_sel' : 'sidebar_btn'} onClick={() => {
                onTapSwitch(2);
            }}>
                <svg style={{
                    width: '23px',
                    height: '23px'
                }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill='#E5E5E5' d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>
                <a>질문 하기</a>
            </div>
            <div className={viewMode === 3 ? 'sidebar_btn_sel' : 'sidebar_btn'} onClick={() => {
                onTapSwitch(3);
            }}>
                <svg style={{
                    width: '23px',
                    height: '23px'
                }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill='#E5E5E5' d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
                        <a>문제 보기</a>
            </div>
        </div>
    </div>
}

export default Center;
