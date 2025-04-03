import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <nav>
      <NavLink to='/'>TaskList</NavLink>
      <NavLink to='/form'>Add Task</NavLink>
     
    </nav>
  )
}

export default Header
