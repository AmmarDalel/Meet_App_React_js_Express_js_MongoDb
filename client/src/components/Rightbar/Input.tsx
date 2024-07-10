interface inputinterface{
    title:string ;
    inputtype:string;
    value:any ;
    changevalue:any ;
}

function Input({title ,inputtype , value , changevalue }:inputinterface){
    return(
        <div className='inputcontainer'>
            <label className='label'>{title}</label>
            <input type={inputtype} className='input'  placeholder={title} value={value} onChange={changevalue} required />
        </div>
    )
}

export default Input ;