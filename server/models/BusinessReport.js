const mongoose = require("mongoose");

const businessReportSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    businessName: String,

    category: String,

    location: String,

    budget: String,

    description: String,

    report: Object

},
{
    timestamps: true
});

module.exports = mongoose.model("BusinessReport", businessReportSchema);