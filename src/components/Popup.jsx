import React, {useState} from 'react';

const Popup = ({ togglePopup }) => {
  let [email, setEmail] = useState('')

  function actionPopup() {
    togglePopup()
    setEmail('')
  }

  function changeEmail(event) {
    setEmail(event.target.value)
  }

  return (
    <div className='popup'>
      <div className="header">
        <h1>Отправка номограммы на почту</h1>
        <span onClick={actionPopup}>x</span>
      </div>
      <div className="body">
        <input value={email} onChange={changeEmail} type="text" />
        <button onClick={actionPopup}>Отправить</button>
      </div>
    </div>
  )
};

export default Popup;