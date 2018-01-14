import moment from 'moment-timezone'

export const actionTypes = {
	sendEmail: 'SEND_EMAIL',
}

const formatEmailDate = (date) => moment(date).tz('America/Denver').format('MMMM DD, YYYY')

export const sendClientConfirmationEmail = (values) => {
	return {
		type: actionTypes.sendEmail,
		payload: {
			request: {
				url: '/email/send',
				method: 'post',
				data: {
					sandbox: false,
					recipients: [
						{
							address: values.email
						},
						{
							address: {
								"email": "reservations@howesfishing.com",
								"header_to": values.email
							}
						}
					],
					templateId: 'howes-fishing',
					templateData: {
						firstName: values.firstName,
						confirm: "confirm",
						directions: values.directions,
						from: values.userName,
						subject: `${formatEmailDate(values.startTime)} Fishing confirmation`,
						timeCost: values.clientEmailTemplate
					},
					campaignId: 'Client confirmation',
				}
			}
		}
	}
}

export const sendClientCancellationEmail = (values) => {
	return {
		type: actionTypes.sendEmail,
		payload: {
			request: {
				url: '/email/send',
				method: 'post',
				data: {
					sandbox: false,
					recipients: [
						{
							address: values.email
						},
						{
							address: {
								"email": "reservations@howesfishing.com",
								"header_to": values.email
							}
						}
					],
					templateId: 'client-cancellation',
					templateData: {
						firstName: values.firstName,
						date: formatEmailDate(values.startTime),
						subject: `${formatEmailDate(values.startTime)} fishing trip cancellation`
					},
					campaignId: 'Client cancellation',
				}
			}
		}
	}
}


//*****GUIDE ACTIONS
export const sendGuideConfirmationEmail = (values) => {
	const recipients = values.emails.map(email => {
		return { address: email }
	})
	return {
		type: actionTypes.sendEmail,
		payload: {
			request: {
				url: '/email/send',
				method: 'post',
				data: {
					sandbox: false,
					recipients,
					templateId: 'guide-conf-template',
					templateData: {
						name: values.name,
						subject: `${formatEmailDate(values.date)} trip confirmation`,
						body: values.body
					},
					campaignId: 'guide confirmation',
					// meta: {
					// 	metaDataDemo: 'this key/val will be in the email headers'
					// },
				}
			}
		}
	}
}

export const sendGuideCancellationEmail = (values) => {
	const recipients = values.emails.map(email => {
		return { address: email }
	})
	return {
		type: actionTypes.sendEmail,
		payload: {
			request: {
				url: '/email/send',
				method: 'post',
				data: {
					sandbox: false,
					recipients,
					templateId: 'guide-cancelation-template',
					templateData: {
						name: values.name,
						subject: `${values.dateTime} trip cancellation`,
						dateTime: values.dateTime
					},
					campaignId: 'guide cancellation',
					// meta: {
					// 	metaDataDemo: 'this key/val will be in the email headers'
					// },
				}
			}
		}
	}
}

export const sendGuidePasswordEmail = (values) => {

	return {
		type: actionTypes.sendEmail,
		payload: {
			request: {
				url: '/email/send',
				method: 'post',
				data: {
					sandbox: false,
					recipients: [
						{
							address: values.email
						}
					],
					templateId: 'user-password-template',
					templateData: {
						name: values.name,
						email: values.email,
						password: values.password
					},
					campaignId: 'user confirmation',
					// meta: {
					// 	metaDataDemo: 'this key/val will be in the email headers'
					// },
				}
			}
		}
	}
}