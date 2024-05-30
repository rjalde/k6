//1. inicialização
import sleep from 'k6';

//2. Configuração
export const options = {
    vus: 1,
    durations: '10s'
}

//3. execução
export default function(){
    console.log("testando o k6")
    sleep1(1);
}

//4 desmontagem

export function teardown(data){
    console.log(data)
}