export default {
  getFullEmail: (name, email) => (name ? `${name} <${email}>` : email),
  isCorrectEmail: () => true,
}
