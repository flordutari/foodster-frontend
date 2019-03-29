import axios from 'axios';

class TupperService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL_TUPPERS,
      withCredentials: true
    });
  }

  getAll() {
    return this.api.get('/')
      .then(({data}) => data)
  }

  getOne(id) {
    return this.api.get(`/${id}`)
      .then(({data}) => data)
  }

  createTupper(body) {
    return this.api.post('/', body)
      .then(({data}) => data)
  }

  deleteTupper(id) {
    return this.api.delete(`/${id}`)
      .then(({data}) => data)
  }

  editTupper(body, id) {
    return this.api.put(`/${id}`, body)
      .then(({data}) => data)
  }

  editTupperBought(body, id) {
    return this.api.put(`/${id}/buy`, body)
      .then(({data}) => data)
  }
}

const tupperService = new TupperService();

export default tupperService;