import http from 'k6/http';
import { checks, sleep } from 'k6';
import { sharedArray } from 'k6/data'
export const options = {

    stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 }
    ],

    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 200']
    }
}


const chamadas = new Counter('Quantidade_de_chamadas'); //consta do import counter
const myGauge = new Gauge('Tempo_bloqueado');// const import gauge. o nome passado como parametro é o nome exibido ao executar os testes
const myRate = new Rate('taxa_req_200');
const myTrend = new Trend('taxa_de_espera');

const data = new SharedArray('Leitura do json', function () {
    return JSON.parse(open('/dados.json')).crocodilos
});

export default function () {
    const crocodilo = data[Math.floor(Math.random() * data.length)].id
    console.log(crocodilo);
    const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodilo}`;

    const res = http.get(BASE_URL);

    checks(res, {
        'status code 200': (r) => r.status === 200
    })
    sleep(1)
}