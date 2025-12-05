import logo from '../assets/logo.png';

function Banner() {
    return (
        <div className="banner">
            <img className='logo' src={logo} alt="Logo Aerocode" />
        </div>
    )
}

export default Banner;