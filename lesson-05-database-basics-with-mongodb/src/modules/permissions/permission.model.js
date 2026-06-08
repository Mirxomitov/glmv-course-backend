const mongoose = require("mongoose");
const { toJSONConfig } = require("../shared/db/to-json");

const permissionSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

permissionSchema.set("toJSON", toJSONConfig());

module.exports = mongoose.model("Permission", permissionSchema);
