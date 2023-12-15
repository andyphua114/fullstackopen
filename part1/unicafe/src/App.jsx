import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.action}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.value.all === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.value.good} />
          <StatisticLine text="neutral" value={props.value.neutral} />
          <StatisticLine text="bad" value={props.value.bad} />
          <StatisticLine text="all" value={props.value.all} />
          <StatisticLine text="average" value={props.value.average} />
          <StatisticLine text="positive" value={props.value.positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  //save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [score, setScore] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
    const newAll = all + 1
    setAll(newAll)
    const newScore = score + 1
    setScore(newScore)
    setAverage((newScore / newAll).toFixed(1))
    setPositive((100 * good / newAll).toFixed(1))
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    const newAll = all + 1
    setAll(newAll)
    setAverage((score / newAll).toFixed(1))
    setPositive((100 * good / newAll).toFixed(1))
  }

  const handleBad = () => {
    setBad(bad + 1)
    const newAll = all + 1
    setAll(newAll)
    const newScore = score - 1
    setScore(newScore)
    setAverage((newScore / newAll).toFixed(1))
    setPositive((100 * good / newAll).toFixed(1))
  }

  const statsValues = {
    good: good,
    bad: bad,
    neutral: neutral,
    all: all,
    average: average,
    positive: positive
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button action={handleGood} text="good" />
      <Button action={handleNeutral} text="neutral" />
      <Button action={handleBad} text="bad" />
      <h1>statistics</h1>
      <Statistics value={statsValues} />
    </div>
  )
}

export default App