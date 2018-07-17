import ControllerBase from '../core/ControllerBase'


export default class ExchangeControllerBase extends ControllerBase {
  constructor() {
    super();
    this.RSAsetPublicKey('-----BEGIN public-----\n' +
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuUbv4zA0HU9hLW756Aqh\n' +
      'vDkq7uFF1whjooo06C3GYNnwtAQcFkIyLBp7HA0a+D95o7Tyv6LiSLFv7QrbzO1L\n' +
      '1ZmwP4HPsaBNJyuwUQAo+FLyLz08cMb96UvuVhUsDM33oJ0N2yoevCVxJJyZWQTh\n' +
      'K8fEVr7Dc4MCkGPPGO7vz0ifABcpV6XuzrlyPnxkhc3uVsxswQdZVflt9uGnwzF9\n' +
      'CPTmUY/itVcGWq9F9JEmoudvKHWBFgfZ11ACTaQtOFojbjbgz39CQWdN2+tVhu/l\n' +
      'LGP7xLmyACrkkkamFINZO+HDs4rI4g2rC20bPXExSAAxKFGXHUl6S4Af2hjwv4V2\n' +
      '0wIDAQAB\n' +
      '-----END public-----')
  }
  // /**
  // search(){
  //
  // }

}