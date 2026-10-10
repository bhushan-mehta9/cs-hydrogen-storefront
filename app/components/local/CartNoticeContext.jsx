import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

/** @type {React.Context<null | { pushNotice: (notice: CartNotice) => void; dismissNotice: () => void; notice: CartNotice | null }>} */
const CartNoticeContext = createContext(null);

/**
 * @typedef {{ id: string; name: string; variant?: 'add' | 'update'; quantity?: number }} CartNotice
 */

export function CartNoticeProvider({children}) {
  const [notice, setNotice] = useState(null);
  const timeoutRef = useRef(null);

  const dismissNotice = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setNotice(null);
  }, []);

  const pushNotice = useCallback(
    (payload) => {
      const entry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        name: payload.name,
        variant: payload.variant ?? 'add',
        quantity: payload.quantity,
      };
      setNotice(entry);
    },
    [],
  );

  useEffect(() => {
    if (!notice) return undefined;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(dismissNotice, 4500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [notice?.id, dismissNotice]);

  return (
    <CartNoticeContext.Provider value={{pushNotice, dismissNotice, notice}}>
      {children}
    </CartNoticeContext.Provider>
  );
}

export function useCartNotice() {
  const ctx = useContext(CartNoticeContext);
  if (!ctx) {
    throw new Error('useCartNotice must be used within CartNoticeProvider');
  }
  return ctx;
}

export function useCartNoticeOptional() {
  return useContext(CartNoticeContext);
}
