import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/"><img className="img-logo" src="/assets/infinity-svgrepo-com.svg" alt="" /></Link>
    </div>
  )
}
