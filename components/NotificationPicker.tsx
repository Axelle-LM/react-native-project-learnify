import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
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
                newTime.setHours(10); //par défaut
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
        <View style={{ marginVertical: 20, alignItems: 'center' }}>
            <Button title="Choisi l'heure de ta notification" onPress={() => setShowPicker(true)} />
            {showPicker && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            <Text style={{ marginTop: 10 }}>
                Heure actuelle de notification : {formatTime(time)}
            </Text>
        </View>
    );
};

export default NotificationPicker;
