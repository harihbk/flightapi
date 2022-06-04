const { Service } = require('feathers-mongoose');
const fs = require('fs');
const multer = require('multer');
const express = require('express');
const excelToJson = require('convert-excel-to-json');
global.__basedir = __dirname;
const path = require('path')

exports.Flight = class Flight extends Service {

  constructor(options,app){
    super(options, app);
    this.app = app;


  }

  async find(name){
    const  search  = name.query.$search
    const params = {}
    params['query'] = {}

  //  // if(search){
  //     params['query'].$text={ $search: search , $caseSensitive : false }
  //  // }
    try {
      //let resCollection =
        //await this.app.service('flight').Model.find(name.query).limit(15)
       let resCollection =
        await this.app.service('flight').Model.find(
          {
            $or: [
                { "airport": new RegExp(search, "gi") },
                { "cc": new RegExp(search, "gi") },
                { "city": new RegExp(search, "gi") },
                { "country": new RegExp(search, "gi") },
                { "iata": new RegExp(search, "gi") },
            ]
        }
        ).limit(15)




      return resCollection


    } catch (e) {
      console.log(e);
      return e

    }
  }


  async create(data, params){
    const filename = path.join(__dirname, '..', '..', 'assets/flights.xlsx')


     const excelData = excelToJson({
      sourceFile: filename,
      sheets:[{
          // Excel Sheet Name
          name: 'Airport',
          // Header Row -> be skipped and will not be present at our result object.
          header:{
             rows: 1
          },

          // Mapping columns to keys
          columnToKey: {
              A: 'iata',
              B: 'airport',
              C: 'citycode',
              D: 'city',
              E : 'country',
              F : 'cc'
          }
      }]
  });

 //console.log(excelData.Airport);
  await this.app.service('flight').Model.insertMany(excelData.Airport);

  return "success";
  }

};
