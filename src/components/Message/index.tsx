import React from 'react';
import { Text, View } from 'react-native';
import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

export type MessageProps = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }
}

type Props = {
  data: MessageProps;
}

export function Message({ data }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        {data.text}
      </Text>

      <View style={styles.footer}>
        <UserPhoto 
          size='SMALL' 
          imageUri={data.user.avatar_url}
        />

        <Text style={styles.userName}>
          {data.user.name}
        </Text>
      </View>
    </View>
  );
}