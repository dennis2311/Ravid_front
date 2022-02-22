import styled from "styled-components";

// App에서만 사용
// html -> body -> #root 다음으로 오는 최외곽 div
export const OutestContainer = styled.div`
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -ms-overflow-style: none;
    // Firefox
    scrollbar-width: none;
    // Chrome, Safari, Opera
    -webkit-scrollbar {
        display: none;
    }
    overflow-y: auto;
`;

// Header가 있는 페이지
export const HeaderPageContainer = styled.div`
    display: block;
`;

// Header가 없는 페이지
export const HeaderLessPageContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    padding: 15px 0px;
`;
