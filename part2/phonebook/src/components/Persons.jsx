import DeleteButton from "./DeleteButton";

const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <DeleteButton handleDelete={() => handleDelete(person)} />
        </p>
      ))}
    </div>
  );
};

export default Persons;
