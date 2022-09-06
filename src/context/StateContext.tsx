import {createContext, FC, PropsWithChildren, useContext, useState} from "react";
import {Product} from "../../schema";
import toast from "react-hot-toast";

interface InitialState {
    showCart: boolean;
    cartItems: Product[];
    totalPrice: number;
    totalQuantities: number;
    qty: number;
    increaseQty: () => void;
    decreaseQty: () => void;
    setCartItems: (products: Product[]) => void;
    setTotalPrice: (price: number) => void;
    setTotalQuantities: (qty: number) => void;
    addHandler: (product: Product | any, quantity: number) => void;
    setShowCart: (showCart: boolean) => void;
    toggleCartItemQuantity: (id: string, value: string) => void;
    removeHandler: (id: string) => void;
}

const initialState: InitialState = {
    showCart: false,
    cartItems: [],
    totalPrice: 0,
    totalQuantities: 0,
    qty: 0,
    increaseQty(): number {
        return 0;
    },
    decreaseQty(): number {
        return 0;
    },
    setCartItems(): void {
    },
    setTotalPrice(): void {
    },
    setTotalQuantities(): void {
    },
    addHandler(): void {
    },
    setShowCart(): void {
    },
    toggleCartItemQuantity(): void {
    },
    removeHandler(): void {
    }
}

const Context = createContext(initialState);

const StateContext: FC<PropsWithChildren> = ({children}) => {
    const [showCart, setShowCart] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalQuantities, setTotalQuantities] = useState<number>(0);
    const [qty, setQty] = useState<number>(1);

    let foundProduct: Product | any | undefined;

    const addHandler = (product: Product | any, quantity: number) => {
        const checkProdInCart = cartItems.find(item => item._id === product._id);

        setTotalPrice(prevState => prevState + product.price * quantity);
        setTotalQuantities(prevState => prevState + quantity);

        if (!checkProdInCart) {
            product.quantity = quantity;

            setCartItems([...cartItems, {...product}]);
            toast.success(`${qty} ${product.name} was added to the cart`)
            return;
        }

        const updatedCartItems = cartItems.map((cartProduct: any) => {
            if (cartProduct._id === product._id) return {
                ...cartProduct,
                quantity: cartProduct.quantity + quantity
            }
        })

        setCartItems(updatedCartItems);
        toast.success(`${qty} ${product.name} was added to the cart`)
    }

    const increaseQty = () => {
        setQty(prevState => prevState + 1);
    }

    const decreaseQty = () => {
        setQty(prevState => {
            if (prevState - 1 < 1) return 1;

            return prevState - 1
        });
    }

    const removeHandler = (id: string) => {
        const foundProduct: any = cartItems.find(item => item._id === id);
        const filteredCartItems = cartItems.filter(item => item._id !== id);

        setCartItems(filteredCartItems);
        setTotalPrice(prevState => prevState - foundProduct!.price * foundProduct!.quantity);
        setTotalQuantities(prevState => prevState - foundProduct!.quantity);
    }

    const toggleCartItemQuantity = (id: string, value: string) => {
        foundProduct = cartItems.find(item => item._id === id);

        switch (value) {
            case 'inc':
                setCartItems(cartItems.map((item) => item._id === id ? {
                    ...foundProduct,
                    quantity: foundProduct.quantity + 1
                } : item));
                setTotalPrice(prevState => prevState + foundProduct!.price);
                setTotalQuantities(prevState => prevState + 1);
                break;

            case 'dec':
                if (foundProduct!.quantity > 1) {
                    setCartItems(cartItems.map((item) => item._id === id ? {
                        ...foundProduct,
                        quantity: foundProduct.quantity - 1
                    } : item));
                    setTotalPrice(prevState => prevState - foundProduct!.price);
                    setTotalQuantities(prevState => prevState - 1);
                }
                break;
        }
    }

    return (
        <Context.Provider value={{
            showCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            increaseQty,
            decreaseQty,
            setCartItems,
            setTotalPrice,
            setTotalQuantities,
            addHandler,
            setShowCart,
            toggleCartItemQuantity,
            removeHandler
        }}>
            {children}
        </Context.Provider>
    )
}

export default StateContext;

export const useStateContext = () => useContext(Context);
