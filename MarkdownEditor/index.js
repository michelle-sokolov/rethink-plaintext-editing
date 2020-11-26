import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import EdiText from 'react-editext'

import css from './style.css'

function MarkdownEditor({ file, write }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    ; (async () => {
      setValue(await file.text())
    })()
  }, [file])

  //user edits + saves
  const saveFile = fileText => {
    setValue(fileText)
    write(file, fileText, 'text/plain')
    console.log('saved!')
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

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
}

export default MarkdownEditor
