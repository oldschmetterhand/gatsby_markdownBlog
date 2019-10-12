import React, { useState } from "react"

interface Props {
  placeHolder?: string
  inputValue?:string | undefined
  getInpVal?: (val: string) => void
}

const BulmaInput: React.FC<Props> = ({
  getInpVal = undefined,
  inputValue = undefined,
  placeHolder = "Text input"
}) => {
  const [inpVal, setInpVal] = useState<string | undefined>(inputValue)

  const handleInput = evt => {
    setInpVal(evt.target.value)
    if (getInpVal) getInpVal(evt.target.value)
  }

  return (
    <input
      onChange={handleInput}
      value={inpVal}
      className="input"
      type="text"
      placeholder={placeHolder}
      name={placeHolder}
    ></input>
  )
}

export default BulmaInput
