import React from 'react'
import classes from './Input.module.scss'

export const Input = ({ placeholder, onInput, value }) => {
  return (
    <>
      <input
        type="text"
        value={value}
        className={classes.inputField}
        placeholder={placeholder}
        onChange={onInput}
      />
    </>
  )
}
