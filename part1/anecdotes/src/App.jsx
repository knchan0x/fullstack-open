import { useState } from "react";

import Header from "./Header";
import Button from "./Button";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [favour, setFavour] = useState(0);

  const handleNextClick = () => {
    const newSelected = Math.floor(Math.random() * anecdotes.length);
    setSelected(newSelected);
  };

  const handleVoteClick = (position) => () => {
    const copy = [...votes];
    copy[position] += 1;
    setVotes(copy);
    if (copy[position] > copy[favour]) {
      setFavour(position);
    }
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button text="vote" handleClick={handleVoteClick(selected)} />
      <Button text="next anecdote" handleClick={handleNextClick} />
      <Header text="Anecdote with most votes" />
      <p>{anecdotes[favour]}</p>
    </div>
  );
};

export default App;
