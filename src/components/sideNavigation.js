const SideNavigation = () => {
  return (
    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark  ">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span class="fs-5 d-none d-sm-inline">Divided Differences</span>
            </a>
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li class="nav-item">
                    <a href="#introduction" class="nav-link align-middle px-0">
                        <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Introduction</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#specification" class="nav-link align-middle px-0">
                        <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Specification</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#program" class="nav-link align-middle px-0">
                        <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Program</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#conclusion" class="nav-link align-middle px-0">
                        <i class="fs-4 bi-house"></i> <span class="ms-1 d-none d-sm-inline">Conclusion</span>
                    </a>
                </li>
            </ul>
            <hr/>
                <div class="dropdown pb-4 fixed-bottom">
                    MAT 4201 <br/>
                    Group  8 Members:
                        <ul>
                            <li>Amaba, Carlina</li>
                            <li>Chu, Jed Abner</li>
                            <li>Colina, Luke Abram</li>
                            <li>Pasana, Jon Francis</li>
                            <li>Tinga, Justin Dominic</li>
                        </ul>
                </div>
        </div>
    </div>
        
  )
}

export default SideNavigation;
