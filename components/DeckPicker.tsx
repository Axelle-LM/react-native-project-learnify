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
                    <Text style={styles.modalTitle}>Sélectionner un deck</Text>
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
                                <Text style={styles.deckItemText}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                        style={styles.list}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Fermer</Text>
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
        borderRadius: 15,
        width: '85%',
        maxHeight: '70%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    list: {
        marginBottom: 15,
    },
    deckItem: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#f8f8f8',
        marginVertical: 4,
        borderRadius: 8,
    },
    deckItemText: {
        fontSize: 16,
        color: '#333',
    },
    closeButton: {
        backgroundColor: '#ff4d4d',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DeckPicker;