import React, { PropsWithChildren, createContext, useContext, useState } from 'react';

export type DeckProps = {
    id: string,
    title: string,
    cardsId: string[],
};

const DeckContext = createContext<{
    id: string, title: string, error: string | null, setId: (id: string) => void, setTitle: (title: string) => void, decks: DeckProps[], addDeck: (title: string) => void, cardToDeck: (deckId: string, cardId: string) => void
}>({ id: " ", title: " ", error: null, setId: () => { }, setTitle: () => { }, decks: [], addDeck: () => { }, cardToDeck: () => { } })

export const DeckProvider = ({ children }: PropsWithChildren) => {
    const [decks, setDecks] = useState<DeckProps[]>([]);

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addDeck = (title: string) => {
        const newDeck: DeckProps = {
            id: Date.now().toString(),
            title,
            cardsId: [],
        };
        setDecks((prev) => [newDeck, ...prev]);
        setTitle('');
    };

    const cardToDeck = (deckId: string, cardId: string) => {
        setDecks((prev) =>
            prev.map((deck =>
                deck.id === deckId ? { ...deck, cardsId: [...new Set([...deck.cardsId, cardId])] }
                    : deck
            )
            )
        );
    }

    return (
        <DeckContext.Provider value={{ id, title, error, setId, setTitle, decks, addDeck, cardToDeck }}>
            {children}
        </DeckContext.Provider>
    );
}

export const useDecks = () => useContext(DeckContext)