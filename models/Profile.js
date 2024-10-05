import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    relationShip: { type: String, required: true },
  },
  { timestamps: true }
);

const referenceSchema = new Schema({
  ...contactSchema.obj,
  email: { type: String, required: true },
});

const status = new Set(['Pending', 'Approved', 'Rejected']);
//Buffer : <base64 encoded PDF file or binary data>
const documentSchema = new Schema(
  {
    fileName: { type: String },
    file: { type: Buffer },
    status: {
      type: String,
      default: 'Pending',
      validate: {
        validator: function (value) {
          return status.has(value);
        },
        message: (props) => `${props.value} is not a valid status!`,
      },
    },
  },
  { timestamps: true }
);

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  preferredName: {
    type: String,
  },
  profilePicture: {
    type: Buffer,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  ssn: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
  },
  addressOne: {
    type: String,
  },
  addressTwo: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  cellPhone: {
    type: String,
  },
  workPhone: {
    type: String,
  },
  workAuthType: {
    type: String,
    default: 'None',
  },
  workAuthStartDate: {
    type: Date,
    default: null,
  },
  workAuthEndDate: {
    type: Date,
    default: null,
  },
  reference: referenceSchema,
  emergencyContacts: [contactSchema],
  documents: [documentSchema],
});

ProfileSchema.pre('save', function (next) {
  if (!this.workPhone) {
    this.workPhone = this.cellPhone;
  }
  next();
});

export default model('Profile', ProfileSchema);
