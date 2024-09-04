//Recoil을 이용해서 전체 에플리케이션에서 사용할 데어틀 ㄹ선언
//기존 SSR에서 sseision 역학을 recoil이 대신 수행 -> 서버는 더이상 상태를 갖지 않을 것이므로 sessin을 사용하지 않음
//atom : 데이터를 저장할 수 있음

import { atom, selector } from "recoil";

//selector : 존재하는 데이터를 이요앻서 함수에서 뎅이터를 편집하여 리던할 수 있음
//외부에서 데이터를 저장하거나 또는 사용하고 싶은 경우 atom
//외부에서 특정 데이터를 통한 특정 연산결과를 도출하고 싶으면 selector
//로그인한 아이디를 저자하는 저장소
//select 사용시-> useRecoilValue => 함수에서 리턴시 받는 작업
const loginIdState = atom({
  key: "loginIdState",
  default: "test",
});
const memberTypeState = atom({
  key: "memberTypeState",
  default: 0,
});

const isLoginState = selector({
  key: "isLoginState",
  get: (state) => {
    const loginId = state.get(loginIdState);
    const memberType = state.get(memberTypeState);
    //로그인여부 -> LoginIdSTate값이 빈문자열이 아니고 멤버스테이츠값이 0이 아닌경우
    return loginId !== "" && memberType !== 0;
  },
});

export { loginIdState, memberTypeState, isLoginState };
