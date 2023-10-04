const Total = ({ parts }) => {
  const total = parts.map((part) => part.exercises).reduce((a, b) => a + b, 0);
  
  return (
    <div>
      <b>Total of {total} exercises</b>
    </div>
  );
};

export default Total;
