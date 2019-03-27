import axios from 'axios';

class TupperService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000/api/tuppers',
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
}

const tupperService = new TupperService();

export default tupperService;