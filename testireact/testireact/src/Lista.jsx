import "./Lista.css";

export default function Lista({ alkiot }) {
  return (
    <div className="Lista">
      <ul>
        {alkiot.map(alkio => 
          <li key={alkio}>{alkio}</li>
        )
        }
      </ul>
    </div>
  )
}
