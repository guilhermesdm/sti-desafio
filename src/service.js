import axios from 'axios';

export const api = axios.create({
    baseURL: `http://api.openweathermap.org/data/2.5/forecast?appid=b9489da3fa908c407e9905baa3f8cfa7&units=metric&lang=pt_br`
})

export const fetchCidade = async (cidade) => {
    const response = await api.get('', {params: { q: cidade }})
    return response.data
}