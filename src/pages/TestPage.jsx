import  { useEffect } from 'react'
import axios from 'axios';

export const TestPage = () => {
    useEffect(()=>{
        const getUser = async () => {
          try {
            const response = await axios.get('http://localhost:8080/getUser', {
                method: 'GET',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            const userData = response.data.user; 
            console.log(userData);
        } catch (error) {
            console.log(error.message);
        }
        }
        getUser()
    },[]);
  return (
    <div>
      Checkout console!
    </div>
  )
}

