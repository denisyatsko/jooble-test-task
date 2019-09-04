import React from 'react';
import { Link } from 'react-router-dom';

const Medicines = ({ medicines }) => {
    let JSX;
    console.log(typeof medicines);
    // console.log(medicines.forEach(g => console.log(g)));

    medicines.length === 0 ?
        JSX = <h5>You haven't set a medicines</h5> :
        JSX = medicines.map( g => {
            return (
                <li className="collection-item" key={ g.id } >
                    { g.name }
                    <Link className='secondary-content' to='/'>
                        <i className='material-icons'>edit</i>
                    </Link>
                    <Link className='secondary-content' to='/'>
                        <i className='material-icons'>delete</i>
                    </Link>
                </li>
            )
        });

    return (
        <div>
            <ul className="collection">
                { JSX }
            </ul>
        </div>
    )
};

export default Medicines;