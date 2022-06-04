// flight-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'flight';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    airport : { type: String },
    cc : { type: String } ,
    city : { type: String },
    country : { type: String },
    iata : { type: String },
  }, {
    timestamps: true
  });

  schema.index({ airport:"text" , cc : "text" ,city : "text" , country : "text" , iata : "text" });


  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
