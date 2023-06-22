import React from "react";

export default function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        <svg className="bi" width="30" height="24"><use xlinkHref="#bootstrap"></use></svg>
      </a>
      <span className="mb-3 mb-md-0 text-secondary">&copy;Developed by Tushar</span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3"><a className="text-secondary" href="https://twitter.com/i/flow/login"><i class="fa-brands fa-twitter"></i></a></li>
      <li className="ms-3"><a className="text-secondary" href="https://www.instagram.com/tusharkumawat._/"><i class="fa-brands fa-instagram"></i></a></li>
      <li className="ms-3"><a className="text-secondary" href="https://www.facebook.com/"><i class="fa-brands fa-facebook"></i></a></li>
    </ul>
  </footer>
  );
}
