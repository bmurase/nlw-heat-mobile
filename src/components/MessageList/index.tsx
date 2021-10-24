import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { api } from '../../services/api';

import { Message, MessageProps } from '../Message';

import { styles } from './styles';

export function MessageList() {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    api.get<MessageProps[]>('messages').then(response => {
      setMessages(response.data);
    });    
  }, [])
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps='never'
    >
      {messages.map(message => 
        <Message key={message.id} data={message} />
      )}
    </ScrollView>
  )
}