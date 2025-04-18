import { useDecks } from '@/context/DeckContext';
import React from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
    visible: boolean,
    onClose: () => void,
    onSelect: (deckId: string) => void,
};

const DeckPicker = ({ visible, onClose, onSelect }: Props) => {
    const { decks } = useDecks();

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text>Sélectionne un deck</Text>
                    <FlatList
                        data={decks}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.deckItem}
                                onPress={() => {
                                    onSelect(item.id);
                                    onClose();
                                }}
                            >
                                <Text>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeButton}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        maxHeight: '70%',
    },
    deckItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    closeButton: {
        color: 'red',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 16,
    },
});

export default DeckPicker;