import { useState, useEffect, useCallback } from "react";
import * as cardsService from './service';

export const useCards = (isMountedRef) => {
    const [cards, setCards] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getCards = useCallback(async () => {
        try {
            const cards = await cardsService.getListCards()
            if (isMountedRef.current) {
                setCards(cards);
            }   
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getCards();
    }, [getCards]);

    return [cards, completed];
}