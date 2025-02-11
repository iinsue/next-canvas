import { useEvent } from "react-use";

// 작업 시 뒤로가기 새로고침시 Alert
export const useWindowEvents = () => {
  useEvent("beforeunload", (event) => {
    (event || window.event).returnValue = "Are you sure you want to leave?";
  });
};
