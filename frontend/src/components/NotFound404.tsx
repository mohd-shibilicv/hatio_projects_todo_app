import { Link } from "react-router-dom"

const NotFound404 = () => {
  return (
    <div className="loader">
      <Link to='/' className="text-xl font-extrabold text-gray-200">Not Found | 404</Link>
    </div>
  )
}

export default NotFound404