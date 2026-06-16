import { useEffect, useState } from 'react'
import axios from 'axios'
import { type DiaryEntry } from '../types'
import diaryService from './services/diaryService'

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  const [errMsg, setErrMsg] = useState('');

  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');


  useEffect(() => {
    diaryService.getAll().then(des => {
      setEntries(des)
    })
  }, [])

  const notify = (msg: string) => {
    setErrMsg(msg)
    setTimeout(() => {
      setErrMsg('')
    }, 10000)
  }

  interface ValidationError {
    error: {
      message: string
    }[]
  }

  const onSubmitDEForm = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDE = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    }

    try {
      const res = await diaryService.createNew(newDE)
      setEntries(entries.concat(res))  
      
      setDate('')
      setWeather('')
      setVisibility('')
      setComment('')
    } catch (error: unknown) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.response) {
        notify(error.response.data.error[0].message)
      } else {
        notify('unknown error')
      }
    }
  }

  return (
    <>
      <h2>Add New Entry</h2>
      {
        errMsg && <div style={{ color: 'red' }} >Error: {errMsg}</div>
      }
      <form onSubmit={onSubmitDEForm}>
        <div>
          <label>
            Date
            <input 
              type='date' 
              value={date} 
              onChange={({ target }) => setDate(target.value)} 
            />
          </label>
        </div>
        <div>
          <label>
            Weather
            <input type="radio" id="sunny" name="weather" value="sunny"
              onChange={() => setWeather('sunny')} />
            <label htmlFor="sunny">Sunny</label>
            <input type="radio" id="rainy" name="weather" value="rainy" 
              onChange={() => setWeather('rainy')} />
            <label htmlFor="rainy">Rainy</label>
            <input type="radio" id="cloudy" name="weather" value="cloudy" 
              onChange={() => setWeather('cloudy')} />
            <label htmlFor="cloudy">Cloudy</label>
            <input type="radio" id="stormy" name="weather" value="stormy"
              onChange={() => setWeather('stormy')} />
            <label htmlFor="stormy">Stormy</label>
            <input type="radio" id="windy" name="weather" value="windy"
              onChange={() => setWeather('windy')} />
            <label htmlFor="windy">Windy</label>
          </label>
        </div>
        <div>
          <label>
            Visibility
            <input type="radio" id="great" name="visibility" value="great"
              onChange={() => setVisibility('great')} />
            <label htmlFor="great">Great</label>
            <input type="radio" id="good" name="visibility" value="good"
              onChange={() => setVisibility('good')} />
            <label htmlFor="good">Good</label>
            <input type="radio" id="ok" name="visibility" value="ok"
              onChange={() => setVisibility('ok')} />
            <label htmlFor="ok">Ok</label>
            <input type="radio" id="poor" name="visibility" value="poor"
              onChange={() => setVisibility('poor')} />
            <label htmlFor="poor">Poor</label>
          </label>
        </div>
        <div>
          <label>
            Comment
            <input 
              type='text' 
              value={comment} 
              onChange={({ target }) => setComment(target.value)} 
            />
          </label>
        </div>
        <button type='submit' >Create new entry</button>
      </form>
      <h2>Diary Entries</h2>
      {
        entries.map((e) => <div key={e.id} style={{ 'marginBottom': '20px' }} >
          <div style={{ 'fontWeight': 'bold' }} >Flight on {e.date}</div>
          <div>Weather: {e.weather}</div>
          <div>Visibility: {e.visibility}</div>
          {
            e.comment && <div>Comment: {e.comment}</div>
          }
        </div>)
      }
    </>
  )
}

export default App
