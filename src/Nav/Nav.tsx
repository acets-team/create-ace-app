import './Nav.css'
import { A } from '@ace/a'
import Counter from '@src/lib/Counter'


export default () => {
  return <>
    <nav>
      <Counter />
      <A path="/" activeClass="active" end={true} class="brand">Home</A>
      <A path="/fortunes" activeClass="active" class="brand">Fortunes</A>
      <A path="/smooth" activeClass="active" class="brand">Smooth</A>
    </nav>
  </>
}
