import React, { useEffect, useState } from 'react';

import personService from '../services/persons';

import Button from '../common/Button';
import Input from '../common/Input';
import People from '../components/People';
import Notification from '../components/Notification';

export default function PhoneNumbers() {
  const [activeNotification, setActiveNotification] = useState('');
  const [peopleList, setPeopleList] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [showAll, setShowAll] = useState(true);
  const [filteredName, setFilteredName] = useState('');

  useEffect(() => {
    personService.getAll().then(response => setPeopleList(response));
  }, []);

  useEffect(() => {
    if (activeNotification.length > 0) {
      setTimeout(() => {
        setActiveNotification('');
      }, 5000);
    }
  }, [activeNotification]);

  const handleAdd = e => {
    e.preventDefault();

    const exists = peopleList.find(person => person.name === newPerson.name);

    if (
      !!exists &&
      window.confirm(
        `Confirm that ${newPerson.name} will update phone number from ${exists.number} to ${newPerson.number}?`
      )
    ) {
      personService
        .update(exists.id, newPerson)
        .then(response => {
          const newPeopleList = peopleList.map(person =>
            person.id !== response.id ? person : response
          );

          setPeopleList(newPeopleList);
          setActiveNotification(
            `Nice! Person named ${response.name} is updated!`
          );
        })
        .catch(error =>
          setActiveNotification(
            `So sorry, we faced problems! Error: ${error.name}`
          )
        );
    } else {
      personService.create(newPerson).then(response => {
        setPeopleList(peopleList.concat(response));
        setActiveNotification(
          `Great! New peson named ${response.name} created!`
        );
      });
    }

    setNewPerson({ name: '', number: '' });
  };

  const toggleDelete = (id, name) => {
    return () => {
      personService.remove(id).then(() => {
        setPeopleList(peopleList.filter(p => p.id !== id));
        setActiveNotification(`Alright, ${name} is now remoded!`);
      });
    };
  };

  const peopleToShow = showAll
    ? peopleList
    : peopleList.filter(person => person.number !== '');

  const label = showAll ? 'Showing All' : 'Hiding empty numbers';
  return (
    <>
      {activeNotification.length > 0 && (
        <Notification text={activeNotification} />
      )}

      <h3>Create or edit</h3>
      <form onSubmit={e => handleAdd(e)}>
        <Input
          value={newPerson.name}
          onChange={e => setNewPerson({ ...newPerson, name: e.target.value })}
          placeholder="Name"
        />
        <Input
          value={newPerson.number}
          onChange={e => setNewPerson({ ...newPerson, number: e.target.value })}
          placeholder="Number"
        />
        <Button type="submit">Add/Update</Button>
      </form>
      <h3>Find with name</h3>
      <Input
        value={filteredName}
        onChange={e => setFilteredName(e.target.value)}
        placeholder="Name"
      />

      <p style={{ display: 'inline-block', marginRight: '8px' }}>
        Restrict phone numbers:
      </p>
      <Button onClick={() => setShowAll(!showAll)}>{label}</Button>

      <People
        filterWith={filteredName}
        personsList={peopleToShow}
        toggleDelete={toggleDelete}
      />
    </>
  );
}
