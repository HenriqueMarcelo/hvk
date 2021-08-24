import Realm from 'realm';

export const RegisterSchema = {
  name: 'Register',
  properties: {
    _id: 'int',
    fuel: 'int',
    brand: 'int?',
    name: 'string?',
    full_tank: 'bool',
    odometer: 'string',
    quantity: 'string',
    cost: 'string',
    price: 'string',
  },
  primaryKey: '_id',
};

const GetRegisterColection = async (): Promise<Realm> => {
  const realm = await Realm.open({
    path: 'myrealm',
    schema: [RegisterSchema],
  });
  return realm;
};

export const realmRegister = GetRegisterColection();
