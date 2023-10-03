import { KeyboardEventHandler, useEffect, useState } from 'react'
import './App.css'
import { getRandomWord } from './utils/generateText'

function App() {
  const [paragraph] = useState(getRandomWord(3))
  const [typedWord, setTypedWord] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [wpm,setWpm] = useState(0);

  const [mistakes, setMistakes] = useState(0);
  const [currentTypedIndex, setCurrentTypeIndex] = useState(-1)


  const regex = /^[a-z ]$/
  const handleType: KeyboardEventHandler = (e) => {

    const key = e.key.toLowerCase();
    if (regex.test(key)) {
      setTypedWord(typedWord + key)
      setCurrentTypeIndex(currentTypedIndex + 1);
    }
    else if (e.key === "Backspace" && typedWord.length) {
      setTypedWord(typedWord.substring(0, typedWord.length - 1))
      setCurrentTypeIndex(currentTypedIndex - 1);

    } else {
      e.preventDefault()
    }

  }

  useEffect(() => {
    if (typedWord.length === 1 && startTime  === 0) {
      setStartTime(new Date().getTime())
    } 

    if (typedWord.length === 0 && startTime ) {
      setStartTime(0)
    } 
    console.log(startTime)
  }, [typedWord, setStartTime])

  useEffect(() => {
    if (currentTypedIndex >= 0 && currentTypedIndex < paragraph.length) {
      if (typedWord[currentTypedIndex] !== paragraph[currentTypedIndex]) {
        setMistakes(mistakes + 1);
      } else {
        // If the user types the correct character, deduct the mistake counter
        setMistakes(Math.max(mistakes - 1, 0));
      }
    }
  }, [typedWord, setMistakes, currentTypedIndex])

  useEffect(()=> {
    if(mistakes === 0 && (currentTypedIndex +1 === paragraph.length))  {
      const endTime = new Date().getTime();
      const diff = Math.floor((endTime - startTime )/ 1000 )
      setWpm(diff)
    }
  },[setWpm,typedWord,startTime,mistakes,currentTypedIndex ])


  return (
    <>
      Mistakes Counter: {mistakes}


      <br></br>
      WPM: {wpm}
      <br></br>
      {paragraph.split('').map((letter, i) => {
        return (
          <span className={typedWord[i] ? typedWord[i] === letter ? 'green' : 'red' : 'text'} key={`${letter}-${i}`}>{letter}</span>
        )
      })}

      <input type="text" className='typer' onKeyDown={handleType} />
    </>
  )
}

export default App
