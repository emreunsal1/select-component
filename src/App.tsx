
import './App.css'

function App({title,description,placeholder,options,onChange,icon}) {

  return (
      <div className='select'>
        <div className='title'>title</div>
         <div className='icon'></div>
        <div className='input-wrapper'> 
        <input placeholder={placeholder}></input>
        </div>
        <div className='opened-icon'>
          <img src='./assets/chevron-down.svg' />
        </div>
        <div className='description'>{description}</div>
        <div className='item-list'>
          {options.map((option)=>{
            <div id={option.value}>{option.label}</div>
          })}
        </div>
      </div>
  )
}

export default App
