// ----------------------------------------------------------------------

export const account = {
  isAdmin: sessionStorage.getItem("isAdmin") || false,
  displayName: sessionStorage.getItem("name") || "Siddhi",
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_25.jpg',
};
