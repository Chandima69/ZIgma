const mongoose = require('../config/db');

const BillSchema = new mongoose.Schema({
    service: { type: String, required: true },
    cost: { type: Number, required: true },
});

module.exports = mongoose.model('Bill', BillSchema);
