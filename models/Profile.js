import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    relationship: { type: String, required: true },
  },
  { timestamps: true }
);

const referenceSchema = new Schema({
  ...contactSchema.obj,
  email: { type: String, required: true },
});

// const status = new Set(['Pending', 'Approved', 'Rejected']);

const documentSchema = new Schema(
  {
    fileType: { type: String },
    fileName: { type: String },
    fileUrl: { type: String },
    status: {
      type: String,
      default: 'Pending',
    },
    feedback: {
      type: String,
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
  status: {
    type: String,
    default: 'New',
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
  citizenship: {
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
  documents: {
    type: [documentSchema],
    default: [
      { fileType: 'profilePicture', status: 'Approved' },
      { fileType: 'driverLicense', status: 'Approved' },
      { fileType: 'optReceipt', status: 'Pending' },
      { fileType: 'i983', status: 'Pending' },
      { fileType: 'optEAD', status: 'Pending' },
    ],
  },
});

ProfileSchema.pre('save', function (next) {
  if (!this.workPhone) {
    this.workPhone = this.cellPhone;
  }
  next();
});

export default model('Profile', ProfileSchema);
