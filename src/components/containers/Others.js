/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  View, ScrollView, Text, TouchableHighlight, Dimensions, BackHandler, TextInput
} from 'react-native';
import { connect } from 'react-redux';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PushController from '../../config/PushController';
import { getProducts, productPressed, createProduct, changeCode,
   consumeAcepted, cleanCode, isModalOpen } from '../../actions';
import { CardSectionTransp, ButtonSuccess, ButtonError } from '../common';
import ImageHalf from '../common/ImageHalf';


const { width, height } = Dimensions.get('window');
const basePx = 375;
const CONSTANTS = require('../../config/constants');

function px2dp(px) {
  return px * (width / basePx);
}

class Others extends Component {
  constructor(props) {
      super(props);
      console.ignoredYellowBox = [
      'Setting a timer'
      ];
      this.state = {
          photo: '',
          productSelected: null
      };

     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    this.props.getProducts('OTRO');

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  onDetailPressed(product) {
    this.props.cleanCode();
    this.props.createProduct();
    this.props.productPressed(product);
    this.props.itemSelected('Producto');
  }

  onProductPressed(product) {
    if (this.props.user.rol === CONSTANTS.ROLES.BOSS ||
        this.props.user.rol === CONSTANTS.ROLES.ADMIN) {
      this.props.createProduct();
      this.props.productPressed(product);
      this.props.itemSelected('Producto');
    } else if (product.ticketsConsume) {
      this.setState({ productSelected: product })
      this.props.cleanCode();
      this.toggleModalConsumeOthers();
    }
  }

  onConsumeAceptedPress() {
    this.props.consumeAcepted(this.props.code, this.props.user, this.state.productSelected.ticketsConsume, 'OTRO');
  }

  onCodeChange(text) {
    this.props.changeCode(text);
  }

  handleBackButtonClick() {
    this.props.itemSelected('Eventos');
    return true;
  }

  toggleModalConsumeOthers() {
    this.props.isModalOpen('OTRO');
  }

  renderModal() {
      return (
        <Modal
          backdropColor={CONSTANTS.COLOR.BLACK}
          backdropOpacity={0.5}
          isVisible={this.props.isModalOpenedOther}
          onRequestClose={() => { this.toggleModalConsumeOthers(); }}
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

              <ButtonError onPress={() => this.toggleModalConsumeOthers()}>CANCELAR</ButtonError>
              <ButtonSuccess
                onPress={() => this.onConsumeAceptedPress()}
              >
              ACEPTAR
              </ButtonSuccess>
          </View>
        </Modal>
      );
  }

  render() {
    return (
      <ScrollView
        removeClippedSubviews
        style={styles.scroll}
      >
      {this.renderModal()}
      <View
         style={styles.container}
      >
        {this.props.otros &&
          this.props.otros.map((product, key) => {
            return (
              <View key={key}>
              <TouchableHighlight
                style={styles.cardSection}
                onPress={() => { this.onDetailPressed(product); }}
                activeOpacity={0.6}
                underlayColor={CONSTANTS.COLOR.WHITE_ICE}
              >
                <View>
                  <ImageHalf
                    photo={product.photo}
                  />

                  <View style={styles.containerStyle} >
                     <Text style={styles.text}>{product.name}</Text>
                     <Text style={styles.detail}> Precio:
                     {product && product.priceEuros &&
                       <Text style={styles.precio}> {product.priceEuros}€ </Text>
                     }
                     {product && product.priceTickets &&
                       <Text style={styles.detail}> ó </Text>
                     }
                     {product && product.priceTickets &&
                           <Text style={styles.comprar}> - {product.priceTickets} <Text style={styles.colorPrimary}><IonIcons
                                  name={'ios-pricetags'}
                                  size={px2dp(15)}
                                  color={CONSTANTS.COLOR.PRIMARY}
                           />
                         </Text>
                       </Text>
                     }
                     </Text>
                     {product && product.ticketsConsume !== '' &&
                       <Text style={styles.detail}> Consumir: <Text style={styles.consumir}>
                          + {product.ticketsConsume.toString()} <Text style={styles.colorPrimary}><IonIcons
                              name={'ios-pricetags'}
                              size={px2dp(15)}
                              color={CONSTANTS.COLOR.PRIMARY}
                              />
                           </Text>
                         </Text>
                       </Text>
                    }
                  </View>
                  {product && product.ticketsConsume !== '' && this.props.user && this.props.user.rol !== CONSTANTS.ROLES.BOSS && this.props.user.rol !== CONSTANTS.ROLES.ADMIN &&
                    <TouchableHighlight
                      style={styles.detalle}
                      activeOpacity={0.6}
                      underlayColor={CONSTANTS.COLOR.GREY}
                      onPress={() => { this.onProductPressed(product); }}
                    >
                      <Text style={styles.detalleText}>CONSUMIR</Text>
                    </TouchableHighlight>
                  }
                </View>
              </TouchableHighlight>
              </View>
            );
          })
        }
        </View>
      <PushController />
      <KeyboardSpacer />
      </ScrollView>
   );
 }
}


const styles = {
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
    marginTop: 25,
    backgroundColor: CONSTANTS.COLOR.WHITE
  },
  container: {
    backgroundColor: CONSTANTS.COLOR.TRANSPARENT,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    marginLeft: 4,
    marginRight: 4
  },
  colorPrimary: {
    color: CONSTANTS.COLOR.PRIMARY
  },
  cardSection: {
     width: width / 2.16,
     marginLeft: 4,
     marginRight: 4,
     marginBottom: 8,
     backgroundColor: CONSTANTS.COLOR.WHITE_ICE,
     borderRadius: 12,
     shadowColor: CONSTANTS.COLOR.BLACK,
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 2,
     elevation: 1,
  },
  photo: {
      width: null,
      resizeMode: 'stretch',
      height: width / 2.2,
      borderRadius: 10
  },
  text: {
      color: CONSTANTS.COLOR.BLACK,
      fontSize: 20
  },
  precio: {
      color: CONSTANTS.COLOR.BLACK,
      fontSize: 15
  },
  detail: {
      color: CONSTANTS.COLOR.GREY_DARK,
      fontSize: 15
  },
  consumir: {
      color: CONSTANTS.COLOR.SUCCESS,
      fontSize: 15
  },
  comprar: {
      color: CONSTANTS.COLOR.ERROR,
      fontSize: 15
  },
  detalle: {
    flex: 1,
    backgroundColor: CONSTANTS.COLOR.PRIMARY,
    borderWidth: 0.5,
    borderColor: CONSTANTS.COLOR.GREY,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    alignItems: 'center',
    bottom: 0
  },
  detalleText: {
    color: CONSTANTS.COLOR.WHITE,
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 5
  },
  modalContainer: {
    backgroundColor: CONSTANTS.COLOR.WHITE_ICE,
    height: height / 1.9,
    width: null,
    borderRadius: 8,
    padding: 30
  },
  innerContainer: {
    alignItems: 'center',
    color: CONSTANTS.COLOR.BLACK,
    fontSize: 20
  },
  inputStyle: {
    backgroundColor: CONSTANTS.COLOR.TRANSPARENT,
    paddingRight: 5,
    paddingLeft: 5,
    flex: 2,
    fontSize: 23,
    color: 'black'
  }
};

const mapStateToProps = ({ product }) => {
  const { products, otros, code, errorCode, isModalOpenedOther } = product;

  return { products, otros, code, errorCode, isModalOpenedOther };
};

export default connect(mapStateToProps, {
  getProducts, productPressed, createProduct, changeCode, consumeAcepted, cleanCode, isModalOpen
})(Others);
