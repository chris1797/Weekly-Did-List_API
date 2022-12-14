"use strict";

// const { response } = require("../../server");

//import BoardStorage
const BoardStorage = require("./BoardStorage");

class Board {

  constructor(body) {
    this.body = body;
  }

  async save() {
    const board = this.body;
    
    try {
      const board = await BoardStorage.save(board);
      return response;
    } catch (err) {
      return { success: false, msg: err};
    }
  }
}

module.exports = Board;