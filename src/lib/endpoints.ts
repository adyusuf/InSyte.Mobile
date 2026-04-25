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
  workingGroups: {
    list: '/v1/working-groups',
    detail: (id: string) => `/v1/working-groups/${id}`,
    members: (id: string) => `/v1/working-groups/${id}/members`,
    addMember: (id: string) => `/v1/working-groups/${id}/members`,
    removeMember: (groupId: string, memberId: string) => `/v1/working-groups/${groupId}/members/${memberId}`,
  },
  councils: {
    list: '/v1/councils',
    detail: (id: string) => `/v1/councils/${id}`,
    members: (id: string) => `/v1/councils/${id}/members`,
    addMember: (id: string) => `/v1/councils/${id}/members`,
    removeMember: (councilId: string, memberId: string) => `/v1/councils/${councilId}/members/${memberId}`,
  },
} as const;
