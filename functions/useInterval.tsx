import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void, ms: number) {
    const savedCallback = useRef(() => {
        // no op
    });

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        const timer = setInterval(() => {
            savedCallback.current();
        }, ms);
        return () => clearInterval(timer);
    }, [ms]);
}
