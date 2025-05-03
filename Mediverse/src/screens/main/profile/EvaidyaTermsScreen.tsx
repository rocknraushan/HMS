// EvaidyaTermsScreen.tsx
import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const EvaidyaTermsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={require('../../../assets/html/evaidya-terms.html')}
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

export default EvaidyaTermsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  webview: {
    flex: 1,
  },
});
