import { Negociacao, NegociacaoParcial } from '../models/index'

export class NegociacaoService {
    
    obterNegociacoes(handler: HandlerFunction): Promise<Negociacao[]> {

        return <Promise<Negociacao[]>> fetch('http://localhost:8080/dados')
            .then(res => handler(res))
            .then(res => res.json() )
            .then((dados: NegociacaoParcial[]) => 
                dados
                    .map(dado => new Negociacao(new Date(), dado.vezes, dado.montante))
            )
            .catch(err => {
                console.log(err)        // Mensagem de Baixo Nível
                throw new Error('Não foi possível importar as negociações') // Mensagem de Alto Nível
            })
    }
}

export interface HandlerFunction {
    (res: Response): Response
}