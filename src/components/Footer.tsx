const Footer = () => {
  return (
    <footer className="grid grid-cols-2 py-8 px-8 mt-8 bg-slate-200">
      <div>
        <h3 className="text-lg font-medium">Connect With Us</h3>
        <ul className="">
          <li>
            <a href="https://facebook.com">Facebook</a>
          </li>
          <li>
            <a href="https://instagram.com">Instagram</a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-medium">Contact Details</h3>
        <ul>
          <li>Address : Main Store - Pokhara,Nepal</li>
          <li>Lamachaur Chowk, Pokhara </li>
          <li>Nepal</li>
          <li>Contact : 9867753499</li>
          <li>E-mail : someone@gmail.com</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
