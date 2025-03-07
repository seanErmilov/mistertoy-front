import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { logout } from '../store/actions/user.actions.js'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
// import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/car.reducer.js'


export function AppHeader() {
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }



    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_IS_SHOWN })
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React toy App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/dash" >Dashboard</NavLink>
                    <NavLink to="/toy" >toys</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    {/* <a onClick={onToggleCart} href="#">🛒 Cart</a> */}

                </nav>
            </section>
            {user ? (
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname} <span>${user.score.toLocaleString()}</span></span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
            <UserMsg />
        </header>
    )
}
