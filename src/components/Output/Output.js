import React, { useContext } from 'react'
import ListContext from '../../context/list-context'
import classes from './Output.module.scss'

export const Output = ({ randomId }) => {
  const { list, setList } = useContext(ListContext)

  const selectToDelete = (id) => {
    const updatedList = list.map((person) => {
      if (person.id === id) {
        person.selected = !person.selected
      }
      return person
    })
    console.log(updatedList)
    setList(updatedList)
  }

  return (
    <div className={classes.list}>
      <ul>
        {list.map((person) => (
          <li key={person.id}>
            <input
              type="checkbox"
              className={classes.checkBox}
              onChange={() => selectToDelete(person.id)}
            />
            <span
              className={randomId === person.id ? classes.highlight : ''}
            >{`${person.name} ${person.surname}`}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
