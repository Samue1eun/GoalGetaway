///////////////////////-----IMPORTS------------///////////////////////

import axios from 'axios'

//////////////////////-----BASE URL------------///////////////////////

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/'
})

///////////////////////-----SIGN UP------------///////////////////////

export const userSignup = async(formData) => {
  const { email, password, userName } = formData
  console.log(formData)

  let response = await api.post(
    'users/signup/',
    {
      email : email,
      password : password,
      username : userName
    }
  )

  try{
    if (response.status === 201){
      let {token, username, id, email} = response.data 
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Token ${token}`
      return {'id' : id, 'username': username, 'email' : email}
    }
  } catch (error){
    console.error('Error in "userSignup" function. check utilities.jsx:', error.message)
  }
  
}

///////////////////////-----LOG IN-------------///////////////////////

export const userLogin = async(formData) => {
  const {email, password} = formData

  try {
      let response = await api.post(
          "user_app/login/",  // Update endpoint
          {
              email: email,
              password: password
          }
      )

      if (response.status === 200) {
          localStorage.setItem('access_token', response.data.access)
          localStorage.setItem('refresh_token', response.data.refresh)
          api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`
          return response.data
      }
  } catch (error) {
      console.error('Error in "userLogin" function:', error.response?.data || error.message)
  }
}


///////////////////////-----LOG OUT------------///////////////////////

export const logOut = async() => {
  try {
      const refresh_token = localStorage.getItem('refresh_token');
      let response = await api.post('user_app/logout/', {
          refresh: refresh_token
      });

      if (response.status === 200) {
          // Clear ALL storage
          localStorage.clear();  // More thorough than just removing specific items
          delete api.defaults.headers.common['Authorization'];
          return true;
      }
  } catch (error) {
      // Even if the request fails, clear the tokens
      localStorage.clear();
      delete api.defaults.headers.common['Authorization'];
      console.error('Error in "userLogout" function:', error.response?.data || error.message);
      return false;
  }
}


///////////////////////-----INFO---------------///////////////////////

export const getInfo = async() => {

  let token = localStorage.getItem('token')

  try{
    if(token){
      api.defaults.headers.common['Authorization'] = `Token ${token}`
      let response = await api.get('users/info/')
      if (response.status === 200){
        return {'id' : id, 'username': username, 'email' : email}
      }
      else{
          return null
      }
    }
  }catch (error){
    console.error('Error in "getInfo" function. check utilities.jsx:', error.message)
  }
  
}

///////////////////////-----SPORT DATA API-----///////////////////////



///////////////////////-----MAP API------------///////////////////////


