import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

const AutoTypingAnimation = ({ text, typingSpeed }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    }, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [currentIndex]);

  return (
    <View className="">
      <Text style={{textAlign:'center',fontSize:20, color:'black'}}>{displayText}</Text>
    </View>
  );
};

export default AutoTypingAnimation;
