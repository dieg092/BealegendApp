/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  Dimensions, BackHandler, NetInfo, View, Text
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import Food from './Food';
import Drink from './Drink';
import Others from './Others';
import Computer from './Computer';
import { ButtonSuccess, ButtonError } from '../common';
import { tabPressed, modalCloseSession } from '../../actions';

const { width, height } = Dimensions.get('window');
const basePx = 375;
const CONSTANTS = require('../../config/constants');

function px2dp(px) {
  return px * (width / basePx);
}

class Shop extends Component {
  constructor(props) {
      super(props);
      console.ignoredYellowBox = [
      'Setting a timer'
      ];

     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
     NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
  }

  onTabPressed(type) {
    this.props.tabPressed(type);
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

  render() {
    return (
      <TabNavigator
        tabBarStyle={styles.tabBarStyle}
        tabBarShadowStyle={styles.tabBarShadowStyle}
        sceneStyle={styles.sceneStyle}
      >
        <TabNavigator.Item
          selected={this.props.selectedTab === 'COMIDA'}
          renderIcon={() =>
            <IonIcons
              name={'ios-pizza-outline'}
              size={px2dp(35)}
              color={CONSTANTS.COLOR.GREY_DARK}
              onPress={() => {
                this.onTabPressed('COMIDA');
              }}
            />
          }
          renderSelectedIcon={() =>
            <IonIcons
              name={'ios-pizza-outline'}
              size={px2dp(35)}
              color={CONSTANTS.COLOR.PRIMARY}
            />
          }
          onPress={() => {
            this.onTabPressed('COMIDA');
          }}
        >
        <View style={{ flex: 1 }}>
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
          <Food
            toggle={this.props.toggle}
            itemSelected={this.props.itemSelected}
            user={this.props.user}
            closeSession={this.props.closeSession}
          />
        </View>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.props.selectedTab === 'BEBIDA'}
          renderIcon={() =>
            <IonIcons
              name={'ios-beer-outline'}
              size={px2dp(33)}
              color={CONSTANTS.COLOR.GREY_DARK}
              onPress={() => {
                this.onTabPressed('BEBIDA');
              }}
            />
          }
          renderSelectedIcon={() =>
            <IonIcons
              name={'ios-beer-outline'}
              size={px2dp(33)}
              color={CONSTANTS.COLOR.PRIMARY}
            />
          }
          onPress={() => {
            this.onTabPressed('BEBIDA');
          }}
        >
        <View style={{ flex: 1 }}>
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
          <Drink
            toggle={this.props.toggle}
            itemSelected={this.props.itemSelected}
            user={this.props.user}
            closeSession={this.props.closeSession}
          />
        </View>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.props.selectedTab === 'ORDENADOR'}
          renderIcon={() =>
            <IonIcons
              name={'ios-desktop-outline'}
              size={px2dp(33)}
              color={CONSTANTS.COLOR.GREY_DARK}
              onPress={() => {
                this.onTabPressed('ORDENADOR');
              }}
            />
          }
          renderSelectedIcon={() =>
            <IonIcons
              name={'ios-desktop-outline'}
              size={px2dp(33)}
              color={CONSTANTS.COLOR.PRIMARY}
            />
          }
          onPress={() => {
            this.onTabPressed('ORDENADOR');
          }}
        >
        <View style={{ flex: 1 }}>
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
          <Computer
            toggle={this.props.toggle}
            itemSelected={this.props.itemSelected}
            user={this.props.user}
            closeSession={this.props.closeSession}
          />
        </View>
      </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.props.selectedTab === 'OTROS'}
          renderIcon={() =>
            <IonIcons
              name={'ios-archive-outline'}
              size={px2dp(35)}
              color={CONSTANTS.COLOR.GREY_DARK}
              onPress={() => {
                this.onTabPressed('OTROS');
              }}
            />
          }
          renderSelectedIcon={() =>
            <IonIcons
              name={'ios-archive-outline'}
              size={px2dp(35)}
              color={CONSTANTS.COLOR.PRIMARY}
            />
          }
          onPress={() => {
            this.onTabPressed('OTROS');
          }}
        >
        <View style={{ flex: 1 }}>
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
          <Others
            toggle={this.props.toggle}
            itemSelected={this.props.itemSelected}
            user={this.props.user}
            closeSession={this.props.closeSession}
          />
        </View>
      </TabNavigator.Item>
    </TabNavigator>
   );
 }
}

const styles = {
  tabBarStyle: {
    top: 0,
    height: 60,
    backgroundColor: CONSTANTS.COLOR.WHITE_ICE,
    shadowColor: CONSTANTS.COLOR.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tabBarShadowStyle: {
    bottom: 0,
    top: null
  },
  sceneStyle: {
    paddingBottom: -100,
    marginTop: 35
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
    fontSize: 20
  }
};

const mapStateToProps = ({ product, user, auth }) => {
  const { selectedTab } = product;
  const { isConnected } = user;
  const { isModalCloseSessions } = auth;

  return { selectedTab, isConnected, isModalCloseSessions };
};

export default connect(mapStateToProps, {
  tabPressed, modalCloseSession
})(Shop);
