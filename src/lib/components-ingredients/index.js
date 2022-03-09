import React, { Node } from 'react'
import { Pressable, Text } from 'react-native'

export function Button({ onPress, text }): Node {
  const handlePress = () => {
    onPress()
  }

  return (
    <Pressable onPress={handlePress}>
      <Text>
        {text}
      </Text>
    </Pressable>
  )
}