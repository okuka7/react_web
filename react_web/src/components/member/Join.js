import { useRef, useState } from "react";
import "./member.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Join = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const navigate = useNavigate();
  const [member, setMember] = useState({
    memberId: "",
    memberPw: "",
    memberName: "",
    memberPhone: "",
  });
  //아이디 중복체크 결과에 따라서 바뀔 state
  // 0 : 아직 입력하지않은 상태, 1 : 정규표현식, 중복체크 모두 통과한 경우
  // 2 : 정규표현식을 만족하지 못한 상태, 3 ; 아이디가 중복인경우
  const [idCheck, setIdCheck] = useState(0);
  const checkId = () => {
    //아이디 유효성검사
    //1. 정규표현식 검사
    //2. 정규표현식 검사 성공하면 DB에 중복체크
    const idReg = /^[a-zA-Z0-9]{4,8}$/;
    if (!idReg.test(member.memberId)) {
      setIdCheck(2);
    } else {
      axios
        .get(`${backServer}/member/memberId/${member.memberId}/check-id`)
        .then((res) => {
          console.log(res);
          if (res.data === 1) {
            setIdCheck(3);
          } else if (res.data === 0) {
            setIdCheck(1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const changeMember = (e) => {
    const name = e.target.name;
    setMember({ ...member, [name]: e.target.value });
  };
  const [memberPwRe, setMemberPwRe] = useState("");
  const changeMemberPwRe = (e) => {
    setMemberPwRe(e.target.value);
  };

  //비밀번호 / 비밀번호 확인이 같은 체크에서 메세지 출력
  // react에서는 요소를 선택할 때 document.querySelector() 방식 권고하지 않음
  // usRef 혹을 이용해서 요소와 연결해서 사용(연결하고 싶은 태그의 ref 속성에 해당 객체를 적용)
  //연결이되면 해당 객체의 current속성이 dom객체를 의미
  const pwMessage = useRef(null);
  const checkPw = () => {
    pwMessage.current.classList.remove("valid");
    pwMessage.current.classList.remove("invalid");
    if (member.memberPw === memberPwRe) {
      console.log("비밀번호가 일치");
      pwMessage.current.innerText = "비밀번호가 일치합니다.";
      pwMessage.current.classList.add("valid");
    } else {
      console.log("비밀번호가 일치하지 않을 때");
      pwMessage.current.innerText = "비밀번호가 일치하지 않습니다.";
      pwMessage.current.classList.add("invalid");
    }
  };
  const join = () => {
    if (idCheck === 1 && pwMessage.current.classList.contains("valid")) {
      axios
        .post(`${backServer}/member`, member)
        .then((res) => {
          console.log(res);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Swal.fire({
        text: "입력 값을 확인하세요.",
        icon: "info",
        confirmButtonColor: "var(--main3)",
      });
    }
  };
  return (
    <section className="section join-wrap">
      <div className="page-title">회원가입</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          join();
        }}
      >
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberId">아이디</label>
          </div>
          <div className="input-item">
            <input
              type="text"
              name="memberId"
              id="memberId"
              value={member.memberId}
              onChange={changeMember}
              onBlur={checkId}
            ></input>
          </div>
          <p
            className={
              "input-msg" +
              (idCheck === 0 ? "" : idCheck === 1 ? " valid" : " invalid")
            }
          >
            {idCheck === 0
              ? ""
              : idCheck === 1
              ? "사용가능한 아이디 입니다."
              : idCheck === 2
              ? "아이디는 영어 대/소문자 숫자로 4~8글자 입니다."
              : "이미 사용중인 아이디 입니다."}
          </p>
        </div>
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberPw">비밀번호</label>
          </div>
          <div className="input-item">
            <input
              type="password"
              name="memberPw"
              id="memberPw"
              value={member.memberPw}
              onChange={changeMember}
            ></input>
          </div>
        </div>
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberPwRe">비밀번호 확인</label>
          </div>
          <div className="input-item">
            <input
              type="password"
              name="memberPwRe"
              id="memberPwRe"
              value={memberPwRe}
              onChange={changeMemberPwRe}
              onBlur={checkPw}
            ></input>
          </div>
          <p className="input-msg" ref={pwMessage}></p>
        </div>
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberName">이름</label>
          </div>
          <div className="input-item">
            <input
              type="text"
              name="memberName"
              id="memberName"
              value={member.memberName}
              onChange={changeMember}
            ></input>
          </div>
        </div>
        <div className="input-wrap">
          <div className="input-title">
            <label htmlFor="memberPhone">전화번호</label>
          </div>
          <div className="input-item">
            <input
              type="text"
              name="memberPhone"
              id="memberPhone"
              value={member.memberPhone}
              onChange={changeMember}
            ></input>
          </div>
        </div>
        <div className="join-button-box">
          <button type="submit" className="btn-primary lg">
            회원가입
          </button>
        </div>
      </form>
    </section>
  );
};

export default Join;
