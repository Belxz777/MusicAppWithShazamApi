'use client'
import settings from '../../images/settings.svg'
import avatar  from '../../images/i.webp'
import Image from "next/image"
import Link from 'next/link'
import { motion } from 'framer-motion'
import axios from 'axios'
import {BiBarChartAlt,BiFoodTag} from 'react-icons/bi'
import { ReactNode, useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import moment from 'moment'
interface Objs {
    current:{
      cloud:number,
    feelslike_c:number,
    gust_kph:number,
    pressure_in:number,
    temp_c:number,
    vis_km:number,
    wind_dir:string,
    wind_kph:number
  },
  location:{
    country: string,
   name:string,
  tz_id:string
  }
}
const Loading =  dynamic(() => import('./loading'));
export default function profile() {
const getWeatherInfo = async (ip:string) =>{
  const options = {
		method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: `${ip}`},
        headers: {
          'x-rapidapi-key':"a6778d40b6msh7c8d6d4c6623182p1094e3jsn07af23beff8b",
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',// Our API Key
        }
	};
  try {
    const response = await axios.request(options);
    setResponse(response.data);
    console.log(response.data)
    console.log(response.data.location.name)
  } catch (error) {
    console.error(error);
  }
  return response || console.error('error')
}
const[response,setResponse] = useState<Objs>({
  current:{
    cloud:0,
  feelslike_c:0,
  gust_kph:0,
  pressure_in:0,
  temp_c:0,
  vis_km:0,
  wind_dir:'',
  wind_kph:0
},
location:{
  country: '',
 name:'',
tz_id:''
}
})
const time= new Date()
useEffect(() => {
  console.log(response)
  console.log(response.current.wind_dir == '')
    getWeatherInfo("32.123.213.212")
    console.log(ip)
}, [])
const [showNotification, setShowNotification] = useState(true);
const [tick, settick] = useState(false)
const [ip ,SetIp]  = useState(null)
  const handleAnswer = (tick:boolean) => {
    // Обработка ответа пользователя
    setShowNotification(false)
    settick(tick)
    if(tick ==true)  
    { axios.get('https://api.ipify.org/?format=json')
   .then((response)=> {
     // handle success
     console.log(response.data.ip);
     getWeatherInfo(response.data.ip)
   })
   .catch(function (error) {
     // handle error
     console.log(error);
   })
  }
   else{
     return 
   }
  };
  return (
    <div >
  <header className = 'bg-gradient-to-r  from-stone-200  to-blue-400 w-full flex px-5 py-10 font-mono text-3xl   text-blue-400'>
<Image src={avatar}
 width={45}
 height={100} className=' rounded-lg'
      alt="Avatar"  loading='lazy' placeholder='blur' />
<p className="px-10  font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-black" >Roman</p>
<p className="px-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-black" >Belykh</p>
<Link href='/'>
<Image src={settings} 
width={45} 
height={100} className=' rounded-lg pr-23 mr-56 select-none' alt='settings' >
  </Image>
</Link>
  </header>
  <nav className='  w-full h-72 inline-flex '>
     { response.current.wind_dir =='' ? 
 <Loading/>
 :
 <div className=' w-full   h-full bg-gradient-to-b from-blue-400 to-stone-300  flex items-center content-center justify-center'>
<p>Сегодня в {response.location.name} <span>{response.location.country}</span></p>
<p>{time.toLocaleDateString()}</p>
 <p>Температура {response.current.temp_c} чувствуется как {response.current.feelslike_c}</p>
 </div>
      }
  </nav>
  {showNotification && (
        <div
          className={"fixed bottom-4 right-4 bg-lightblue p-4 rounded-md shadow-md z-50" }
        >
          <p>Опеределять местопопложение автоматически?</p>
          <button onClick={() => handleAnswer(true)}><span>Да</span></button> 
          <button onClick={() => handleAnswer(false)}><span>Нет</span></button>
        </div>
      )}
  </div>

  )
}