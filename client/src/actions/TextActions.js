export const actionTypes = {
  sendSMS: 'SEND_SMS',
}

export const sendSMS = (to, text) => {
  return {
    type: actionTypes.sendSMS,
    payload: {
      client: 'base',
      request: {
        url: '/api/text',
        method: 'post',
        data: {
          body: text,
          number: to
        }
      },
    }
  }
}
