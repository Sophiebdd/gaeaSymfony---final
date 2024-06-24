import React from "react";


function Header() {
 

  return (<>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container fluid justify-content-center">
        <a className="navbar-brand" href="">
          GaeaFinal
        </a>
       
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link me-3" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link me-3" href="/index">Index</a>
            </li>
           
          </ul>
        </div>
      </div>
    </nav>



</>
  );
}
export default Header;