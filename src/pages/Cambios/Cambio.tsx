import { ChangeEvent, useEffect, useState } from "react";
import { convertRates, getAllRates, getCountries } from "../../services/api";
import { countries } from '../../data';
import Swal from 'sweetalert2';
import { Cotacoes, Header, InfoCotacoes, Title } from "./style";
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
      <Title>
        <h1>Thiowa <span>Câmbios</span></h1>
      </Title>
      <Header>
      <section>
        <label htmlFor="">
          Valor:
        </label>
        <input
            type="text"
            onChange={ (event) => handleChange(event) }
          />
        <label htmlFor="">
          De:
        </label>
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
        <label htmlFor="">
          Para: 
        </label>
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
        <button
          onClick={ handleClickConverter }
        >
         Converter
        </button>
        </section>
        {
            isActive && (
              <div>
                <p>{ `${amount} ${currentBase} =`}</p>
                <h2>
                    { `${conversionResult} ${currentRate}` }
                </h2>
              </div>
            )
        }
      </Header>
      <Cotacoes>
        <div>
          <h1>Valores referentes a 1 USD - Dólar Americano</h1>
        </div>
        {
            Object.keys(allConversionRates).map((conversionRate: string) => (
              <InfoCotacoes key={ conversionRate }>
                  <MdOutlineCurrencyExchange />
                  <h4>{ conversionRate }</h4>
                <p>{ allConversionRates[conversionRate] }</p>
              </InfoCotacoes>    
            ))
        }
      </Cotacoes>
    </>
  );
}