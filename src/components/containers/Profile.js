/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, Dimensions, Picker, BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import CheckBox from 'react-native-check-box';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  isModalOpenUser,
  checkLolPressed,
  saveProfile,
  nickNameChanged,
  codeChanged,
  getCode,
  checkCSGOPressed,
  checkFortnitePressed,
  checkHearthSotnePressed,
  checkOverWatchPressed,
  checkPubgPressed,
  checkSmitePressed,
  instagramChanged,
  facebookChanged,
  twitterChanged,
  twitchChanged,
  modalCloseSession
} from '../../actions';
import {
  CardSection, CardSectionRow, ButtonPrimary, ButtonError, ButtonSuccess,
  CardSectionTransp, InputBlack, Card
} from '../common';

const { height } = Dimensions.get('window');
const CONSTANTS = require('../../config/constants');

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sexSelected: 'NaN',
      ageSelected: 'NaN',
      ages: ['7', '8', '9', '10',
        '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
        '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
        '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
        '61', '62', '63', '64', '65', '66', '67', '68', '69', '70',
        '71', '72', '73', '74', '75', '76', '77', '78', '79', '80',
        '81', '82', '83', '84', '85', '86', '87', '88', '89', '90',
        '91', '92', '93', '94', '95', '96', '97', '98', '99',
      ]
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
      this.props.getCode();
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  onSavePressed() {
    let nickName = this.props.nickName;
    let code = this.props.code;
    let lol = this.props.lol;
    let csgo = this.props.csgo;
    let fortnite = this.props.fortnite;
    let hs = this.props.hs;
    let ow = this.props.ow;
    let pubg = this.props.pubg;
    let smite = this.props.smite;
    let instagram = this.props.instagram;
    let facebook = this.props.facebook;
    let twitter = this.props.twitter;
    let twitch = this.props.twitch;

    if (nickName === null) {
      nickName = this.props.user.nickName;
    }
    if (!code && code !== '') {
      code = this.props.codeFromDB;
    }

    if (lol === null) {
      lol = this.props.user.interests && this.props.user.interests.lol ? this.props.user.interests.lol : false;
    }
    if (csgo === null) {
      csgo = this.props.user.interests && this.props.user.interests.csgo ? this.props.user.interests.csgo : false;
    }
    if (fortnite === null) {
      fortnite = this.props.user.interests && this.props.user.interests.fortnite ? this.props.user.interests.fortnite : false;
    }
    if (hs === null) {
      hs = this.props.user.interests && this.props.user.interests.hs ? this.props.user.interests.hs : false;
    }
    if (ow === null) {
      ow = this.props.user.interests && this.props.user.interests.ow ? this.props.user.interests.ow : false;
    }
    if (pubg === null) {
      pubg = this.props.user.interests && this.props.user.interests.pubg ? this.props.user.interests.pubg : false;
    }
    if (smite === null) {
      smite = this.props.user.interests && this.props.user.interests.smite ? this.props.user.interests.smite : false;
    }

    if (instagram === null) {
      instagram = this.props.user.instagram ? this.props.user.instagram : '';
    }
    if (facebook === null) {
      facebook = this.props.user.facebook ? this.props.user.facebook : '';
    }
    if (twitter === null) {
      twitter = this.props.user.twitter ? this.props.user.twitter : '';
    }
    if (twitch === null) {
      twitch = this.props.user.twitch ? this.props.user.twitch : '';
    }

    this.props.saveProfile(
      this.props.user.email,
      this.props.user.key,
      nickName,
      this.state.sexSelected,
      this.state.ageSelected,
      lol,
      csgo,
      fortnite,
      hs,
      ow,
      pubg,
      smite,
      code,
      instagram,
      facebook,
      twitter,
      twitch
    );
  }

  onNickNameChange(text) {
    this.props.nickNameChanged(text);
  }

  onCodeChange(text) {
    this.props.codeChanged(text);
  }

  onSexSelected(itemValue) {
    this.setState({ sexSelected: itemValue });
  }

  onAgeSelected(itemValue) {
    this.setState({ ageSelected: itemValue });
  }

  onCheckCSGOPressed() {
    const state = this.props.csgo !== null ? this.props.csgo : (this.props.user.interests && this.props.user.interests.csgo ? this.props.user.interests.csgo : false);
    this.props.checkCSGOPressed(state);
  }

  onCheckFortnitePressed() {
    const state = this.props.fortnite !== null ? this.props.fortnite : (this.props.user.interests && this.props.user.interests.fortnite ? this.props.user.interests.fortnite : false);
    this.props.checkFortnitePressed(state);
  }

  onCheckHearthStonePressed() {
    const state = this.props.hs !== null ? this.props.hs : (this.props.user.interests && this.props.user.interests.hs ? this.props.user.interests.hs : false);
    this.props.checkHearthSotnePressed(state);
  }

  onCheckLolPressed() {
    const state = this.props.lol !== null ? this.props.lol : (this.props.user.interests && this.props.user.interests.lol ? this.props.user.interests.lol : false);
    this.props.checkLolPressed(state);
  }

  onCheckOverWatchPressed() {
    const state = this.props.ow !== null ? this.props.ow : (this.props.user.interests && this.props.user.interests.ow ? this.props.user.interests.ow : false);
    this.props.checkOverWatchPressed(state);
  }

  onCheckPubgPressed() {
    const state = this.props.pubg !== null ? this.props.pubg : (this.props.user.interests && this.props.user.interests.pubg ? this.props.user.interests.pubg : false);
    this.props.checkPubgPressed(state);
  }

  onCheckSmitePressed() {
    const state = this.props.smite !== null ? this.props.smite : (this.props.user.interests && this.props.user.interests.smite ? this.props.user.interests.smite : false);
    this.props.checkSmitePressed(state);
  }

  onFacebookChange(text) {
    this.props.facebookChanged(text);
  }

  onInstagramChange(text) {
    this.props.instagramChanged(text);
  }

  onTwitterChange(text) {
    this.props.twitterChanged(text);
  }

  onTwitchChange(text) {
    this.props.twitchChanged(text);
  }

  selectSex() {
    if (this.state.sexSelected && this.state.sexSelected !== 'NaN') {
      return this.state.sexSelected;
    } else if (this.props.user && this.props.user.sex) {
      this.state.sexSelected = this.props.user.sex;
      return this.props.user.sex;
    }
  }

  toggleModalCloseSession() {
    this.props.modalCloseSession();
  }

  selectAge() {
    if (this.state.ageSelected && this.state.ageSelected !== 'NaN') {
      return this.state.ageSelected;
    } else if (this.props.user && this.props.user.age) {
      this.state.ageSelected = this.props.user.age;
      return this.props.user.age;
    }
  }

  toggleModalSave() {
    this.props.isModalOpenUser('SAVE');
  }

  handleBackButtonClick() {
    this.props.itemSelected('Eventos');
    return true;
  }

  renderProfile() {
    return (
      <View style={styles.margin}>
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
        <Modal
          backdropColor={CONSTANTS.COLOR.BLACK}
          backdropOpacity={0.5}
          isVisible={this.props.isModalOpenedSave}
          onRequestClose={() => { this.toggleModalSave(); }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.innerContainer}>¿Guardar cambios?</Text>

              <ButtonError onPress={() => { this.toggleModalSave(); }}>NO</ButtonError>
              <ButtonSuccess
                onPress={() => this.onSavePressed()}
              >
              SI
              </ButtonSuccess>
          </View>
        </Modal>
         <CardSection>
           <View style={styles.thumbnailContainerStyle}>
             <Image
               style={styles.thumbnailStyle}
               source={require('../../assets/img/logo.png')}
             />
           </View>
           <View style={styles.headerContentStyle}>
             <Text style={styles.email}>{this.props.user && this.props.user.email}</Text>
           </View>
         </CardSection>
         <CardSectionRow>
           <View style={{ marginLeft: 10, marginBottom: 4 }}>
             <Text style={styles.headerTextStyle}>INFORMACIÓN GENERAL</Text>
           </View>
           <View style={{ marginLeft: 10 }}>
             <CardSectionTransp>
               <InputBlack
                 label="NickName"
                 onChangeText={this.onNickNameChange.bind(this)}
                 value={(this.props.nickName !== null) ? this.props.nickName : (this.props.user && this.props.user.nickName)}
               />
             </CardSectionTransp>

             <CardSectionTransp>
               <View style={styles.containerStyle}>
                 <Picker
                   selectedValue={this.selectSex()}
                   onValueChange={(itemValue) => this.onSexSelected(itemValue)}
                 >
                 <Picker.Item key={-1} label='Selecciona tu SEXO' value='NaN' />
                 <Picker.Item key={0} label='MUJER' value='MUJER' />
                 <Picker.Item key={1} label='HOMBRE' value='HOMBRE' />
                 </Picker>
               </View>
             </CardSectionTransp>
             <CardSectionTransp>
               <View style={styles.containerStyle}>
                 <Picker
                   selectedValue={this.selectAge()}
                   onValueChange={(itemValue) => this.onAgeSelected(itemValue)}
                 >
                 <Picker.Item key={-1} label='Selecciona tu EDAD' value='NaN' />
                 {this.state.ages.map((age, key) => {
                     return (
                       <Picker.Item key={key} value={age} label={age + ' años'} />
                     );
                   })
                 }
                 </Picker>
               </View>
             </CardSectionTransp>
           </View>
         </CardSectionRow>
         {this.props.user && this.props.user.rol === CONSTANTS.ROLES.BOSS &&
           <CardSectionRow>
             <View style={{ marginLeft: 10, marginBottom: 4 }}>
               <Text style={styles.headerTextStyle}>CÓDIGO</Text>
             </View>
             <View style={{ marginLeft: 10, flex: 1 }}>
               <CardSectionTransp>
                 <InputBlack
                   secureTextEntry
                   label=""
                   onChangeText={this.onCodeChange.bind(this)}
                   value={(this.props.code !== null) ? this.props.code : (this.props.codeFromDB && this.props.codeFromDB.toString())}
                 />
               </CardSectionTransp>
             </View>
           </CardSectionRow>
         }
         <CardSectionRow>
           <View style={{ marginLeft: 10, marginBottom: 4 }}>
             <Text style={styles.headerTextStyle}>REDES SOCIALES</Text>
           </View>
           <View style={{ marginLeft: 10, flex: 1 }}>
             <CardSectionTransp>
               <InputBlack
                 label="Facebook"
                 onChangeText={this.onFacebookChange.bind(this)}
                 value={(this.props.facebook !== null) ? this.props.facebook : (this.props.user && this.props.user.facebook && this.props.user.facebook.toString())}
               />
             </CardSectionTransp>
             <CardSectionTransp>
               <InputBlack
                 label="Instagram"
                 onChangeText={this.onInstagramChange.bind(this)}
                 value={(this.props.instagram !== null) ? this.props.instagram : (this.props.user && this.props.user.instagram && this.props.user.instagram.toString())}
               />
             </CardSectionTransp>
             <CardSectionTransp>
               <InputBlack
                 label="Twitter"
                 onChangeText={this.onTwitterChange.bind(this)}
                 value={(this.props.twitter !== null) ? this.props.twitter : (this.props.user && this.props.user.twitter && this.props.user.twitter.toString())}
               />
             </CardSectionTransp>
             <CardSectionTransp>
               <InputBlack
                 label="Twitch"
                 onChangeText={this.onTwitchChange.bind(this)}
                 value={(this.props.twitch !== null) ? this.props.twitch : (this.props.user && this.props.user.twitch && this.props.user.twitch.toString())}
               />
             </CardSectionTransp>
           </View>
         </CardSectionRow>
         <CardSectionRow>
           <View style={{ marginLeft: 10, marginBottom: 4 }}>
             <Text style={styles.headerTextStyle}>INTERESES</Text>
           </View>
           <View style={{ marginLeft: 25 }}>
             <CheckBox
               style={{ flex: 1, padding: 10 }}
               onClick={() => this.onCheckCSGOPressed()}
               isChecked={this.props.csgo !== null ? this.props.csgo : (this.props.user && this.props.user.interests && this.props.user.interests.csgo ? this.props.user.interests.csgo : false)}
               leftText='CSGO'
             />
             <CheckBox
               style={{ flex: 1, padding: 10 }}
               onClick={() => this.onCheckFortnitePressed()}
               isChecked={this.props.fortnite !== null ? this.props.fortnite : (this.props.user && this.props.user.interests && this.props.user.interests.fortnite ? this.props.user.interests.fortnite : false)}
               leftText='Fortnite'
             />
             <CheckBox
               style={{ flex: 1, padding: 10 }}
               onClick={() => this.onCheckHearthStonePressed()}
               isChecked={this.props.hs !== null ? this.props.hs : (this.props.user && this.props.user.interests && this.props.user.interests.hs ? this.props.user.interests.hs : false)}
               leftText='HearthStone'
             />
             <CheckBox
               style={{ flex: 1, padding: 10 }}
               onClick={() => this.onCheckLolPressed()}
               isChecked={this.props.lol !== null ? this.props.lol : (this.props.user && this.props.user.interests && this.props.user.interests.lol ? this.props.user.interests.lol : false)}
               leftText='League of Legends'
             />
             <CheckBox
               style={{ flex: 1, padding: 10 }}
               onClick={() => this.onCheckOverWatchPressed()}
               isChecked={this.props.ow !== null ? this.props.ow : (this.props.user && this.props.user.interests && this.props.user.interests.ow ? this.props.user.interests.ow : false)}
               leftText='OverWatch'
             />
             <CheckBox
               style={{ flex: 1, padding: 10 }}
               onClick={() => this.onCheckPubgPressed()}
               isChecked={this.props.pubg !== null ? this.props.pubg : (this.props.user && this.props.user.interests && this.props.user.interests.pubg ? this.props.user.interests.pubg : false)}
               leftText='PUBG'
             />
             <CheckBox
               style={{ flex: 1, padding: 10 }}
               onClick={() => this.onCheckSmitePressed()}
               isChecked={this.props.smite !== null ? this.props.smite : (this.props.user && this.props.user.interests && this.props.user.interests.smite ? this.props.user.interests.smite : false)}
               leftText='Smite'
             />
           </View>

         </CardSectionRow>
         {this.props.reports && this.props.reports.length > 0 &&
           <CardSectionRow>
             <View style={{ marginLeft: 10, marginBottom: 10 }}>
               <Text style={styles.headerTextStyle}>REPORTS</Text>
             </View>
             <View style={{ marginLeft: 25 }}>
             {this.props.reports &&
               this.props.reports.map((report, key) => {
                 return (
                   <Card key={key}>
                     <Text style={{ color: CONSTANTS.COLOR.BLACK }}>{report.date}</Text>
                     <Text>{report.report}</Text>
                   </Card>
                 );
               })
             }
             </View>
           </CardSectionRow>
         }
         <CardSectionRow>
           {this.props.message !== '' && this.props.error === '' &&
             <Text style={{ color: CONSTANTS.COLOR.SUCCESS, marginLeft: 10, marginTop: 5 }}>{this.props.message}</Text>
           }

           {this.props.error !== '' &&
             <Text style={{ color: CONSTANTS.COLOR.ERROR, marginLeft: 10, marginTop: 5 }}>{this.props.error}</Text>
           }

           <ButtonPrimary onPress={() => { this.toggleModalSave(); }}>
             GUARDAR CAMBIOS
           </ButtonPrimary>
         </CardSectionRow>
       </View>
    )
  }

  render() {
    return (
      <ScrollView
        style={styles.scroll}
      >
        {this.renderProfile()}
        <KeyboardSpacer />
      </ScrollView>
   );
 }
}

