import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles/pagesStyles';

export function OptionButton({ icon, label, onPress }) {
    return (
        <RectButton style={[styles.option]} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                </View>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>{label}</Text>
                </View>
            </View>
        </RectButton>
    );
}



