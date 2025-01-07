///////////////////////-----IMPORTS------------///////////////////////

import axios from 'axios'

//////////////////////-----BASE URL------------///////////////////////

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/'
})

///////////////////////-----SIGN UP------------///////////////////////

export const userSignup = async(formData) => {

  const { email, password, displayName } = formData
  let response = await api.post(
    'users/signup/',
    {
      email : email,
      password : password,
      display_name : displayName
    }
  )

  try{
    if (response.status === 201){
      let {token, display_name, id, email} = response.data 
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Token ${token}`
      return {'id' : id, 'displayName': display_name, 'email' : email}
    }
  } catch (error){
    console.error('Error in "userSignup" function. check utilities.jsx:', error.message)
  }
  
}

///////////////////////-----LOG IN-------------///////////////////////

export const userLogin = async(formData) => {
  const { email, password } = formData
  try {
      let response = await api.post(
          "users/login/",  
          {
              email: email,
              password: password
          }
      )

      if (response.status === 200) {
        let {token, display_name, email, id} = response.data
        localStorage.setItem('token', token)
        api.defaults.headers.common['Authorization'] = `Token ${token}`
        return {'id' : id, 'displayName': display_name, 'email' : email}
      }
  } catch (error) {
      console.error('Error in "userLogin" function:', error.message)
  }
}

///////////////////////-----LOG OUT------------///////////////////////

export const logOut = async() => {
  let response = await api.post('users/logout/')
  try {
    if (response.status === 204){
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
      return null
    }
  } catch (error) {
    console.error('Error in "userLogout" function:', error.message);
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
        return {'id' : id, 'displayName': display_name, 'email' : email}
      }
      else{
        return null
      }
    }
  }catch (error){
    console.error('Error in "getInfo" function. check utilities.jsx:', error.message)
  }
}

///////////////////////-----NFL GAME DAY BY DATE API-----///////////////////////

export const getNFLGamesByDate = async(dateParams) => {
  try{
    let response = await api.get(`api_app/today_games/?dates[]=${dateParams}`)
    if (response.status === 200){
      return response.data.data
    }
  }catch (error){
    console.error('Error in "getNFLGamesByDate" function. check utilities.jsx:', error.message)
  }
}

///////////////////////-----NFL TEAM INFO BY SEASON API------------///////////////////////

export const getNFLTeamInfo = async(yearParam) => {
  try{
    let response = await api.get(`api_app/nfl_teams/?season=${yearParam}`)
    console.log(response.data)
    if (response.status === 200){
      return {
        "Cardinals": response.data[0], 
        "Falcons": response.data[1], 
        "Ravens": response.data[2], 
        "Bills": response.data[3], 
        "Panthers": response.data[4], 
        "Bears": response.data[5], 
        "Bengals": response.data[6], 
        "Browns": response.data[7], 
        "Cowboys": response.data[8], 
        "Broncos": response.data[9], 
        "Lions": response.data[10], 
        "Packers": response.data[11], 
        "Texans": response.data[12], 
        "Colts": response.data[13], 
        "Jaguars": response.data[14], 
        "Chiefs": response.data[15], 
        "Raiders": response.data[16], 
        "Chargers": response.data[17], 
        "Rams": response.data[18], 
        "Dolphins": response.data[19], 
        "Vikings": response.data[20], 
        "Patriots": response.data[21], 
        "Saints": response.data[22], 
        "Giants": response.data[23], 
        "Jets": response.data[24], 
        "Eagles": response.data[25], 
        "Steelers": response.data[26], 
        "49ers": response.data[27], 
        "Seahawks": response.data[28], 
        "Buccaneers": response.data[29], 
        "Titans": response.data[30], 
        "Commanders": response.data[31] 
      }
    }
  }catch (error){
    console.error('Error in "getNFLTeamInfo" function. check utilities.jsx:', error.message)
  }
}

///////////////////////-----MAP API------------///////////////////////


