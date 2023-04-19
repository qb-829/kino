// This Nav.jsx page uses Link from react-router-dom to 
// create a navigation bar to be imported and used
// on the Home page.

import { Link } from 'react-router-dom';
import '../assets/styles/baselayout.css'

export default function Nav() {

  return <>
     <div>
        <nav className='nav'>
          <Link to='/' > Home </Link> &nbsp;
        </nav>
      </div>
  </>
  
}
