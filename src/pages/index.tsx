import { NavLink } from "react-router-dom";

export function Home() {

  return (
    <>
      <h1>Twiowa Services</h1>
      <ul>
        <li><NavLink to="/cambios">Câmbio</NavLink></li>
      </ul>
    </>
  )
}