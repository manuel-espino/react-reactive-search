import { useState } from 'react';
import Link from 'next/link';


const fetchAPI = async (termino) => {
   const response = await fetch(`http://api.tvmaze.com/search/shows?q=${termino}`);

   const data = await response.json();

   return data;
}



const SearchUser = () => {

   const [termino, setTermino] = useState('');
   const [resultados, setResultados] = useState([]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      handleChange(e);
      setTermino('');

      console.log(resultados)
   }

   const handleChange = async (e) => {

      setTermino(e.target.value);

      const next_resultados = await fetchAPI(termino);

      setResultados(next_resultados);

   }

   const strip_html_tags = (str) => {
      if ((str === null) || (str === ''))
         return false;
      else
         str = str.toString();


      return str.replace(/<[^>]*>/g, '').substring(0, 200) + "...";
   }

   return (
      <>
         <h2 className="buscador">Prueba Concepto: BUSCADOR REACTIVO</h2>
         <form onSubmit={e => handleSubmit(e)}>
            <input
               autofocus="true"
               style={{ width: 600, padding: 20, border: "1px solid blue", fontSize: 18 }}
               type="text"
               value={termino}
               /* onChange={e => setTermino(e.target.value)} */
               onChange={e => handleChange(e)}
            />
            <button
               style={{ width: 100, padding: 15, background: "blue", color: "white", fontWeight: "bolder" }}>
               Buscar
            </button>
         </form>
         {resultados.length > 0 &&
            <div className="resultados">
               <ul className="resultados__lista">
                  {
                     resultados.map(e => (
                        e.show.hasOwnProperty('image') && e.show.image && e.show.summary &&
                        <li key={e.show.id} >
                           <a href="#" className="resultados__link">
                              <figure>
                                 <img src={e.show.image.medium} className="resultados__img" />
                              </figure>
                              <div>
                                 <h4>{e.show.name}</h4>
                                 <small>{strip_html_tags(e.show.summary)}</small>
                              </div>
                           </a>
                        </li>
                     ))
                  }
               </ul>
            </div>
         }
      </>
   );
}

export default SearchUser;