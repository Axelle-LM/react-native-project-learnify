import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { scheduleExactNotification } from '../utils/Notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationPicker = () => {
    const [time, setTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        const loadStoredTime = async () => {
            const savedHour = await AsyncStorage.getItem('notificationHour');
            const savedMinute = await AsyncStorage.getItem('notificationMinute');

            const newTime = new Date();
            if (savedHour && savedMinute) {
                newTime.setHours(parseInt(savedHour));
                newTime.setMinutes(parseInt(savedMinute));
            } else {
                newTime.setHours(10);
                newTime.setMinutes(0);
            }
            setTime(newTime);
        };
        loadStoredTime();
    }, []);

    const onChange = async (event: any, selectedTime?: Date) => {
        if (event.type === "dismissed") {
            setShowPicker(false);
            return;
        }

        const newTime = selectedTime || time;
        setTime(newTime);
        setShowPicker(false);

        try {
            await scheduleExactNotification(newTime.getHours(), newTime.getMinutes());
            console.log(`Notification planifiée pour ${newTime.getHours()}:${newTime.getMinutes()}`);
        } catch (error) {
            console.error("Erreur lors de la planification de la notification:", error);
        }
    };

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Paramètres de notification</Text>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Choisi l'heure de ta notification"
                        onPress={() => setShowPicker(true)}
                    />
                </View>
                {showPicker && (
                    <DateTimePicker
                        value={time}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
                <Text style={styles.timeText}>
                    Heure actuelle de notification : {formatTime(time)}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 5,
        marginVertical: 10,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    buttonContainer: {
        marginVertical: 15,
    },
    timeText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 15,
        color: '#666',
        fontWeight: '500',
    },
});

export default NotificationPicker;
