import { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Button";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [divisor, setDivisor] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    const updatedGood = good + 1;
    const updatedAll = all + 1;
    const updatedTotal = total + 1;
    const updatedDivisor = divisor + 1;

    setGood(updatedGood);
    setAll(updatedAll);
    setTotal(updatedTotal);
    setDivisor(updatedDivisor);
    setAverage(updatedTotal / updatedDivisor);
    setPositive((updatedGood / updatedAll) * 100);
  };

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    const updatedAll = all + 1;
    const updatedDivisor = divisor + 1;

    setNeutral(updatedNeutral);
    setAll(updatedAll);
    setDivisor(updatedDivisor);
    if (updatedDivisor === 1) {
      setAverage(0);
    } else {
      setAverage(total / updatedDivisor);
    }
    setPositive((good / updatedAll) * 100);
  };

  const handleBad = () => {
    const updatedBad = bad + 1;
    const updatedAll = all + 1;
    const updatedTotal = total - 1;
    const updatedDivisor = divisor + 1;

    setBad(updatedBad);
    setAll(updatedAll);
    setTotal(updatedTotal);
    setDivisor(updatedDivisor);
    setAverage(updatedTotal / updatedDivisor);
    setPositive((good / updatedAll) * 100);
  };

  return (
    <div>
      <p>
        <strong>give feedback</strong>
      </p>
      <Button handleClick={handleGood} text="good"></Button>
      <Button handleClick={handleNeutral} text="neutral"></Button>
      <Button handleClick={handleBad} text="bad"></Button>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
