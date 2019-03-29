import axios from 'axios';

class TupperService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true
    });
  }

  getAll() {
    return this.api.get('/api/tuppers/')
      .then(({data}) => data)
  }

  getOne(id) {
    return this.api.get(`/api/tuppers/${id}`)
      .then(({data}) => data)
  }

  createTupper(body) {
    return this.api.post('/api/tuppers/', body)
      .then(({data}) => data)
  }

  deleteTupper(id) {
    return this.api.delete(`/api/tuppers/${id}`)
      .then(({data}) => data)
  }

  editTupper(body, id) {
    return this.api.put(`/api/tuppers/${id}`, body)
      .then(({data}) => data)
  }

  tupperPurchase(body, id) {
    return this.api.put(`/api/tuppers/${id}/buy`, body)
      .then(({data}) => data)
  }
}

const tupperService = new TupperService();

export default tupperService;