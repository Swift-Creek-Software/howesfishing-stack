import { multiClientMiddleware } from 'redux-axios-middleware'
import { howesFishingClient, howesFishingOptions } from './howesFishing'
import { baseClient, baseClientOptions } from './baseApi'

export default () => {
	return multiClientMiddleware(
		{
      default: {
        client: baseClient,
        options: baseClientOptions
			}
		},
		//options
		{
			returnRejectedPromiseOnError : true
		}
	)
}