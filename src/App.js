import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    AsyncStorage,
    StatusBar,
    TouchableOpacity,
    Dimensions,
    Linking,
    Alert,
    Image,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import IonIcons from 'react-native-vector-icons/Ionicons';
import firebase from './config/firebase';
import {
  logoutUser, addPhotoPressed, createProduct, reloadUser, logoutCleanReducers, isBannedMac,
   deleteImgs
} from './actions';
import { SnapshotToArray } from './config/helpers';
import Header from './components/Header';
import Menu from './components/Menu';
import Loading from './components/containers/Loading';
import Eventos from './components/containers/Eventos';
import Hall from './components/containers/Hall';
import LoginForm from './components/containers/LoginForm';
import Registry from './components/containers/Registry';
import EventDetail from './components/containers/EventDetail';
import EventCreate from './components/containers/EventCreate';
import Galeria from './components/containers/Gallery';
import Tienda from './components/containers/Shop';
import Product from './components/containers/Product';
import Reservas from './components/containers/Reservation';
import Reserva from './components/containers/ReservationDetail';
import Usuarios from './components/containers/User';
import Usuario from './components/containers/UserDetail';
import Perfil from './components/containers/Profile';
import Terminos from './components/containers/Terms';
import { Icon } from './components/common';

const { width, height } = Dimensions.get('window');
const CONSTANTS = require('./config/constants');

class App extends Component {
    constructor(props) {
        super(props);
        console.ignoredYellowBox = [
        'Setting a timer'
        ];

        this.state = {
            isOpen: false,
            itemSelected: 'Eventos',
            icon: 'bars',
            userLogged: null,
            status: false,
            mac: null,
            banned: false
        };

        this.itemSelected = this.itemSelected.bind(this);
        this.closeSession = this.closeSession.bind(this);
        this.deleteImages = this.deleteImages.bind(this);
    }

