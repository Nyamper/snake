import { Schema, model } from 'mongoose';

export function modelMixIn<T>(name: string, schema: Schema) {
  class Base {
    protected _model = model<T>(name, schema);

    get model() {
      return this._model;
    }
  }

  return Base;
}
