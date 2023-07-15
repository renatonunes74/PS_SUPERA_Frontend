import axios from 'axios';

export const api = axios.create({
	baseURL: 'http://localhost:8080'
})

export const busca = async (url: string, setDados: any) => {
	try {
		const resposta = await api.get(url)
		setDados(resposta.data)
		return resposta.data;
	} catch (error) {
		console.log(error)
		return null;
	}
}
