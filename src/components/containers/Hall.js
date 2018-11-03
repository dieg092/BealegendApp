/*eslint-disable global-require*/
import React, { Component } from 'react';
import {
   View, Text, ScrollView, TouchableOpacity, StatusBar, Dimensions, BackHandler
} from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { loginFacebook, cleanError } from '../../actions';
import { CardTransp } from '../common';

const { width, height } = Dimensions.get('window');
const CONSTANTS = require('../../config/constants');

class Hall extends Component {
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

  handleBackButtonClick() {
    BackHandler.exitApp();

    return true;
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
              <ResponsiveImage
                source={require('../../assets/img/logo.png')} initWidth="150" initHeight="150"
              />
            </View>
            <CardTransp>
              <View style={styles.containerFacebook}>
                <Icon.Button
                  name="envelope"
                  backgroundColor={CONSTANTS.COLOR.PRIMARY}
                  style={styles.button}
                  onPress={() => { this.props.itemSelected('Login'); }}
                >
                  <Text style={styles.btnMail}>Iniciar sesión con Email</Text>
                </Icon.Button>
              </View>
            </CardTransp>
            <CardTransp>
              <View style={styles.containerSeparator}>
                <View style={styles.separator}></View>
                <Text style={styles.textOr}>  ó  </Text>
                <View style={styles.separator}></View>
              </View>
            </CardTransp>
            <CardTransp>
              <View style={styles.containerFacebook}>
                <Icon.Button
                  name="facebook"
                  backgroundColor={CONSTANTS.COLOR.FACEBOOK}
                  style={styles.button}
                  onPress={() => {
                    this.props.cleanError();
                    this.props.loginFacebook(navigate);
                  }}
                >
                  <Text style={styles.btnMail}>Iniciar sesión con Facebook</Text>
                </Icon.Button>
              </View>
            </CardTransp>

          </ScrollView>
          <View style={styles.terms}>
              <TouchableOpacity onPress={() => this.props.itemSelected('Terminos')}>
                <Text style={styles.text}>Términos y condiciones</Text>
              </TouchableOpacity>
          </View>
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
  currentHeight: {
    marginTop: StatusBar.currentHeight
  },
  logo: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 45,
    marginBottom: 45
  },
  containerFacebook: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btnMail: {
    marginLeft: 8,
    fontSize: 19,
    color: CONSTANTS.COLOR.WHITE_ICE
  },
  containerSeparator: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20
  },
  separator: {
    width: width / 2.4,
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: CONSTANTS.COLOR.WHITE_ICE
  },
  textOr: {
    color: CONSTANTS.COLOR.WHITE_ICE,
    fontSize: 18
  },
  terms: {
    position: 'absolute',
    bottom: 0,
    left: width * 0.3,
    alignItems: 'center',
  },
  text: {
    color: CONSTANTS.COLOR.WHITE_ICE,
    fontSize: 15,
    marginBottom: 15
  },
  button: {
    height: height / 12.5,
    justifyContent: 'center',
    width: width - 50
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  loginFacebook, cleanError
})(Hall);
