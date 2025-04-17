import React, { PropsWithChildren, createContext, useContext, useState } from 'react';

export type DeckProps = {
    id: string,
    title: string,
};

const DeckContext = createContext<{
    id: string, title: string, error: string | null, setId: (id: string) => void, setTitle: (title: string) => void, decks: DeckProps[], addDeck: (title: string) => void
}>({ id: " ", title: " ", error: null, setId: () => { }, setTitle: () => { }, decks: [], addDeck: () => { } })

export const DeckProvider = ({ children }: PropsWithChildren) => {
    const [decks, setDecks] = useState<DeckProps[]>([]);

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addDeck = (title: string) => {
        const newDeck: DeckProps = {
            id: Date.now().toString(),
            title,
        };
        setDecks((prev) => [newDeck, ...prev]);
        setTitle('');
    };

    return (
        <DeckContext.Provider value={{ id, title, error, setId, setTitle, decks, addDeck }}>
            {children}
        </DeckContext.Provider>
    );
}

export const useDecks = () => useContext(DeckContext)