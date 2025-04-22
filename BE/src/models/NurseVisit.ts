import mongoose, { Schema, Document } from 'mongoose';

export interface INurseVisit extends Document {
  nurse: mongoose.Types.ObjectId; // Linked to Nurse
  patient: mongoose.Types.ObjectId; // Linked to Patient
  doctor?: mongoose.Types.ObjectId; // Linked to Doctor (optional, if assigned by doctor)
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  visitTime: Date; // Date and time of visit
  instructions: string; // Instructions given by the doctor
}

const nurseVisitSchema: Schema<INurseVisit> = new Schema(
  {
    nurse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Nurse',
      required: true
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
      default: 'scheduled'
    },
    visitTime: {
      type: Date,
      required: true
    },
    instructions: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<INurseVisit>('NurseVisit', nurseVisitSchema);
