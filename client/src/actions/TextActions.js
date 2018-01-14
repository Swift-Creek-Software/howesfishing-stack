import axios from 'axios'

export const actionTypes = {
  sendSMS: 'SEND_SMS',
}

export const sendSMS = (to, text) =>
  async dispatch => {
    const res = await axios.post('/api/text', {
      body: text,
      number: to
    })
    dispatch({ type: `${actionTypes.SEND_SMS}_SUCCESS`, payload: { data: res } })
  }
