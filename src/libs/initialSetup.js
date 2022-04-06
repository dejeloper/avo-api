import { Promise } from 'mongodb';
import Role from '../model/v1/Role'
import StateUser from '../model/v1/StateUser'
import TypeDocument from '../model/v1/TypeDocument'

export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount()
    if (count > 0) return;

    // const values = await Promise.all([
    new Role({ name: "Desarrollador", visible: false }).save();
    new Role({ name: "Administrador", visible: true }).save();
    new Role({ name: "Coordinador", visible: true }).save();
    new Role({ name: "Auxiliar", visible: true }).save();
    // ]);
    console.log("Ok Roles");
  } catch (error) {
    console.error(error);
  }
}

export const createStatesUsers = async () => {
  try {
    const count = await StateUser.estimatedDocumentCount()
    if (count > 0) return;

    // const values = await Promise.all([
    new StateUser({ name: "Activo" }).save();
    new StateUser({ name: "Inactivo" }).save();
    new StateUser({ name: "Eliminado" }).save();
    // ]);
    console.log("Ok States");
  } catch (error) {
    console.error(error);
  }
}

export const createTypesDocuments = async () => {
  try {
    const count = await TypeDocument.estimatedDocumentCount()
    if (count > 0) return;

    // const values = await Promise.all([
    new TypeDocument({ name: "Cédula de Ciudadanía" }).save();
    new TypeDocument({ name: "Cédula de Extranjería" }).save();
    new TypeDocument({ name: "Pasaporte" }).save();
    new TypeDocument({ name: "Tarjeta de Identidad" }).save();
    // ]);
    console.log("Ok Types Documents");
  } catch (error) {
    console.error(error);
  }
}