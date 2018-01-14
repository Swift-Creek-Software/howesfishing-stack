import axios from 'axios'

export const nexmoClient = axios.create({ //all axios can be used, shown in axios documentation
	baseURL:'https://rest.nexmo.com',
	headers: {
		'Content-Type': 'application/json'
	},
});

export const nexmoOptions = {
	returnRejectedPromiseOnError: true,
	interceptors: {
		request: [
			({ getState }, config) => {
					//
					// config.data['api_key'] = 'c759a595'
					// config.data['api_secret'] =  '9cab09f4df0061b8'
				return config
			}
		]
	}
}