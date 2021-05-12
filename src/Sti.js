import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchCidade } from './service';
import { Search, ArrowUpCircle, ArrowDownCircle, X } from 'react-feather';
import swal from 'sweetalert';

function Sti() {
    const [capitais, setCapitais] = useState([])
    const [pesquisa, setPesquisa] = useState()
    const [cidade, setCidade] = useState()
    const handleSearch = async () => {
        try {
            const data = await fetchCidade(pesquisa)
            setCidade(data)
        } catch (error) {
            swal({
                title: "Cidade inexistente"
            })
        }
        setPesquisa('')
    }

    useEffect(() => {
        const getCapitais = async () => {
            const capitolios = [
                await fetchCidade('florianopolis'),
                await fetchCidade('sao paulo'),
                await fetchCidade('rio de janeiro'),
                await fetchCidade('recife'),
                await fetchCidade('rio branco'),
            ]
            setCapitais(capitolios)
        }
        getCapitais()
    }, [])

    const maiusculo = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const closeButton = () => {
        setCidade('')
    }


    return (
        <div className="App">
            <h1 className="title">Previsão do tempo</h1>
            <div className="display">
                {cidade && (
                    <>
                        <button className="close" onClick={closeButton}><X color="orange"/></button>
                        <p className="city">{cidade.city.name} - {cidade.city.country === 'BR' ? 'Brasil' : cidade.city.country} </p>
                        <h1>{(cidade.list[0].main.temp).toFixed()}°C {maiusculo(cidade.list[0].weather[0].description)}</h1>
                        <p className="carac"><ArrowDownCircle size="16" color="orange"/> {(cidade.list[0].main.temp_min).toFixed()}° 
                        <ArrowUpCircle size="16" color="orange" /> {(cidade.list[0].main.temp_max).toFixed()}° 
                        Sensação {(cidade.list[0].main.feels_like).toFixed()}°C </p>
                        <p className="carac2">Vento {((cidade.list[0].wind.speed) * 3.6).toFixed(1)}km/h
                        Humidade {cidade.list[0].main.humidity}%</p>
                    </>
                )}
            </div>

            <div className="searchbar">
                <input type="text" value={pesquisa} placeholder="Insira aqui o nome da cidade" onChange={(e) => setPesquisa(e.target.value)} />
                <button onClick={handleSearch}><Search size="18" /></button>
            </div>

            <div className="line" />

            <div className="capitals">
                <h1 className="capitais">Capitais</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Min</th>
                            <th>Máx</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {capitais.map(capital => (
                            <tr key={capital.name}>

                                <td>{(capital.list[0].main.temp_min).toFixed()}°</td>
                                <td>{(capital.list[0].main.temp_max).toFixed()}°</td>
                                <td>{capital.city.name}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>



        </div>
    );
}




export default Sti;