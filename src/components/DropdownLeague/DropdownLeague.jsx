import { useState } from "react";


function DropdownLeague({ categories, category, setCategory}) {
    const [open, setOpen] = useState(false);

    return (
        <div className={`dropdown ${open ? 'is-active' : ''}`}>
            <div className="dropdown-trigger">
                <button 
                    className="button is-danger" aria-haspopup="true" aria-controls="dropdown-menu" 
                    onClick={() => setOpen(!open)}>
                    <span>{category || 'Categories'}</span>
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    {categories.map((cat) => (
                        <a
                            key={cat}
                            href="#"
                            className={`dropdown-item ${category === cat ? 'is-active' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                setCategory(cat);
                                setOpen(false);
                            }}
                        >
                            {cat}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DropdownLeague;
