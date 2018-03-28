const SparkPost = require('sparkpost')
const keys = require('../config/keys')
const client = new SparkPost(keys.sparkpostId)

module.exports = {
  /**
   * Send an email
   * @param options {object}
   * @param options[sandbox] {bool} Defaults to false - whether to use sandbox env
   * @param options[recipients] {array} List of recipients - must be this form: [{ address: 'email@email.com' }, ...]
   * @param options[templateId] {string} The template ID to use
   * @param options[templateData] {object} The required data to go to the template
   * @param options[campaignId] {string} A sparkpost campaign id for tracking emails
   * @param options[meta] {object} Meta data to attach to email headers
   * @returns Promise
   */
  sendEmail: function (options) {
    if (!options) {
      return Promise.reject()
    }

    return  client.transmissions.send({
      options: {
        sandbox: options.sandbox || false
      },
      campaign_id: options.campaignId || 'no-campaign-WTF',
      metadata: options.meta || {},
      content: {
        template_id: options.templateId,
        from: 'testing@sparkpostbox.com',
        // subject: options.subject, // template will assign subject
        // html:'', // template assigns html
      },
      substitution_data: options.templateData,
      recipients: options.recipients
    })
  },
}
