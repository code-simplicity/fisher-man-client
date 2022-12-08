import { useEffect, useState } from 'react';

// 倒计时接口定义
export interface useCountDownProps {
  num: number;
}
/**
 * 自定义倒计时的hooks
 */
const useCountDown = (props: useCountDownProps) => {
  const { num } = props;
  const [timerState, setTimerState] = useState<number>(num || 0);
  const onChange = (n: number) => {
    return setTimeout(() => {
      // eslint-disable-next-line no-param-reassign
      const current = --n;
      setTimerState(current);
    }, 1000);
  };
  useEffect(() => {
    const timer = onChange(timerState);
    if (timerState === 0) {
      setTimerState(timerState);
      clearTimeout(timer);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [timerState]);
  return { timerState };
};

export default useCountDown;
