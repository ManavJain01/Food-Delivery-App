// Importing React Icons
import { RxCross1 } from "react-icons/rx";

import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  height: '90%',
  width: '90%'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
}

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button onClick={onClose} className="text-white w-full flex justify-end"> <RxCross1 className="bg-red-600 size-8 absolute top-5 right-5" /> </button>
        {children}
      </div>
    </>,
    document.getElementById('cart-root')
  )
}