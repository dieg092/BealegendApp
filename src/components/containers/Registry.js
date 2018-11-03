/*eslint-disable global-require*/
import React, { Component } from 'react';
import { View, Text, ScrollView, StatusBar, BackHandler, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  emailChanged, passwordChanged, registryUser, loginNavigate, cleanError
} from '../../actions';
import { CardTransp, CardSectionTransp, Input, Button, Spinner } from '../common';

const { height } = Dimensions.get('window');
const CONSTANTS = require('../../config/constants');

class Registry extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  onEmailChange(text) {
      this.props.emailChanged(text);
  }

  onPasswordChange(text) {
      this.props.passwordChanged(text);
  }

  onButtonPress(navigate) {
    const { email, password } = this.props;

    this.props.registryUser({ email, password, navigate });
  }

  handleBackButtonClick() {
    this.props.cleanError();
    this.props.itemSelected('Login');

    return true;
  }

  renderError() {
    if (this.props.error) {
      return (
        <View>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton(navigate) {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this, navigate)}>
        Registro
      </Button>
    );
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
        <View style={styles.opacity}>
          <StatusBar
             backgroundColor={CONSTANTS.COLOR.TRANSPARENT}
             barStyle="light-content"
             translucent
          />
          <ScrollView
            removeClippedSubviews
            style={styles.currentHeight}
          >
            <View style={styles.logo}>
              <Text style={styles.title}>Crear una cuenta</Text>
            </View>

            <CardTransp>
              <CardSectionTransp>
                <Input
                  label="Email"
                  color={CONSTANTS.COLOR.WHITE_ICE}
                  onChangeText={this.onEmailChange.bind(this)}
                  value={this.props.email}
                />
              </CardSectionTransp>
              <CardSectionTransp>
                <Input
                  secureTextEntry
                  label="Contraseña"
                  color={CONSTANTS.COLOR.WHITE_ICE}
                  onChangeText={this.onPasswordChange.bind(this)}
                  value={this.props.password}
                />
              </CardSectionTransp>

              {this.renderError()}

              <CardSectionTransp>
                {this.renderButton(navigate)}
              </CardSectionTransp>
            </CardTransp>
          </ScrollView>
          <KeyboardSpacer />
        </View>
    );
  }
}

const styles = {
  opacity: {
    backgroundColor: 'rgba(0, 0, 0, .7)',
    height: height
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: CONSTANTS.COLOR.ERROR
  },
  logo: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 45,
    marginBottom: 15
  },
  title: {
    color: CONSTANTS.COLOR.WHITE_ICE,
    fontSize: 25
  },
  currentHeight: {
    marginTop: StatusBar.currentHeight
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, registryUser, loginNavigate, cleanError
})(Registry);
