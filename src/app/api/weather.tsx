import axios from "axios";
export default function weather(req:any,res:any) {
    const options = {
		method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: ' 217.14.192.0'},
		headers: {
			'x-rapidapi-key':"a6778d40b6msh7c8d6d4c6623182p1094e3jsn07af23beff8b",
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',// Our API Key
		}
	};
	axios
		.request(options)
		.then(function (response) {
			res.status(200).json(response.data);
		})
		.catch(function (error) {
			console.error(error);
		});
}
