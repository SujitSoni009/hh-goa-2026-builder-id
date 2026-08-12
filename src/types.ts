export type FormatType = 'builder_id' | 'pfp_frame' | null;

export interface BuilderData {
  fullName: string;
  handle: string;
  bio: string;
  location: string;
  website: string;
  photoUrl: string | null;
  cropArea: any | null; // For react-easy-crop
  croppedPhotoUrl?: string | null;
  builderId?: string;
}
