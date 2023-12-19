import {  XCircleIcon } from "@heroicons/react/24/outline";



function Modal({title,onOpen,isOpen,children}) {
    if(!isOpen){
        return null;
    }
    return (
        <div>
            <div className="backdrop"  onClick={()=>onOpen(false)}></div>
            <div className="modal">
                <div className="modal__header">
                    <h2 className="title">{title}</h2>
                    <button onClick={()=>onOpen(false)}>
                        <XCircleIcon className="close icon"/>
                    </button>
                </div>
        {children}

            </div>
        </div>
    );
}

export default Modal;