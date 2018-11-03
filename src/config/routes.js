import App from '../App';
import Eventos from '../components/containers/Eventos';
import Hall from '../components/containers/Hall';
import LoginForm from '../components/containers/LoginForm';
import Registry from '../components/containers/Registry';
import Evento from '../components/containers/EventDetail';
import Galeria from '../components/containers/Gallery';
import Tienda from '../components/containers/Shop';
import Product from '../components/containers/Product';
import Reservas from '../components/containers/Reservation';
import Reserva from '../components/containers/ReservationDetail';
import Usuarios from '../components/containers/User';
import Usuario from '../components/containers/UserDetail';
import EventCreate from '../components/containers/EventCreate';
import Perfil from '../components/containers/Profile';
import Terminos from '../components/containers/Terms';

export const Routes = {
    App: {
        screen: App,
        navigationOptions: () => ({
            header: false
          })
    },

    Galeria: {
        screen: Galeria,
        navigationOptions: () => ({
            header: false
          })
    },

    Eventos: {
        screen: Eventos,
        navigationOptions: () => ({
            header: false
        })
    },

    Evento: {
        screen: Evento,
        navigationOptions: () => ({
            header: false
        })
    },

    'Nuevo Evento': {
        screen: EventCreate,
        navigationOptions: () => ({
            header: false
        })
    },

    Tienda: {
        screen: Tienda,
        navigationOptions: () => ({
            header: false
        })
    },

    Product: {
        screen: Product,
        navigationOptions: () => ({
            header: false
        })
    },

    Reservas: {
        screen: Reservas,
        navigationOptions: () => ({
            header: false
        })
    },

    Reserva: {
      screen: Reserva,
      navigationOptions: () => ({
          header: false
      })
    },

    Usuarios: {
      screen: Usuarios,
      navigationOptions: () => ({
          header: false
      })
    },

    Usuario: {
      screen: Usuario,
      navigationOptions: () => ({
          header: false
      })
    },

    Perfil: {
      screen: Perfil,
      navigationOptions: () => ({
          header: false
      })
    },

    Hall: {
      screen: Hall,
      navigationOptions: () => ({
          header: false
      })
    },

    Login: {
        screen: LoginForm,
        navigationOptions: () => ({
            header: false
        })
    },

    Registro: {
        screen: Registry,
        navigationOptions: () => ({
          header: false
        })
    },

    Terminos: {
        screen: Terminos,
        navigationOptions: () => ({
          header: false
        })
    }
};
