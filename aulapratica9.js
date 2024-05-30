import http from "k6/http";
import { sleep } from "k6";



export const options ={
    vus: 10,
    duration: '10s',
    thresholds:{
        checks:['rate > 0.99']
    }
}

export default function () {

  
  const query = `   
  query{	
	ncm(codigo:"12345678")
	,pessoa(nome:"Cel"){
		nome
		ativo
		}
}`;

  const headers = {
      "Content-Type": "application/json",
  };
  http.post(
    "http://localhost:28042/atmus",
    JSON.stringify({ query: query }),
    { headers: headers }
  );
  sleep(0.3);
}