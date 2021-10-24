import React, { useState } from 'react';
import { Alert, Keyboard, Text, TextInput, View } from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';

import { styles } from './styles';

export function SendMessageForm() {
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);

  async function handleSendMessage() {
    if (!message.trim()) {
      Alert.alert('Escreva a mensagem para enviar.');
      return;
    }

    setSendingMessage(true);

    await api.post('messages', { text: message });

    setMessage('');
    Keyboard.dismiss();
    setSendingMessage(false);
    Alert.alert('Mensagem enviada com sucesso!');
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance='dark'
        placeholder='Qual sua expectativa para o evento?'
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
      />

      <Button 
        title='ENVIAR MENSAGEM' 
        color={COLORS.WHITE} 
        backgroundColor={COLORS.PINK}
        isLoading={sendingMessage}
        onPress={handleSendMessage}
      />
    </View>
  )
}