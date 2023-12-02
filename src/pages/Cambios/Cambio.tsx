import { ChangeEvent, useEffect, useState } from "react";
import { convertRates, getAllRates, getCountries } from "../../services/api";
import { countries } from '../../data';
import Swal from 'sweetalert2';
import { Cotacoes, InfoCotacoes } from "./style";
import { MdOutlineCurrencyExchange } from "react-icons/md"

type ResponseObject = {
  [key: string]: string
}
export function Cambio() {
  useEffect(() => {
    async function rates () {
     const allRates = await getAllRates();
     setAllConversionRates(allRates.conversion_rates);
    }
    rates();
    async function getFlags () {
        const flags = await getCountries();
        setcountryFlag(flags);
    }
    getFlags();
  },[]);
  const [allConversionRates, setAllConversionRates] = useState<ResponseObject>({});
  const [amount, setAmount] = useState(1);
  const [currentBase, setCurrentBase] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [countryFlag, setcountryFlag] = useState({});
  const [conversionResult, setConversionResult] = useState(0);
  const [isActive, setIsAtive] = useState(false);

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
      setIsAtive(false);
      if(!Number.isNaN(parseInt(event.target.value))){
        setAmount(parseInt(event.target.value));
      }
      
    }

    async function handleClickConverter(){
      try {
        if(amount < 0){
            Swal.fire({
                title: 'Erro!',
                text: `O valor não pode ser menor que 0`,
                icon: 'error',
                confirmButtonText: 'Cool'
            });
            return;
        }
        if(currentBase === currentRate) {
          Swal.fire("A moeda base não pode ser igual a moeda de cotação");
          return;
        }
        const response = await convertRates(currentBase, currentRate, amount);
        setConversionResult(response.conversion_result);
        setIsAtive(!isActive);
      } catch(error) {
        Swal.fire({
            title: 'Erro!',
            text: `${error}`,
            icon: 'error',
            confirmButtonText: 'Cool'
        })
      }
    }

    return (
    <>
      <div>
        <label htmlFor="">
          Valor:
          <input
            type="text"
            onChange={ (event) => handleChange(event) }
          />
        </label>
        <label htmlFor="">
          De:
          <select
            name=""
            onChange={ (event) => setCurrentBase(event.target.value) }
            id=""
          >
            {
               countries.map((country: { moeda: string; nome_moeda: string; nome_pais: string }) => (
                <option value={ country.moeda }>
                 { `${country.moeda} - ${country.nome_moeda}` }
                </option>
                ))
            }
          </select>
        </label>
        <label htmlFor="">
          Para: 
          <select
            name=""
            onChange={ (event) => setCurrentRate(event.target.value) }
            id=""
          >
           {
               countries.map((country: { moeda: string; nome_moeda: string; nome_pais: string }) => (
                <option value={ country.moeda }>
                 { `${country.moeda} - ${country.nome_moeda}` }
                </option>
                ))
            }
          </select>
        </label>
        <button
          onClick={ handleClickConverter }
        >
         Converter
        </button>
        {
            isActive && (
              <div>
                <p>{ `${amount} ${currentBase} =`}</p>
                <h2>
                    { `${conversionResult} ${currentRate}` }</h2>
              </div>
            )
        }
      </div>
      <Cotacoes>
        <div>
          <h1>Valores referentes a 1 AOA - Kwanza Angolano</h1>
        </div>
        {
            Object.keys(allConversionRates).map((conversionRate: string) => (
              <InfoCotacoes key={ conversionRate }>
                <div>
                  <MdOutlineCurrencyExchange />
                  <h3>{ conversionRate }</h3>
                </div>
                <p>{ allConversionRates[conversionRate] }</p>
              </InfoCotacoes>    
            ))
        }
      </Cotacoes>
    </>
  );
}