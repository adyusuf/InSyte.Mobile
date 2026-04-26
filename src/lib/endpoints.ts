export const apiEndpoints = {
  auth: {
    login: '/v1/auth/login',
    logout: '/v1/auth/logout',
    refresh: '/v1/auth/refresh',
    me: '/v1/auth/me',
  },
  schools: {
    list: '/schools',
    detail: (id: string) => `/schools/${id}`,
    teachers: (id: string) => `/schools/${id}/teachers`,
  },
  teachers: {
    list: '/teachers',
    detail: (id: string) => `/teachers/${id}`,
    videos: (id: string) => `/teachers/${id}/videos`,
  },
  videos: {
    list: '/videos',
    detail: (id: string) => `/videos/${id}`,
    evaluate: (id: string) => `/videos/${id}/evaluate`,
  },
  reports: {
    list: '/reports',
    detail: (id: string) => `/reports/${id}`,
    pdf: (id: string) => `/reports/${id}/pdf`,
  },
  evaluations: {
    list: '/evaluations',
    detail: (id: string) => `/evaluations/${id}`,
  },
} as const;
