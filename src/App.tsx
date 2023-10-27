import { useState } from 'react';
import './App.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type RingCallbackFn = () => void;

function App() {
  const [countDown, setCountDown] = useState(0);

  let interval: number | undefined = undefined;

  const setTimer = function (
    futureMilliseconds: number,
    ringRing: RingCallbackFn
  ) {
    setCountDown(futureMilliseconds);
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }

    const targetTime = Date.now() + futureMilliseconds;

    const intervalCallback = function () {
      if (Date.now() >= targetTime) {
        ringRing();
        clearInterval(interval);
        interval = undefined;
        setCountDown(0);
      } else {
        setCountDown(targetTime - Date.now());
      }
    };

    interval = setInterval(intervalCallback, 100);
  };

  const ringRing = function (): void {
    alert('Time is up!');
  };

  const pomodoroTime: number = 20 * 60 * 1000;

  return (
    <>
      <div className="card">
        <button onClick={() => setTimer(pomodoroTime, ringRing)}>
          count is {Math.round(countDown / (60 * 1000))}
        </button>
      </div>
      <CircularProgressbar
        value={pomodoroTime - countDown}
        maxValue={pomodoroTime}
        minValue={0}
        text={Math.round(countDown / (60 * 1000)) + ' ish'}
      ></CircularProgressbar>
    </>
  );
}

export default App;
