import axios from "axios";


const authFetch = axios.create({
    baseURL: "https://api.themoviedb.org",
    headers:{
        Authorization : `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOWFjY2QzNGJiNDM0NmQ4ZjRiNGQ4NDQ4ZmU1NWRhOSIsInN1YiI6IjYzY2UxZjdlM2M0MzQ0MDBjZWVkNGEzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qPAaDDmSfqodVwQcNzPZZmTBg6ripGVRJZUwfiya60Q`,
        Accept : `application/json`
    }
  });


export default authFetch;