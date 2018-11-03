/*eslint-disable global-require*/
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Linking
} from 'react-native';
import { connect } from 'react-redux';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { modalCloseSession } from '../actions';
import firebase from './../config/firebase';
import { ButtonError, ButtonSuccess } from '../components/common';

const { width, height } = Dimensions.get('window');
const CONSTANTS = require('../config/constants');

class Menu extends Component {
    toggleModalCloseSession() {
      console.log(this.props.itemSelectedValue)
      this.props.modalCloseSession();
    }

    onElementPressed(element) {
      if (element !== 'Juegos de mesa') {
        this.props.itemSelected(element)
      } else {
        Linking.openURL(CONSTANTS.URLS.DRIVE).catch(err => console.error('An error occurred', err));
      }
    }

    _handleOpenURL(event) {
      console.log(event.url);
    }

    renderItemsMenu() {
        let tabs = ['Eventos', 'Tienda', 'Reservas', 'Juegos de mesa'];
        let icons = [
          'ios-game-controller-b-outline',
          'ios-cart-outline',
          'ios-bookmarks-outline',
          'ios-book-outline'
        ];

        if (this.props.user && this.props.user.rol === CONSTANTS.ROLES.BOSS) {
          tabs = ['Usuarios', 'Eventos', 'Tienda', 'Reservas', 'Juegos de mesa', 'Galería'];
          icons = [
            'ios-people-outline',
            'ios-game-controller-b-outline',
            'ios-cart-outline',
            'ios-bookmarks-outline',
            'ios-book-outline',
            'ios-photos-outline'
          ];
        }

        const { itemSelectedValue } = this.props;
        return tabs.map((element, key) => (
            <TouchableOpacity
                key={key}
                style={styles.noSelectedItems}
                onPress={() => this.onElementPressed(element)}
            >
              <View style={styles.withIcon}>
                <IonIcons
                    style={element === itemSelectedValue ?
                      styles.iconWithTextSelect
                      :
                      styles.iconWithText
                    }
                    name={icons[key]}
                    color={CONSTANTS.COLOR.GREY_DARK}
                    size={28}
                />
                <Text
                  style={element === itemSelectedValue ?
                      styles.textSelected
                    : styles.text
                  }
                >
                {element}</Text>
              </View>
            </TouchableOpacity>
        ));
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.menu}>
              <TouchableOpacity
                  onPress={() => this.props.itemSelected('Perfil')}
              >
                <Image
                  source={require('../assets/img/header.png')}
                  style={styles.avatarContainer}
                >
                    <View >
                        <Image
                            style={styles.avatar}
                            source={require('../assets/img/logo.png')}
                        />

                        {firebase.auth().currentUser &&
                          <View style={styles.justifyContent}>
                            <Text
                              style={styles.nickName}
                            >
                              {this.props.user && this.props.user.nickName && this.props.user.nickName !== '' && this.props.user.nickName}
                            </Text>
                            <Text
                              style={styles.email}
                            >
                              {firebase.auth().currentUser.email && firebase.auth().currentUser.email}
                            </Text>
                          </View>
                        }
                    </View>
                </Image>
                </TouchableOpacity>
                <ScrollView removeClippedSubviews style={styles.scrollContainer}>
                    {this.renderItemsMenu()}
                </ScrollView>

                <View style={styles.textWithIcon}>
                    <TouchableOpacity
                      style={styles.withIcon} onPress={() => this.toggleModalCloseSession()}
                    >
                        <IonIcons
                            style={styles.iconWithTextTurnOff}
                            name='ios-power'
                            color={CONSTANTS.COLOR.GERY_DARK}
                            size={28}
                        />
                        <Text style={styles.text}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: CONSTANTS.COLOR.WHITE_ICE,
        shadowColor: CONSTANTS.COLOR.BLACK,
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 10
    },
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        height: 165,
        width: width / 1.02,
        borderColor: CONSTANTS.COLOR.WHITE_ICE,
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    justifyContent: {
      justifyContent: 'center'
    },
    avatar: {
      marginTop: 15,
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 5
    },
    nickName: {
       fontWeight: '700',
       fontSize: 18,
       color: CONSTANTS.COLOR.WHITE_ICE
    },
    email: {
      fontWeight: '300',
      fontSize: 13,
      color: CONSTANTS.COLOR.WHITE_ICE
    },
    text: {
        color: CONSTANTS.COLOR.GREY_DARK,
        fontSize: 15
    },
    textSelected: {
        color: CONSTANTS.COLOR.PRIMARY,
        fontSize: 15
    },
    textWithIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
    },
    withIcon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    scrollContainer: {
        width: (width / 2) + 59
    },
    iconWithTextTurnOff: {
        marginRight: 30,
        paddingLeft: 25
    },
    iconWithText: {
        marginRight: 30,
    },
    iconWithTextSelect: {
        marginRight: 30,
        color: CONSTANTS.COLOR.PRIMARY
    },
    noSelectedItems: {
        paddingVertical: 15,
        paddingLeft: 30,
        marginTop: 5
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
});

const mapStateToProps = ({ auth }) => {
  const { isModalCloseSessions } = auth;

  return { isModalCloseSessions };
};

export default connect(mapStateToProps, {
  modalCloseSession
})(Menu);
