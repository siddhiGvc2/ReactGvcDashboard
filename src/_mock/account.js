// ----------------------------------------------------------------------

export const account = {
  clientName:window.sessionStorage.getItem("clientName") || '',
  isAdmin: window.sessionStorage.getItem("isAdmin"),
  displayName:window.sessionStorage.getItem("name") || "Siddhi",
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};