const styles = StyleSheet.create({
  margin: {
    marginBottom: 25,
    marginTop: 25,
    flex: 1
  },
  headerContentStyle: {
     flexDirection: 'column',
     justifyContent: 'space-around'
   },
   headerTextStyle: {
     fontSize: 18,
     color: CONSTANTS.COLOR.BLACK
   },
   email: {
     fontSize: 12,
     color: CONSTANTS.COLOR.BLACK
   },
   thumbnailStyle: {
     height: 90,
     width: 90
   },
   thumbnailContainerStyle: {
     justifyContent: 'center',
     alignItems: 'center',
     marginLeft: 5,
     marginRight: 10
   },
    containerStyle: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 5,
      paddingBottom: 5
    },
    error: {
      fontSize: 13,
      color: CONSTANTS.COLOR.ERROR
    },
    scroll: {
      flex: 1,
      paddingBottom: 25
    },
    date: {
        color: CONSTANTS.COLOR.GREY_DARK,
        fontSize: 16
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

const mapStateToProps = ({ user, auth }) => {
  const {
    isModalOpenedSave, lol, csgo, fortnite, hs, ow, pubg, smite, message,
    nickName, code, codeFromDB, instagram, facebook, twitter, twitch, error
  } = user;
  const { isModalCloseSessions } = auth;

  return {
    isModalOpenedSave, lol, csgo, fortnite, hs, ow, pubg, smite, message,
    nickName, code, codeFromDB, instagram, facebook, twitter, twitch, error,
    isModalCloseSessions
 };
};

export default connect(mapStateToProps, {
  isModalOpenUser,
  checkLolPressed,
  saveProfile,
  nickNameChanged,
  codeChanged,
  getCode,
  checkCSGOPressed,
  checkFortnitePressed,
  checkHearthSotnePressed,
  checkOverWatchPressed,
  checkPubgPressed,
  checkSmitePressed,
  instagramChanged,
  facebookChanged,
  twitterChanged,
  twitchChanged,
  modalCloseSession
})(Profile);
