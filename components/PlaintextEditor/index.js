import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import EdiText from 'react-editext'
import css from './style.css'

function PlaintextEditor({ file, write }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    ; (async () => {
      setValue(await file.text())
    })()
  }, [file])

  //user edits + saves lastModified
  const saveFile = fileText => {
    setValue(fileText)
    write(file, fileText, 'text/plain')
    console.log('saved!', file, fileText)
    alert('Saved!')
  }

  // user edits + cancels
  const cancelEdit = fileCancel => {
    const cancelText = { value }
    setValue(cancelText.value)
    console.log('canceled')
    alert('cancled')
  }
  return (
    <div className={css.preview}>
      <h3 className={css.title}>{file.name}</h3>

      <EdiText
        className={css.content}
        type='text'
        value={value}
        onSave={saveFile}
        onCancel={cancelEdit}
      />
    </div>
  )
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
}

export default PlaintextEditor
