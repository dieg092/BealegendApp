/*eslint-disable global-require*/
import React, { Component } from 'react';
import {
  View, Text, ScrollView, StatusBar, TouchableOpacity, Dimensions, BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  emailChanged, passwordChanged, loginUser, registryNavigate, regisryUser, loginFacebook, cleanError
} from '../../actions';
import { CardTransp, CardSectionTransp, Input, Button, Spinner } from '../common';

const { width, height } = Dimensions.get('window');
const CONSTANTS = require('../../config/constants');

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
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

    this.props.loginUser({ email, password, navigate });
  }

  onRegistryPress() {
    this.props.cleanError();
    this.props.itemSelected('Registro');
  }

  handleBackButtonClick() {
    this.props.itemSelected('Hall');

    return true;
  }

  renderButton(navigate) {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this, navigate)}>
        Entrar
      </Button>
    );
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
            <View>
              <View style={styles.logo}>
                <Text style={styles.title}>Iniciar Sesión</Text>
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
                    color={CONSTANTS.COLOR.WHITE_ICE}
                    label="Contraseña"
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.props.password}
                  />
                </CardSectionTransp>

                {this.renderError()}

                <CardSectionTransp>
                  {this.renderButton(navigate)}
                </CardSectionTransp>

                <TouchableOpacity
                  style={styles.newAccountContainer}
                  onPress={() => this.onRegistryPress()}
                >
                  <Text style={styles.text}>¿Eres Nuevo? ¡Créate una cuenta!</Text>
                </TouchableOpacity>
              </CardTransp>
            </View>
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
  currentHeight: {
    marginTop: StatusBar.currentHeight
  },
  backgroundImage: {
    width: width,
    height: height,
    resizeMode: 'stretch',
    backgroundColor: CONSTANTS.COLOR.BLACK
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
  newAccountContainer: {
    padding: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative'
  },
  text: {
    color: CONSTANTS.COLOR.WHITE_ICE,
    fontSize: 16.5
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, registryNavigate, regisryUser, loginFacebook, cleanError
})(LoginForm);
