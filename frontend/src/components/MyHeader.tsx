
export default function MyHeader() {
    return (
        < nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm" >
            <div className="container">
                <a className="navbar-brand" href="">Job search</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}