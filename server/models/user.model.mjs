import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },

    avatar: {
      type: String,
      default: null
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    providers: {
      local: {
        passwordHash: {
          type: String
        }
      },

      google: {
        googleId: {
          type: String
        }
      },

      github: {
        githubId: {
          type: String
        }
      },

      microsoft: {
        microsoftId: {
          type: String
        }
      }
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.providers?.local?.passwordHash;
    return ret;
  }
});