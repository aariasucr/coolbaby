export const datosUsuario = {
  uid: 'usuarioPrueba'
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

export const mockDatabase: any = {
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
        once() {
          return Promise.resolve(mockCategoria);
        }
      };
    }
  }
};
