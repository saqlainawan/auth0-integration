import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Linking,
  Button,
} from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: 'dev-tn94zhta.us.auth0.com',
  clientId: 'QJOsPenwnsMCGtaWRGeHetKrNCXoO54z',
});

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const loginHandler = useCallback(() => {
    auth0.webAuth
      .authorize({scope: 'openid profile email'})
      .then(cridentials => {
        if (cridentials?.accessToken) {
          setAccessToken(cridentials.accessToken);
        }
      });
  }, []);

  const logoutHandler = useCallback(() => {
    auth0.webAuth
      .clearSession({})
      .then(success => {
        setAccessToken(null);
      })
      .catch(error => {
        console.log('Log out cancelled');
      });
  }, []);
  return (
    <SafeAreaView style={styles.sectionContainer}>
      {accessToken === null ? (
        <Button onPress={loginHandler} title="Login" />
      ) : (
        <Button onPress={logoutHandler} title="Logout" />
      )}
      <Text>Access token: {accessToken}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default App;
