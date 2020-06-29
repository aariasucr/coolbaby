import {of} from 'rxjs';
import {convertToParamMap} from '@angular/router';

export const datosUsuario = {
  uid: 'usuarioPrueba'
};

export const datosProducto = {
  id: 'idProductoPrueba'
};

export const mockAngularFireAuth: any = {
  currentUser: Promise.resolve(datosUsuario)
};

export const mockCategoria = {
  val() {
    return {
      key: 0,
      name: 'CategoriaTest'
    };
  }
};

export const mockDatosUsuario = {
  val() {
    return {
      created: 'number',
      lastUpdate: 'number',
      email: 'string',
      userName: 'string',
      fullName: 'string',
      img: 'string'
    };
  }
};

export const mockTentatives = {
  val() {
    return {
      nombreComprador: 'string',
      uidComprador: 'string',
      nombreProducto: 'string',
      uidProducto: 'string',
      uidVendedor: 'string',
      emailVendedor: 'string',
      img: 'string'
    };
  }
};

export const mockDatabase: any = {
  object() {
    return {
      snapshotChanges() {
        return {subscribe() {}};
      }
    };
  },
  list() {
    return {
      snapshotChanges() {
        return {subscribe() {}};
      }
    };
  },
  database: {
    ref() {
      return {
        child() {
          return {
            once() {
              return Promise.resolve(mockCategoria);
            }
          };
        }
      };
    }
  }
};

export const mockParam = {
  paramMap: of(
    convertToParamMap({
      onwerName: 'propietario',
      productId: 'idProduct'
    })
  )
};
