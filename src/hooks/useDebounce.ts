import { useEffect, useRef, useState } from "react";

const useDebounce = (value: any, delay: number) => {
    const [savedValue, setSavedValue] = useState(value);
    const prevValRef = useRef(null);
    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setSavedValue(value);
        }, delay);
        return () => {
            clearTimeout(timeoutID);
        };
    }, [value]);
    return savedValue;
};

export default useDebounce;
