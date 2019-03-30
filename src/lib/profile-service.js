import axios from 'axios';

class ProfileService {
  constructor() {
    this.profile = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
    })
  }

  getProfile(id) {
    return this.profile.get(`/profile/${id}`)
    .then(response => response.data)
  }

  addFavorite(body) {
    return this.profile.put('/profile/favorite', body)
    .then(response => response.data)
  }

  undoFavorite(body) {
    return this.profile.put('/profile/undofavorite', body)
    .then(response => response.data)
  }

  editProfile(id, body) {
    return this.profile.get(`/profile/${id}`, body)
    .then(response => response.data)
  }
}

const profileService = new ProfileService();

export default profileService;
