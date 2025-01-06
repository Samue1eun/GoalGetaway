///////////////////////-----IMPORTS------------///////////////////////

import axios from 'axios'
import { useState } from 'react'

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

///////////////////////-----TOP 5 QUARTERBACKS-----///////////////////////

export const fetchTopQuarterbacks = async () => {
  try {
    const response = await api.get("top_stats/", {
      params: {
        season: 2024,
        stat_requested: "passing_yards",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
}

///////////////////////-----MAP API------------///////////////////////


