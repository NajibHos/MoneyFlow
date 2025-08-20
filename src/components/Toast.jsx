
const Toast = (props) => {
  return (
    <div className="toast toast-top toast-end">
      <div className={`alert ${props.data.bg}`}>
      <span className="text-white text-base font-medium
        font-descriptions"
      >
        {props.data.title}
      </span>
      </div>
    </div>
  )
}

export default Toast
