import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newCriteria, setNewCriteria] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const targeted = persons.find((person) => person.name === newName);
    if (targeted !== undefined) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...targeted, number: newNumber };
        personService
          .update(changedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== response.id ? person : response
              )
            );
            setNewName("");
            setNewNumber("");
            setNotification({
              type: "success",
              message: `Changed ${response.name}'s number`,
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch(() => {
            setNotification({
              type: "error",
              message: `Information of ${changedPerson.name} has already been removed from server`,
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setPersons(
              persons.filter((person) => person.id !== changedPerson.id)
            );
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response));
        setNewName("");
        setNewNumber("");
        setNotification({ type: "success", message: `Added ${response.name}` });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewCriteria(event.target.value);
  };

  const handleDelete = (person) => {
    if (confirm(`Delete ${person.name}?`)) {
      personService
        .deleteById(person.id)
        .then(setPersons(persons.filter((e) => e.id !== person.id)));
    }
  };

  const personsToShow =
    newCriteria === ""
      ? persons
      : persons.filter((e) =>
          e.name.toLowerCase().includes(newCriteria.toLocaleLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={newCriteria} handleChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={addPerson}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
