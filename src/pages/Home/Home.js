import React, { useState, useEffect } from 'react'
import Input from '../../components/Input'
import classes from './Home.module.scss'
import { ListProvider } from '../../context/list-context'
import Output from '../../components/Output'
import { v4 as uuidv4 } from 'uuid'

export const Home = () => {
  const [inputValue, setInputValue] = useState({ name: '', surname: '' })
  const [list, setList] = useState([])
  const [inputsMissing, setInputsMissing] = useState(false)
  const [randomName, setRandomName] = useState(null)
  const [rndIndex, setRndIndex] = useState(-1)
  const [btnDisabled, setBtnDisabled] = useState(false)

  const saveValue = (event, label) => {
    setInputValue({ ...inputValue, [label]: event.target.value })
  }

  const checkInputs = () => {
    if (!inputValue.name && !inputValue.surname) {
      return 'name and surname'
    }
    if (!inputValue.name) {
      return 'name'
    }
    if (!inputValue.surname) {
      return 'surname'
    }
    return false
  }

  const addToList = (event) => {
    event.preventDefault()
    const result = checkInputs()
    setInputsMissing(result)

    if (!result) {
      const generateID = uuidv4()
      const inputToSave = { ...inputValue, id: generateID, selected: false }
      setList([...list, inputToSave])
      setInputValue({ name: '', surname: '' })
    }
  }

  const removeName = () => {
    const updatedList = list.filter((person) => !person.selected)
    console.log(updatedList)
    setList(updatedList)
    console.log(list)
  }

  const chooseRandomName = () => {
    const chosenName = list.filter((name, index) => index === rndIndex)
    setRandomName(chosenName)
    console.log('chooseRandomName runs')
  }

  const rndNumberGenerator = () => {
    setBtnDisabled(true)
    const rndNumber = Math.round(Math.random() * (list.length - 1))
    if (rndIndex !== rndNumber) {
      setRndIndex(rndNumber)
    } else {
      rndNumberGenerator()
    }
  }

  useEffect(() => {
    console.log(rndIndex)
    if (rndIndex >= 0) {
      chooseRandomName()
    }
  }, [rndIndex])

  useEffect(() => {
    setBtnDisabled(false)
  }, [randomName])

  return (
    <>
      <ListProvider value={{ list, setList }}>
        <div className={classes.mainContainer}>
          <div className={classes.randomName}>
            {randomName && (
              <p>{`Random name: ${randomName[0].name} ${randomName[0].surname}`}</p>
            )}
          </div>
          <div className={classes.inputControls}>
            <form>
              <Input
                value={inputValue.name}
                placeholder="Name"
                onInput={(event) => saveValue(event, 'name')}
              />
              <Input
                value={inputValue.surname}
                placeholder="Surname"
                onInput={(event) => saveValue(event, 'surname')}
              />
              <button onClick={addToList} type="submit">
                Add
              </button>
            </form>
            <button onClick={removeName}>Delete</button>
            <button
              onClick={rndNumberGenerator}
              disabled={list.length < 2 || btnDisabled}
            >
              Select random
            </button>
          </div>
          {inputsMissing && (
            <p className={classes.inputWarning}>Please enter {inputsMissing}</p>
          )}

          <Output randomId={randomName && randomName[0].id} />
        </div>
      </ListProvider>
    </>
  )
}
