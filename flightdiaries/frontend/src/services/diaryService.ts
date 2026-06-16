import axios from "axios";
import { type DiaryEntry/*, type NewDiaryEntry*/ } from "../../types";

const baseURL = 'http://localhost:3000/api/diaries'

const getAll = () => {
  return axios
    .get<DiaryEntry[]>(baseURL)
    .then(res => res.data)
}

const createNew = (newDE: unknown/*NewDiaryEntry*/ ) => {
  return axios
    .post<DiaryEntry>(baseURL, newDE)
    .then(res => res.data)
}

export default { getAll, createNew }