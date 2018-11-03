/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, Dimensions, Picker, BackHandler, TextInput
} from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {
  getImages, productNameChanged, descriptionChanged, priceEurosChanged, priceTicketsChanged,
  ticketsConsumeChanged, saveProduct, deleteProduct, buyPressed, changeCode, cleanCode,
  modalCloseSession
} from '../../actions';
import {
  CardSectionTransp, ButtonSuccess, ButtonPrimary, ButtonError, InputBlack
} from '../common';


const { height, width } = Dimensions.get('window');
const basePx = 375;
const CONSTANTS = require('../../config/constants');

function px2dp(px) {
  return px * (width / basePx);
}

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoSelected: 'NaN',
      typeSelected: 'NaN',
      isModalDeleteVisible: false,
      isModalBuyVisible: false
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    this.props.getImages();

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  onTypeSelected(itemValue) {
     this.setState({ typeSelected: itemValue });
  }

  onCodeChange(text) {
    this.props.changeCode(text);
  }

  onPhotoSelected(itemValue) {
     this.setState({ photoSelected: itemValue });
  }

  onNameChange(text) {
    this.props.productNameChanged(text);
  }

  onDescriptionChange(text) {
    this.props.descriptionChanged(text);
  }

  onPriceEurosChange(text) {
    this.props.priceEurosChanged(text);
  }

  onPriceTicketsChange(text) {
    this.props.priceTicketsChanged(text);
  }

  onTicketsConsumeChange(text) {
    this.props.ticketsConsumeChanged(text);
  }

  onCreatePressed(photoSelected, typeSelected, name, description, priceEuros,
    priceTickets, ticketsConsume, producto) {
      this.props.saveProduct(photoSelected, typeSelected, name, description,
        priceEuros, priceTickets, ticketsConsume, this.props.toggle, producto);
  }

  onDeleteProductPress(product) {
    this.props.deleteProduct(product, this.props.toggle);
  }

  onBuyAceptedPress() {
    this.props.buyPressed(this.props.code, this.props.user,
      this.props.producto.priceTickets, this.props.toggle);
  }

  toggleModalCloseSession() {
    this.props.modalCloseSession();
  }

  handleBackButtonClick() {
    this.props.toggle();
    return true;
  }

  toggleModalDeleteEvent() {
    this.setState({ isModalDeleteVisible: !this.state.isModalDeleteVisible });
  }

  toggleModalBuyProduct() {
      this.props.cleanCode();
      this.setState({ isModalBuyVisible: !this.state.isModalBuyVisible });
  }

  selectedPicker() {
    if (this.state.photoSelected && this.state.photoSelected !== 'NaN') {
      return this.state.photoSelected;
    } else if (this.props.producto) {
      this.state.photoSelected = this.props.photo;
      return this.props.photo;
    }
  }

  selectType() {
    if (this.state.typeSelected && this.state.typeSelected !== 'NaN') {
      return this.state.typeSelected;
    } else if (this.props.producto) {
      this.state.typeSelected = this.props.type;
      return this.props.type;
    }
  }

  renderImage() {
    if ((this.state.photoSelected && this.state.photoSelected !== 'NaN') ||
        (this.props.producto && this.props.producto.photo !== 'NaN')) {
        return (
          <View>
            <Image
              source={{ uri: this.selectedPicker() }}
              style={styles.photo}
            />
          </View>
        );
    }

    return (
        <Image
          source={require('../../assets/img/loadingRed.gif')}
          style={styles.photo}
        />
    );
  }

  renderView() {
    if (this.props.user && this.props.user.rol === CONSTANTS.ROLES.BOSS) {
        return (
          <View style={styles.container}>
            {this.props.producto &&
              <Modal
                isVisible={this.state.isModalDeleteVisible}
                backdropColor={CONSTANTS.COLOR.BLACK}
                backdropOpacity={0.5}
                onRequestClose={() => { this.toggleModalDeleteEvent(); }}
              >
                <View style={styles.modalContainerBoss}>
                  <Text style={styles.innerContainer}>¿Estás seguro de que quieres elimnar
                    <Text style={styles.textMarked2}> {this.props.producto.name} </Text>?
                  </Text>

                  <ButtonError onPress={() => this.toggleModalDeleteEvent()}>¡NO!</ButtonError>
                  <ButtonSuccess
                    onPress={() => this.onDeleteProductPress(this.props.producto)}
                  >
                    ¡SI!
                  </ButtonSuccess>
                </View>
              </Modal>
            }
            <View>
              {this.renderImage()}
              <CardSectionTransp>
                <View style={styles.containerStyle}>
                  <Text style={styles.select}>
                    Foto
                  </Text>
                </View>
              </CardSectionTransp>
              <CardSectionTransp>
                <View style={styles.containerStyle}>
                  <Picker
                    selectedValue={this.selectedPicker()}
                    onValueChange={(itemValue) => this.onPhotoSelected(itemValue)}
                  >
                  <Picker.Item key={-1} label='Selecciona una imágen' value='NaN' />
                  {this.props.photos.map((photo, key) => {
                    return (
                      <Picker.Item key={key} label={photo.name} value={photo.uri} />
                    );
                  })
                  }
                  </Picker>
                </View>
              </CardSectionTransp>
              <CardSectionTransp>
                <View style={styles.containerStyle}>
                  <Text style={styles.select}>
                    Tipo
                  </Text>
                </View>
              </CardSectionTransp>
              <CardSectionTransp>
                <View style={styles.containerStyle}>
                  <Picker
                    selectedValue={this.selectType()}
                    onValueChange={(itemValue) => this.onTypeSelected(itemValue)}
                  >
                  <Picker.Item key={-1} label='Selecciona tipo de producto' value='NaN' />
                  <Picker.Item key={0} label='COMIDA' value='COMIDA' />
                  <Picker.Item key={1} label='BEBIDA' value='BEBIDA' />
                  <Picker.Item key={1} label='ORDENADOR' value='ORDENADOR' />
                  <Picker.Item key={2} label='OTROS' value='OTRO' />
                  </Picker>
                </View>
              </CardSectionTransp>

              <CardSectionTransp>
                 <InputBlack
                   label="Nombre"
                   onChangeText={this.onNameChange.bind(this)}
                   value={this.props.name !== null ? this.props.name : (this.props.producto && this.props.producto.name)}
                 />
              </CardSectionTransp>
              <CardSectionTransp>
                <InputBlack
                  label="Descripción"
                  onChangeText={this.onDescriptionChange.bind(this)}
                  value={this.props.description !== null ? this.props.description : (this.props.producto && this.props.producto.description)}
                />
              </CardSectionTransp>
              <CardSectionTransp>
                 <InputBlack
                   label="Precio en €"
                   onChangeText={this.onPriceEurosChange.bind(this)}
                   value={this.props.priceEuros !== null ? this.props.priceEuros : (this.props.producto && this.props.producto.priceEuros.toString())}

                 />
               </CardSectionTransp>
               <CardSectionTransp>
                  <InputBlack
                    label="Precio en Tickets"
                    onChangeText={this.onPriceTicketsChange.bind(this)}
                    value={this.props.priceTickets !== null ? this.props.priceTickets : (this.props.producto && this.props.producto.priceTickets.toString())}
                  />
                </CardSectionTransp>
                <CardSectionTransp>
                   <InputBlack
                     label="Tickets por consumición"
                     onChangeText={this.onTicketsConsumeChange.bind(this)}
                     value={this.props.ticketsConsume !== null ? this.props.ticketsConsume : (this.props.producto && this.props.producto.ticketsConsume.toString())}
                   />
                </CardSectionTransp>
              </View>

              {this.props.error !== '' &&
                <CardSectionTransp>
                  <Text style={styles.comprar}>
                    {this.props.error}
                  </Text>
                </CardSectionTransp>
              }
              {this.props.producto ?
                <View>
                  <ButtonPrimary
                    onPress={() => {
                      this.onCreatePressed(
                        this.state.photoSelected,
                        this.state.typeSelected,
                        this.props.name,
                        this.props.description,
                        this.props.priceEuros,
                        this.props.priceTickets,
                        this.props.ticketsConsume,
                        this.props.producto
                      );
                    }}
                  >
                    EDITAR
                  </ButtonPrimary>

                  <ButtonError onPress={() => this.toggleModalDeleteEvent()}>
                    ELIMINAR
                  </ButtonError>
                </View>
              :
                <ButtonPrimary
                  onPress={() => {
                    this.onCreatePressed(
                      this.state.photoSelected,
                      this.state.typeSelected,
                      this.props.name,
                      this.props.description,
                      this.props.priceEuros,
                      this.props.priceTickets,
                      this.props.ticketsConsume,
                      null
                    );
                  }}
                >
                  CREAR
                </ButtonPrimary>
              }

          </View>
        );
    }
    return (
      <View>
        <Modal
          isVisible={this.state.isModalBuyVisible}
          onRequestClose={() => { this.toggleModalBuyProduct(); }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.innerContainer}>CÓDIGO:</Text>
              <CardSectionTransp>
                <TextInput
                  autoFocus
                  secureTextEntry
                  style={styles.inputStyle}
                  onChangeText={this.onCodeChange.bind(this)}
                  value={this.props.code}
                />
              </CardSectionTransp>

                <Text style={styles.comprar}>
                  {this.props.errorCode && this.props.errorCode}
                </Text>

              <ButtonError onPress={() => this.toggleModalBuyProduct()}>CANCELAR</ButtonError>
              <ButtonSuccess
                onPress={() => this.onBuyAceptedPress()}
              >
              ACEPTAR
              </ButtonSuccess>
          </View>
        </Modal>
        {this.renderImage()}
        <CardSectionTransp>
          <View style={styles.containerStyle}>
            <Text style={styles.name}>
              {this.props.producto && this.props.producto.name}
            </Text>
            {this.props.producto && this.props.producto.ticketsConsume !== '' &&
              <Text style={styles.detail}> Consumir: <Text style={styles.consumir}>
                  + {this.props.producto.ticketsConsume.toString()} <Text style={styles.colorPrimary}><IonIcons
                     name={'ios-pricetags'}
                     size={px2dp(15)}
                     color={CONSTANTS.COLOR.PRIMARY}
                  />
                  </Text>
                </Text>
              </Text>
            }
            <Text style={styles.detail}> Precio:
            {this.props.producto && this.props.producto.priceTickets &&
                  <Text style={styles.comprar}> - {this.props.producto.priceTickets} <Text style={styles.colorPrimary}><IonIcons
                         name={'ios-pricetags'}
                         size={px2dp(15)}
                         color={CONSTANTS.COLOR.PRIMARY}
                  />
                </Text>
              </Text>
            }
            {this.props.producto && this.props.producto.priceTickets &&
              <Text style={styles.detail}> ó </Text>
            }
            {this.props.producto && this.props.producto.priceEuros &&
              <Text style={styles.precio}> {this.props.producto.priceEuros} € </Text>
            }
            </Text>
          </View>
        </CardSectionTransp>
        <CardSectionTransp>
          <View style={styles.containerStyle}>
            <Text style={styles.date}>
              {this.props.producto && this.props.producto.description}
            </Text>
          </View>
        </CardSectionTransp>
        {this.props.producto && this.props.producto.priceTickets !== '' &&
          this.props.producto.priceTickets !== null && this.props.producto.priceTickets <= this.props.user.tickets &&
          <ButtonPrimary onPress={() => this.toggleModalBuyProduct()}>
            COMPRAR CON TICKETS
          </ButtonPrimary>
        }
      </View>
    );
  }


  render() {
    return (
      <ScrollView
        style={styles.scroll}
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
        {this.renderView()}
        <KeyboardSpacer />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  scroll: {
    flex: 1,
    paddingBottom: 25,
    backgroundColor: CONSTANTS.COLOR.WHITE
  },
  container: {
    paddingBottom: 25
  },
  colorPrimary: {
    color: CONSTANTS.COLOR.PRIMARY
  },
  photo: {
      width: width,
      resizeMode: 'contain',
      backgroundColor: CONSTANTS.COLOR.WHITE,
      height: height / 2.5
  },
  name: {
      color: CONSTANTS.COLOR.BLACK,
      fontSize: 20
  },
  date: {
      color: CONSTANTS.COLOR.GREY_DARK,
      fontSize: 16
  },
  textMarked2: {
      color: CONSTANTS.COLOR.PRIMARY,
      fontSize: 20
  },
  modalContainer: {
    backgroundColor: CONSTANTS.COLOR.WHITE_ICE,
    height: height / 2.3,
    width: null,
    borderRadius: 8,
    padding: 30
  },
  modalContainerBoss: {
    backgroundColor: CONSTANTS.COLOR.WHITE_ICE,
    height: height / 1,
    width: null,
    borderRadius: 8,
    padding: 30
  },
  innerContainer: {
    alignItems: 'center',
    color: CONSTANTS.COLOR.BLACK,
    fontSize: 20
  },
  select: {
    color: CONSTANTS.COLOR.GREY_DARK,
    fontSize: 18,
    fontWeight: 'bold',
  },
  precio: {
      color: CONSTANTS.COLOR.BLACK,
      fontSize: 14
  },
  detail: {
      color: CONSTANTS.COLOR.GREY_DARK,
      fontSize: 14
  },
  consumir: {
      color: CONSTANTS.COLOR.SUCCESS,
      fontSize: 14
  },
  comprar: {
      color: CONSTANTS.COLOR.ERROR,
      fontSize: 14
  },
  inputStyle: {
    backgroundColor: CONSTANTS.COLOR.TRANSPARENT,
    marginRight: 5,
    marginLeft: 5,
    flex: 1,
    fontSize: 23,
    color: 'black'
  }
});

const mapStateToProps = ({ gallery, product, auth }) => {
  const { photos, photoSelected } = gallery;
  const { producto, name, description, priceEuros, photo, priceTickets, type, ticketsConsume, error, code, errorCode } = product;
  const { isModalCloseSessions } = auth;

  return { producto, photos, photoSelected, photo, type, name, description, priceEuros, priceTickets, ticketsConsume, error, code, errorCode, isModalCloseSessions };
};

export default connect(mapStateToProps, {
  getImages, productNameChanged, descriptionChanged, priceEurosChanged, priceTicketsChanged,
  ticketsConsumeChanged, saveProduct, deleteProduct, buyPressed, changeCode, cleanCode,
  modalCloseSession
})(Product);
