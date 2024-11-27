import { clearCart } from "../features/cart/cartSlice"
import { useDispatch } from 'react-redux';

const ModalButton = () =>{
    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={() => dispatch(clearCart())}>
                네
            </button>
            <button onClick={() => {}}>
                아니오
            </button>
        </div>
    )
}
export default ModalButton;