const UserModel = {}
UserModel.create = (user) => {
  return {
    id: user ? user.id : null,
    name: user ? user.name : '',
    email: user ? user.email : '',
    password: '',
    confirmPassword: ''
  }
}

const UserValidation = {}
UserValidation.CreateRules = {
  name: [
    (v) => !!v || 'Name is required',
    (v) => v.length <= 32 || 'Name must be less than 32 characters'
  ],
  email: [
    (v) => !!v || 'E-mail is required',
    (v) => v.length <= 256 || 'Name must be less than 256 characters',
    (v) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      'E-mail must be valid'
  ],
  password: [
    (v) => !!v || 'Password is required',
    (v) => v.length >= 8 || 'Password must be at least at 8 characters',
    (v) => v.length <= 32 || 'Password must be less than 32 characters'
  ],
  confirmPassword: [
    (v) => !!v || 'Password (Confirm) is required',
    (v) =>
      v.length >= 8 || 'Password (Confirm) must be at least at 8 characters',
    (v) =>
      v.length <= 32 || 'Password (Confirm) must be less than 32 characters'
  ]
}
UserValidation.EditRules = {
  name: [
    (v) => !!v || 'Name is required',
    (v) => v.length <= 32 || 'Name must be less than 32 characters'
  ],
  email: [
    (v) => !!v || 'E-mail is required',
    (v) => v.length <= 256 || 'Name must be less than 256 characters',
    (v) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      'E-mail must be valid'
  ],
  password: [
    (v) => {
      if (!v) return true
      if (v.length < 8) {
        return 'Password must be at least at 8 characters'
      } else if (v.length > 32) {
        return 'Password must be less than 32 characters'
      }
      return true
    }
  ],
  confirmPassword: [
    (v) => {
      if (!v) return true
      if (v.length < 8) {
        return 'Password (Confirm) must be at least at 8 characters'
      } else if (v.length > 32) {
        return 'Password (Confirm) must be less than 32 characters'
      }
      return true
    }
  ]
}

export { UserModel, UserValidation }
