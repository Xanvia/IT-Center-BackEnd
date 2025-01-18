const axios = require('axios');
const fs = require('fs');

class PaymentParser {
  private gatewayUrl: string;
  private version: string;
  private merchantId: string;
  private apiUsername: string;
  private password: string;

  constructor(config) {
    this.gatewayUrl = config.gatewayUrl;
    this.version = config.version;
    this.merchantId = config.merchantId;
    this.apiUsername = config.apiUsername;
    this.password = config.password;
  }

  // Format request URL
  formRequestUrl() {
    return `${this.gatewayUrl}/version/${this.version}`;
  }

  // Format request data into Name-Value Pair (NVP) format.
  parseRequest(data) {
    const params = new URLSearchParams(data);

    // Add authentication details
    params.append('merchant', this.merchantId);
    params.append('apiUsername', this.apiUsername);
    params.append('apiPassword', this.password);

    return params.toString();
  }

  // Send transaction request
  async sendTransaction(data) {
    const requestUrl = this.formRequestUrl();
    const requestBody = this.parseRequest(data);

    try {
      const axiosConfig = {
        method: 'post',
        url: requestUrl,
        data: requestBody,
        timeout: 35000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Content-Length': Buffer.byteLength(requestBody),
        },
        // httpsAgent: config.ssl.certPath
        //   ? new (require('https').Agent)({
        //       ca: fs.readFileSync(config.ssl.certPath),
        //       rejectUnauthorized: config.ssl.verifyPeer,
        //     })
        //   : undefined,
        proxy: false,
        // proxy: config.proxy.enabled
        //   ? {
        //       host: config.proxy.url.split(':')[1].replace('//', ''),
        //       port: config.proxy.url.split(':')[2],
        //       auth: config.proxy.auth
        //         ? {
        //             username: config.proxy.auth.split(':')[0],
        //             password: config.proxy.auth.split(':')[1],
        //           }
        //         : undefined,
        //     }
        //   : false,
      };

      const response = await axios(axiosConfig);
      return response.data; // Handle the gateway response
    } catch (error) {
      return error;
    }
  }
}

module.exports = PaymentParser;
