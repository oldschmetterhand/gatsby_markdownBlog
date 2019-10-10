import { useState, useEffect } from "react"

export const useDummyAjax = (objToReturn: any = undefined): any => {
  const [dummyReturn, setDummyReturn] = useState<undefined | any>(objToReturn)
  useEffect(() => {
    if (dummyReturn) {
      setTimeout(() => {
        setDummyReturn(dummyReturn)
      }, 2000)
    }
  }, [dummyReturn])

  return dummyReturn
}
