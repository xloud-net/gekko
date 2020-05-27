const ErrorUtils = {}

ErrorUtils.clearErrors = (store) => {
  store.dispatch('errors/clear')
}
ErrorUtils.setErrorsByAxiosError = (store, err) => {
  if (
    err &&
    err.response &&
    err.response.data &&
    err.response.data.errors &&
    err.response.data.errors.length > 0
  ) {
    store.dispatch('errors/set', err.response.data.errors)
  }
}
export default ErrorUtils
