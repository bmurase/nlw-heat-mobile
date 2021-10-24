import React from 'react';
import { ScrollView } from 'react-native';

import { Message } from '../Message';

import { styles } from './styles';

export function MessageList() {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps='never'
    >
      <Message data={{
        id: '123',
        text: 'Texto da mensagem, texto da mensagem, texto da mensagem, texto da mensagem, texto da mensagem',
        user: {
          name: 'Mary Jane',
          avatar_url: 'https://randomuser.me/api/portraits/women/44.jpg'
        }
      }} />
      <Message data={{
        id: '123',
        text: 'Texto da mensagem, texto da mensagem, texto da mensagem, texto da mensagem, texto da mensagem',
        user: {
          name: 'Mary Jane',
          avatar_url: 'https://randomuser.me/api/portraits/women/44.jpg'
        }
      }} />
      <Message data={{
        id: '123',
        text: 'Texto da mensagem, texto da mensagem, texto da mensagem, texto da mensagem, texto da mensagem',
        user: {
          name: 'Mary Jane',
          avatar_url: 'https://randomuser.me/api/portraits/women/44.jpg'
        }
      }} />
    </ScrollView>
  )
}