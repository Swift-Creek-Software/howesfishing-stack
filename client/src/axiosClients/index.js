import { multiClientMiddleware } from 'redux-axios-middleware'
import { howesFishingClient, howesFishingOptions } from './howesFishing'
import { nexmoClient, nexmoOptions } from './nexmoClient'

export default () => {
	return multiClientMiddleware(
		{
			default: {
				client: howesFishingClient,
				options: howesFishingOptions
			},
			nexmo: {
				client: nexmoClient,
				options: nexmoOptions
			}
		},
		//options
		{
			returnRejectedPromiseOnError : true
		}
	)
}