/* eslint-disable no-console */
export default function(context) {
  if (process.server) {
    console.log('SSR in middleware')
  } else {
    console.log('CSR in middleware')
  }
}
