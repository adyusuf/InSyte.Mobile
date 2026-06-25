// .NET API (`/api/v1`) sözleşmesiyle eşitlenmiş tipler — web ile aynı şekiller (camelCase).

export type UserRole = 'Admin' | 'Advisor' | 'SchoolAdmin' | 'Teacher';
export type VideoStatus = 'Uploaded' | 'Processing' | 'Evaluated' | 'Approved' | 'Rejected';
export type ReportStatus = 'Draft' | 'Approved' | 'Sent' | 'Rejected';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export interface School {
  id: string;
  name: string;
  address?: string;
  city?: string;
  phone?: string;
  email?: string;
  isActive: boolean;
  createdAt: string;
  advisorCount: number;
  teacherCount: number;
  videoCount: number;
}

// /api/v1/teachers — UserDto şekliyle aynı
export interface Teacher {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export interface Video {
  id: string;
  title: string;
  originalFileName?: string;
  fileSize: number;
  schoolId: string;
  schoolName: string;
  teacherUserId: string;
  teacherName: string;
  subject?: string;
  status: VideoStatus;
  createdAt: string;
  evaluationCount: number;
}

export interface Report {
  id: string;
  evaluationId: string;
  videoTitle: string;
  schoolName: string;
  teacherName: string;
  pdfPath?: string;
  approvedByName?: string;
  approvedAt?: string;
  status: ReportStatus;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

// Görüntülenecek tam ad — API firstName/lastName döndürür.
export const fullName = (p: { firstName: string; lastName: string }) =>
  `${p.firstName} ${p.lastName}`.trim();
