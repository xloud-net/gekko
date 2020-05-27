/* eslint-disable no-console */
const _baseUrl = process.env.AXIOS_BASE_URL || 'http://localhost:5000/'

const ApiUtils = {}
ApiUtils.endpointUrl = (path) => {
  const apiUrl = _baseUrl + path
  console.log('API URL => ' + apiUrl)
  return apiUrl
}

const Endpoint = {}
const Users = {}
Users.list = () => {
  return ApiUtils.endpointUrl('api/v1/users/')
}
Users.create = () => {
  return ApiUtils.endpointUrl('api/v1/users/')
}
Users.detail = (id) => {
  return ApiUtils.endpointUrl('api/v1/users/' + id)
}
Users.edit = (id) => {
  return ApiUtils.endpointUrl('api/v1/users/' + id)
}
Users.delete = (id) => {
  return ApiUtils.endpointUrl('api/v1/users/' + id)
}
Endpoint.Users = Users

export { ApiUtils, Endpoint }
