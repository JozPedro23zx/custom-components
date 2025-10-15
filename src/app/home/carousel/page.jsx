// app/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { usersData } from "../data"
import CustomCarousel from '../components/carousel';


const UserCarousel = () => {
  const [users, setUser] = useState([])
  function getData() {
    console.log(usersData)
    setUser(usersData)
  }

  function userCard(users) {
    return (
      users.map((user, index) => (
          <div key={index} className="user-card flex-shrink-0 w-48 h-64 bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center">
            <img src="{user.avatarUrl}" alt="user.name" className="w-20 h-20 rounded-full mb-4 object-cover" />
            <h3 className="font-bold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
      ))
    )
  }

  useEffect(() => {
    console.log(usersData)

    getData()
  }, [])


  return(
    <>
    {users && (
      <CustomCarousel
        children={userCard(users)}
      />
    )}
    </>
  )
};


export default UserCarousel