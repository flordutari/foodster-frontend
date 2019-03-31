import axios from 'axios';

class ProfileService {
  constructor() {
    this.profile = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true // only beacause we want to share cookies with the backend server otherwise set it to false
    })
  }

  getAllProfiles() {
    return this.profile.get(`/profile/users`)
    .then(response => response.data)
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

  deleteFavorites(body) {
    return this.profile.put('/profile/deletefavorites', body)
    .then(response => response.data)
  }

  follow(body) {
    return this.profile.put('/profile/follow', body)
    .then(response => response.data)
  }

  unfollow(body) {
    return this.profile.put('/profile/unfollow', body)
    .then(response => response.data)
  }

  editProfile(body) {
    return this.profile.put('/profile/edit', body)
    .then(response => response.data)
  }
}

const profileService = new ProfileService();

export default profileService;
