import axios from 'axios';

class TalksService {
  constructor() {
    this.talks = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true
    });
  }

  getAllMines() {
    return this.talks.get('/talks/all')
      .then(({data}) => data)
  }

  // getOne(id) {
  //   return this.talks.get(`/talks/${id}`)
  //     .then(({data}) => data)
  // }

  createTalk(body) {
    return this.talks.post('/talks/new', body)
      .then(({data}) => data)
  }

  // deleteTalk(id) {
  //   return this.talks.delete(`/talks/${id}`)
  //     .then(({data}) => data)
  // }

  // editTalk(body, id) {
  //   return this.talks.put(`/talks/${id}`, body)
  //     .then(({data}) => data)
  // }
}

const talksService = new TalksService();

export default talksService;