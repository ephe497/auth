import axios from 'axios'

export default axios.create({
    baseURL: 'https://kuditime-server.onrender.com/api/auth'
})