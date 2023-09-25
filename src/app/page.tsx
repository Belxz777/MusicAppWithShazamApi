'use client'
import cookies from "next-cookies";
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import axios from 'axios'
import Link from "next/link";
export default function Home() {
  const [term, setTerm] = useState('');
	const [response, setResponse] = useState<any[]>([]);
  const [tracksAudio,setTracksAudio] = useState<any[]>([]) 
  const getSearch = async () =>{
  const options = {
    method: 'GET',
    url: `https://shazam.p.rapidapi.com/search?term=${term}`,

    headers: {
      'X-RapidAPI-Key': 'a6778d40b6msh7c8d6d4c6623182p1094e3jsn07af23beff8b',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
  
  try {
    const response =  await axios.request(options);
    console.log(response.data.tracks.hits);
    setResponse(response.data.tracks.hits);
   setTracksAudio(response.data.tracks.hits[0].track.hub.actions.uri );
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="flex flex-col relative bg-background  font-raleway items-center min-h-screen bg-slate-500 ">
    <h1 className="text-6xl text-primary font-bold mt-20 hover: bg-green-300 text-green-500 rounded-md">
      Para <span className="text-active">Bell</span>
    </h1>
    <Link href='/style'>В профиль</Link>
    <h2 className="text-active text-2xl mt-6 text-green-500 bg-green-300 rounded-md">
      Находи музыку новою для себя музыку прямо сейчас
    </h2>
    <div className="mt-12 sm:mx-auto justify-center sm:w-full sm:flex">
      <input
        type="text"
        className="block w-1/3 border border-transparent rounded-md px-5 py-3 text-base text-background shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-active bg-green-300 text-green-500"
        placeholder="Search for a song or an artist"
        value={term}
        onChange={(event:Event ) => setTerm((event.target as HTMLInputElement).value) }// Updating the state with input field value.
      />
      <div className="mt-4 sm:mt-0 sm:ml-3 bg-white rounded-full">
        <button className="block w-full rounded-md px-5 py-3 bg-active text-base font-medium text-primary focus:outline-none focus:ring-2 focus:ring-primary sm:px-10 text-green-500"
         onClick={()=>getSearch()}>
          Искать
        </button>
      </div>
    </div>
    <section>
   {response ?
          <div className="mt-16">
					<div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{response.map(song => (
							<div key={song.track.title} className="pt-6">
								<div className="flow-root bg-light rounded-lg px-4 pb-8">
									<div className="-mt-6">
										<div className="flex items-center justify-center">
											<span className="p-3 rounded-md shadow-lg">
												<img
													src={
														song.track.images
															.coverart
													}
													width={140}
													height={140}
													alt={song.track.title}
												/>
											</span>
										</div>
										<div className="text-center justify-center items-center">
											<h3 className="mt-2 text-lg text-center font-medium text-primary tracking-tight">
												{song.track.title}
											</h3>
											<span className="mt-2 mb-4 max-w-xs text-sm text-secondary block">
												{song.track.subtitle}
											</span>
										</div>
                    <h3>Слушать</h3>
                    <audio src={song.track.hub.actions[1].uri} controls></audio>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
        : 
        <a className="text-secondary text-2xl">
Треки ждут тебя
        </a>
}
    </section>
  </div>

  )
}