    componentWillMount() {
      StatusBar.setHidden(true);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ userLogged: true });
        } else {
          this.setState({ userLogged: false, itemSelected: 'Hall' });
        }

      AsyncStorage.getItem('email')
        .then((email) => {
          this.props.reloadUser(email);
          this.isBanedMac(email);
      });
    });
  }

    isBanedMac(email) {
      firebase.database().ref().child('users').orderByChild('email').equalTo(email)
      .once('value', snapshot => {
        if (snapshot.val()) {
          this.setState({ mac: SnapshotToArray(snapshot)[0].mac });
          if (SnapshotToArray(snapshot)[0].banned) {
            this.setState({ banned: true });
          }

          if (!this.state.banned) {
            firebase.database().ref().child('banneds').once('value', macs => {
              SnapshotToArray(macs).map((mac) => {
                if (mac.mac === this.state.mac) {
                  this.props.isBannedMac();
                }
              });
            });
          }
        }
      });
    }

    onAddEventPressed() {
      this.itemSelected('Nuevo Evento');
    }

    onAddButtonPressed() {
      if (this.state.itemSelected === 'Eventos') {
        Linking.canOpenURL(CONSTANTS.URLS.FACEBOOK)
          .then((url) => {
            if (url) {
              Linking.openURL(CONSTANTS.URLS.FACEBOOK);
            }
          })
          .catch(err => console.error('An error occurred', err));
      } else if (this.state.itemSelected === 'Galería') {
        if (this.props.name.trim() === '') {
          Alert.alert('Debes darle un nombre a la Imagen');
        } else {
          this.props.addPhotoPressed(this.props.name);
        }
      } else if (this.state.itemSelected === 'Tienda') {
        this.props.createProduct();
        this.itemSelected('Producto');
      } else if (this.state.itemSelected === 'Reservas') {
        this.itemSelected('Reserva');
      }
    }

    navigationOptions = {
        header: null,
    }

    closeSession() {
      this.itemSelected('Hall');
      this.props.logoutUser(this.props.navigation);
      this.props.logoutCleanReducers();
    }

    updateMenu(isOpen) {
        this.setState({ isOpen });
    }

    itemSelected(item) {
        this.setState({
            itemSelected: item,
            isOpen: false
        });

        if (item === 'Evento' || item === 'Producto' || item === 'Reserva' || item === 'Usuario' || item === 'Nuevo Evento') {
          this.setState({ icon: 'arrow-left' });
        } else {
          this.setState({ icon: 'bars' });
        }
    }

    toggle() {
        if (this.state.itemSelected === 'Producto') {
            this.itemSelected('Tienda');
        } else if (this.state.itemSelected === 'Evento' ||
                   this.state.itemSelected === 'Nuevo Evento') {
            this.itemSelected('Eventos');
        } else if (this.state.itemSelected === 'Reserva') {
            this.itemSelected('Reservas');
        } else if (this.state.itemSelected === 'Usuario') {
            this.itemSelected('Usuarios');
        } else {
            this.setState({
                isOpen: !this.state.isOpen
            });
        }
    }

    deleteImages() {
      this.props.deleteImgs(this.props.imagesSelected);
    }

    renderView() {
      switch (this.state.userLogged) {
        case false:
          return (
            <ScrollView removeClippedSubviews>
              <Image
                source={require('./assets/home.gif')}
                style={styles.backgroundImage}
              >
              {this.state.itemSelected === 'Hall' &&
                <Hall
                    navigation={this.props.navigation}
                    itemSelected={this.itemSelected}
                />
              }
              {this.state.itemSelected === 'Login' &&
                <LoginForm
                    navigation={this.props.navigation}
                    itemSelected={this.itemSelected}
                />
              }
              {this.state.itemSelected === 'Registro' &&
                <Registry
                    navigation={this.props.navigation}
                    itemSelected={this.itemSelected}
                />
              }
              {this.state.itemSelected === 'Terminos' &&
                <Terminos
                    navigation={this.props.navigation}
                    itemSelected={this.itemSelected}
                />
              }
              </Image>
            </ScrollView>
          );
        case true:
          return (
              <SideMenu
                  menu={
                    <Menu
                      navigation={this.props.navigation}
                      itemSelected={this.itemSelected}
                      itemSelectedValue={this.state.itemSelected}
                      user={this.props.userReload && this.props.userReload[0]}
                      toleranceX={50}
                    />
                  }
                  isOpen={this.state.isOpen}
                  onChange={(isOpen) => this.updateMenu(isOpen)}
                  style={styles.addButton}
                  openMenuOffset={280}
              >
                  <StatusBar
                     backgroundColor="transparent"
                     barStyle="light-content"
                     translucent
                  />
                  <View style={styles.flex}>

                    <Header
                      navigation={this.props.navigation}
                      toggle={this.toggle.bind(this)}
                      title={this.state.itemSelected}
                      icon={this.state.icon}
                      imagesSelected={this.props.imagesSelected}
                      deleteImages={this.deleteImages.bind(this)}
                    />

                      <View style={styles.container}>
                      {this.state.itemSelected === 'Perfil' &&
                        <Perfil
                          itemSelected={this.itemSelected}
                          toggle={this.toggle.bind(this)}
                          user={this.props.userReload && this.props.userReload[0]}
                          closeSession={this.closeSession}
                        />
                      }
                      {this.state.itemSelected === 'Usuarios' &&
                        <Usuarios
                          itemSelected={this.itemSelected}
                          toggle={this.toggle.bind(this)}
                          closeSession={this.closeSession}
                        />
                      }
                      {this.state.itemSelected === 'Usuario' &&
                        <Usuario
                          itemSelected={this.itemSelected}
                          toggle={this.toggle.bind(this)}
                          closeSession={this.closeSession}
                        />
                      }
                      {this.state.itemSelected === 'Eventos' &&
                        <Eventos
                          itemSelected={this.itemSelected}
                          toggle={this.toggle.bind(this)}
                          closeSession={this.closeSession}
                        />
                      }
                      {this.state.itemSelected === 'Evento' &&
                        <EventDetail
                          toggle={this.toggle.bind(this)}
                          user={this.props.userReload && this.props.userReload[0]}
                          itemSelected={this.itemSelected}
                          closeSession={this.closeSession}
                        />
                      }
                      {this.state.itemSelected === 'Nuevo Evento' &&
                        <EventCreate
                          toggle={this.toggle.bind(this)}
                          user={this.props.userReload && this.props.userReload[0]}
                          itemSelected={this.itemSelected}
                          closeSession={this.closeSession}
                        />
                      }
                      {this.state.itemSelected === 'Galería' &&
                        <Galeria
                          itemSelected={this.itemSelected}
                          closeSession={this.closeSession}
                        />
                      }
                      {this.state.itemSelected === 'Tienda' &&
                        <Tienda
                          itemSelected={this.itemSelected}
                          toggle={this.toggle.bind(this)}
                          user={this.props.userReload && this.props.userReload[0]}
                          closeSession={this.closeSession}
                        />
                      }
                      {this.state.itemSelected === 'Producto' &&
                        <Product
                          toggle={this.toggle.bind(this)}
                          user={this.props.userReload && this.props.userReload[0]}
                          closeSession={this.closeSession}
                        />
                      }
                      {this.state.itemSelected === 'Reservas' &&
                        <Reservas
                          toggle={this.toggle.bind(this)}
                          user={this.props.userReload && this.props.userReload[0]}
                          itemSelected={this.itemSelected}
                          closeSession={this.closeSession}
                        />
                      }
                      {this.state.itemSelected === 'Reserva' &&
                        <Reserva
                          toggle={this.toggle.bind(this)}
                          user={this.props.userReload && this.props.userReload[0]}
                          closeSession={this.closeSession}
                        />
                      }
                      </View>
                    </View>
                  {((this.props.userReload && this.props.userReload[0] && this.props.userReload[0].rol === CONSTANTS.ROLES.BOSS &&
                    (this.state.itemSelected === 'Eventos' ||
                     this.state.itemSelected === 'Galería' ||
                     this.state.itemSelected === 'Tienda')) ||
                     this.state.itemSelected === 'Reservas') &&
                    <TouchableOpacity
                       style={styles.addButton}
                       onPress={this.onAddButtonPressed.bind(this)}
                    >
                        <TouchableOpacity>
                           <Icon
                             onPress={this.onAddButtonPressed.bind(this)}
                             name={'plus'}
                             size={30}
                             color={CONSTANTS.COLOR.WHITE_ICE}
                           />
                        </TouchableOpacity>
                     </TouchableOpacity>
                  }
                  {((this.props.userReload && this.props.userReload[0] && this.props.userReload[0].rol === CONSTANTS.ROLES.BOSS &&
                    (this.state.itemSelected === 'Eventos'))) &&
                    <TouchableOpacity
                       style={styles.addButtonLeft}
                       onPress={this.onAddEventPressed.bind(this)}
                    >
                        <TouchableOpacity>
                           <Icon
                             onPress={this.onAddEventPressed.bind(this)}
                             name={'plus'}
                             size={30}
                             color={CONSTANTS.COLOR.WHITE_ICE}
                           />
                        </TouchableOpacity>
                     </TouchableOpacity>
                  }
                  {this.state.itemSelected === 'Tienda' && this.props.userReload && this.props.userReload[0].rol !== CONSTANTS.ROLES.BOSS &&
                  <View
                     style={styles.tickets}
                     onPress={this.onAddButtonPressed.bind(this)}
                  >
                    <Text style={styles.containerTickets}>
                        {this.props.userReload && this.props.userReload[0] && this.props.userReload[0].tickets ? this.props.userReload[0].tickets : 0} <Text style={styles.colorPrimary}><IonIcons
                           name={'ios-pricetags'}
                           size={33}
                           color={CONSTANTS.COLOR.PRIMARY}
                        />
                      </Text>
                    </Text>
                   </View>
                  }
              </SideMenu>
          );
        default:
          return (<Loading />);
      }
    }

    render() {
        return (
            <View style={styles.flex}>
            {this.props.userReload && this.props.userReload[0] &&
              (this.props.userReload[0].banned || this.props.bannedMac) ?
              <Loading />
            :
              this.renderView()
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: CONSTANTS.COLOR.WHITE,
      flex: 1
    },
    flex: {
      flex: 1
    },
    colorPrimary: {
      color: CONSTANTS.COLOR.PRIMARY
    },
    containerTickets: {
      color: CONSTANTS.COLOR.BLACK,
      fontSize: 38
    },
    addButton: {
      position: 'absolute',
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      width: 80,
      height: 80,
      right: 25,
      top: height - 100,
      backgroundColor: CONSTANTS.COLOR.PRIMARY,
      borderRadius: 100,
      shadowOpacity: 1.0,
      shadowColor: CONSTANTS.COLOR.BLACK,
      opacity: 0.8
    },
    addButtonLeft: {
      position: 'absolute',
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      width: 80,
      height: 80,
      left: 25,
      top: height - 100,
      backgroundColor: CONSTANTS.COLOR.YELLOW,
      borderRadius: 100,
      shadowOpacity: 1.0,
      shadowColor: CONSTANTS.COLOR.BLACK,
      opacity: 0.8
    },
    tickets: {
      position: 'absolute',
      borderWidth: 0.6,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      right: 0,
      top: height - 80,
      paddingLeft: 15,
      paddingRight: 20,
      backgroundColor: CONSTANTS.COLOR.WHITE_ICE,
      borderBottomLeftRadius: 50,
      borderTopLeftRadius: 50,
      shadowOpacity: 1.0,
      shadowColor: CONSTANTS.COLOR.BLACK,
      opacity: 0.8
    },
    backgroundImage: {
      width: width,
      height: height,
      resizeMode: 'stretch',
      backgroundColor: CONSTANTS.COLOR.BLACK,
      opacity: 0.8
    }
});

const mapStateToProps = ({ auth, gallery, product, user }) => {
  const { accessToken, userReload } = auth;
  const { name, imagesSelected } = gallery;
  const { newProduct } = product;
  const { bannedMac } = user;

  return { accessToken, user, name, newProduct, userReload, bannedMac, imagesSelected };
};

export default connect(mapStateToProps, {
  logoutUser, addPhotoPressed, createProduct, reloadUser, logoutCleanReducers, isBannedMac, deleteImgs
})(App);
