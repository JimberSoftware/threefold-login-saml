import {IdentityProvider} from "../IdentityProvider";
import {ServiceProvider} from "../ServiceProvider";
import ProviderData from "../ProviderData";

const googleIdp = new IdentityProvider({
    // privateKey: Buffer.from("path to privateKey"),
    // publicCert: Buffer.from("path to publicCert"),
    nameIDFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:email',
    requestSignatureAlgorithm: 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256',
    issuer: 'urn:google:idp'
});

const googleSp = new ServiceProvider({
    sloAvailable: false,
    signatureAlgorithm: 'rsa-sha256',
    digestAlgorithm: 'sha256',
    authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport'
});

export const googleProvider = new ProviderData('google', googleIdp, googleSp);