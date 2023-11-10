import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../state';
import './Navbar.css';

function Navbar() {
    const dispatch = useDispatch()
    interface User {
        firstName: string
    }
    interface AppState {
        user: User;
    }
    const user = useSelector((state: AppState) => state.user)
    function formatDateTime(date: Date) {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${dayOfWeek} ${day}-${month}-${year}`;
    }

    const currentDate = new Date();
    const formattedDateTime = formatDateTime(currentDate);


    return (
        <div className='navbar'>
            <h3>Manage Your Task</h3>
            <h4>{formattedDateTime}</h4>
            <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    {user.firstName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => dispatch(setLogout())} >Logout</Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>

        </div>
    )
}

export default Navbar;