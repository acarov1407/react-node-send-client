

function Alert({ alert }) {
  return (
    <div className={`${alert.error === true ? 'bg-red-500' : 'bg-sky-500'} text-center p-3 rounded-lg text-white font-medium`}>
      {alert.msg || 'Ha ocurrido un error'}
    </div>
  )
}

export default Alert