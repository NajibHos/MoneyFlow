
const Toast = (props) => {
  return (
    <div className="h-auto w-auto">
      <div className="toast toast-top toast-center mt-12">
        <div className={`alert ${props.data.bg}`}>
        <span className="text-white text-base font-medium
         font-descriptions">
          { props.data.title }
        </span>
        </div>
      </div>
    </div>
  )
}

export default Toast