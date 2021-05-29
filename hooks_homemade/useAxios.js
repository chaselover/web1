import defaultAxios from "axios";
import React, { useState, useEffect } from "react";

// 우리는 그들이 axiodInstance를 보내지않는다면 패키지 안에서 default를 찾을것임.
const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });
  // refetching을 위한 trigger
  const [trigger, setTrigger] = useState(0);
  if (!opts.url) {
    return;
  }
  const refetch = () => {
    setState({
      ...state,
      loading: true,
    });
    // 그냥 랜덤한 숫자를 발생하기 위한 new date
    // trigger를 바꿔 refetch를 유발하기 위한 random
    setTrigger(new Date());
  };
  useEffect(() => {
    // axios가 데이터 받으면~
    axiosInstance(opts)
      .then((data) => {
        setState({
          ...state,
          loading: false,
          data,
        });
      })
      // 에러가 있으면~
      .catch((error) => {
        setState({ ...state, loading: false, error });
      });
  }, [trigger]);
  // useEffect를 refetch(다시 가져오기)하려면?
  // dependency(trigger를 주면됨!
  return { ...state, refetch };
};

export default useAxios;
