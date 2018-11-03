/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  View, ScrollView, Text, Image, BackHandler, TouchableOpacity, NetInfo, Dimensions, Button
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import Email from 'react-native-email'
import { getUsers, userPressed, connectionChange, modalCloseSession } from '../../actions';
import { CardSection, ButtonError, ButtonSuccess } from '../common';

const { height } = Dimensions.get('window');
const CONSTANTS = require('../../config/constants');

class User extends Component {
  constructor(props) {
      super(props);
      console.ignoredYellowBox = [
      'Setting a timer'
      ];

      this.state = {
        reservatinoSelected: null
      };

      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
     this.props.getUsers();
  }

  componentDidMount() {
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
     NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
  }

  onUserPressed(user) {
    this.props.userPressed(user);
    this.props.itemSelected('Usuario');
  }

  toggleModalCloseSession() {
    this.props.modalCloseSession();
  }

  handleBackButtonClick() {
    this.props.itemSelected('Eventos');
    return true;
  }

  handleConnectionChange(isConnected) {
    this.props.connectionChange(isConnected);
  }

  handleEmail() {
    let users = '';
    this.props.users && this.props.users.map((user, key) => {
      users = users + user.email + ', ';
    });

    const to = 'eduardomartin169@gmail.com';
    Email(to, {
       subject: 'Usuarios Be A Legend',
       body: users
    }).catch(console.error)
  }

  render() {
    return (
      <ScrollView
        removeClippedSubviews
      >
        <Modal
          backdropColor={CONSTANTS.COLOR.BLACK}
          backdropOpacity={0.5}
          isVisible={this.props.isModalCloseSessions}
          onRequestClose={() => { this.toggleModalCloseSession(); }}
        >

          <View style={styles.modalContainer}>
            <Text style={styles.innerContainer}>¿Seguro que quieres cerrar sesión?</Text>

              <ButtonError onPress={() => { this.toggleModalCloseSession(); }}>
              NO
              </ButtonError>
              <ButtonSuccess
                onPress={() => {
                  this.props.modalCloseSession();
                  this.props.closeSession();
                }}
              >
              SI
              </ButtonSuccess>
          </View>
        </Modal>
        <View style={styles.container}>
           <Button title="Enviar Correos" onPress={() => this.handleEmail()} />
        </View>
        {this.props.users ?
          this.props.users && this.props.users.map((user, key) => {
              return (
                <TouchableOpacity
                    key={key}
                    style={{ marginTop: 10 }}
                    onPress={() => this.onUserPressed(user)}
                >
                  <CardSection>
                    <View style={styles.thumbnailContainerStyle}>
                      <Image
                        style={styles.thumbnailStyle}
                        source={require('../../assets/img/logo.png')}
                      />
                    </View>
                    <View style={styles.headerContentStyle}>
                      <Text style={styles.headerTextStyle}>{user.email}</Text>
                      <Text>{user.nickName && user.NickName !== '' ? user.nickName : 'Anónimus'}</Text>
                    </View>
                  </CardSection>
                </TouchableOpacity>
              );
            })
        :
          <Image
            source={require('../../assets/img/loadingRed.gif')}
            style={styles.photoGif2}
          />
        }
        <View style={styles.marginBot}></View>
      </ScrollView>
   );
 }
}

const styles = {
  headerContentStyle: {
     flexDirection: 'column',
     justifyContent: 'space-around'
   },
   headerTextStyle: {
     fontSize: 16
   },
   thumbnailStyle: {
     height: 50,
     width: 50
   },
   thumbnailContainerStyle: {
     justifyContent: 'center',
     alignItems: 'center',
     marginLeft: 10,
     marginRight: 10
   },
   marginBot: {
     marginBottom: 20
   },
   modalContainer: {
     backgroundColor: CONSTANTS.COLOR.WHITE_ICE,
     height: height / 2.3,
     width: null,
     borderRadius: 8,
     padding: 30
   },
   innerContainer: {
     alignItems: 'center',
     color: CONSTANTS.COLOR.BLACK,
     fontSize: 18
   },
   photoGif2: {
     width: null,
     resizeMode: 'contain',
     height: 50,
     borderRadius: 10,
     marginTop: 20
   },
   button: {
     color: 'red'
   },
   container: {
     flex: 1,
     marginTop: 15,
     alignItems: 'center',
     justifyContent: 'center'
   }
};

const mapStateToProps = ({ user, auth }) => {
  const { users } = user;
  const { isModalCloseSessions } = auth;

  return { users, isModalCloseSessions };
};

export default connect(mapStateToProps, {
  getUsers, userPressed, connectionChange, modalCloseSession
})(User);
