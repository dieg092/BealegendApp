/*eslint-disable global-require*/
import React, { Component } from 'react';
import { View, Text, ScrollView, StatusBar, Dimensions, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { loginFacebook, cleanError } from '../../actions';
import { CardSectionRow } from '../common';

const { height } = Dimensions.get('window');
const CONSTANTS = require('../../config/constants');

class Terms extends Component {
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
    this.props.itemSelected('Hall');

    return true;
  }

  render() {
    return (
        <View style={styles.opacity}>
          <StatusBar
             backgroundColor={CONSTANTS.COLOR.TRANSPARENT}
             barStyle="light-content"
             translucent
          />
          <ScrollView
            style={styles.currentHeight}
          >
          <View style={{ marginBottom: 30 }}>
           <CardSectionRow>
           <View style={{ alignItems: 'center' }}>
              <Text style={styles.headerTextStyle}>TÉRMINOS Y CONDICIONES</Text>
           </View>
              <Text style={styles.text}>El presente Política de Privacidad establece los términos en
              que Be a Legend usa y protege la información que es proporcionada
              por sus usuarios al momento de utilizar su App. Esta empresa está
              comprometida con la seguridad de los datos de sus usuarios.
              Cuando le pedimos llenar los campos de información personal con la cual
              usted pueda ser identificado, lo hacemos asegurando que sólo se empleará
              de acuerdo con los términos de este documento. Sin embargo esta
              Política de Privacidad puede cambiar con el tiempo o ser actualizada por
              lo que le recomendamos y enfatizamos revisar continuamente esta página
              para asegurarse que está de acuerdo con dichos cambios.</Text>
              <Text style={styles.title}>Información que es recogida</Text>
              <Text style={styles.text}>Nuestro sitio web podrá recoger información
              personal por ejemplo: Nombre, sexo, edad, información de contacto como  su dirección
              de correo electrónica.</Text>
              <Text style={styles.title}>Uso de la información recogida</Text>
              <Text style={styles.text}>Nuestra App emplea la información con el fin
               de proporcionar el mejor servicio posible, particularmente para mantener
               un registro de usuarios, de tornéos y reservas.

               Be a Legend está altamente comprometido para cumplir con el compromiso
               para asegurarnos que no exista ningún acceso no autorizado.</Text>
               <Text style={styles.text}>Los correos podrán ser utilizados en momentos puntuales
               para enviar información via email de eventos, ofertas u otra noticia de interes de Be A Legend
               a los usuarios</Text>
               <Text style={styles.title}>Control de su información personal</Text>
               <Text style={styles.text}>Ningún dato personal del usuario es obligatorio,
               excepto el correo electrónico para el registro y el NickName para poder
               registrarse en torneos.
               Be a Legend no venderá, cederá ni distribuirá la información personal
               que es recopilada sin su consentimiento, salvo que sea requerido por
               un juez con una orden judicial.

               Be a Legend se reserva el derecho de cambiar los términos de la presente
               Política de Privacidad en cualquier momento.</Text>

           </CardSectionRow>
          </View>
          </ScrollView>
        </View>
    );
  }
}

const styles = {
  opacity: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    height: height
  },
  currentHeight: {
    marginTop: StatusBar.currentHeight
  },
  headerTextStyle: {
    fontSize: 19,
    color: CONSTANTS.COLOR.BLACK
  },
  title: {
    fontSize: 17,
    color: CONSTANTS.COLOR.BLACK,
    marginTop: 10,
    marginLeft: 5
  },
  text: {
    fontSize: 15,
    color: CONSTANTS.COLOR.GREY_VERY_DARK,
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'justify',
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  loginFacebook, cleanError
})(Terms);
