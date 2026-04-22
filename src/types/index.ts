export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Advisor' | 'SchoolAdmin' | 'Teacher';
  isActive: boolean;
  createdAt: string;
}

export interface School {
  id: string;
  name: string;
  address: string;
  city: string;
  email: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  schoolId: string;
  isActive: boolean;
  createdAt: string;
}

export interface Video {
  id: string;
  title: string;
  filePath: string;
  schoolId: string;
  teacherUserId: string;
  subject: string;
  status: 'UPLOADED' | 'PROCESSING' | 'EVALUATED' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface Report {
  id: string;
  evaluationId: string;
  pdfPath: string;
  approvedByUserId: string;
  status: 'DRAFT' | 'APPROVED' | 'SENT';
  approvedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
}
