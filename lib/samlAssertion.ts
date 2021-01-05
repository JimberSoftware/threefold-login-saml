import {v4 as uuidV4} from 'uuid';
import ProviderData from "./providers/ProviderData";
import {LoginRequest} from "./types";
import {Saml20 as saml} from 'saml';

export const createAssertion = async (loginRequest: LoginRequest, providerData: ProviderData): Promise<string> => {
    if (!providerData.getIdentityProvider()) {
        throw Error(`No IdentityProvider registered for provider: ${providerData.getProvider()}!`);
    }

    if (!providerData.getServiceProvider()) {
        throw Error(`No ServiceProvider registered for provider: ${providerData.getProvider()}!`);
    }

    if (!providerData.getIdentityProvider().privateKey) {
        throw Error(`No private key found for: ${providerData.getProvider()}!`);
    }

    if (!providerData.getIdentityProvider().publicCert) {
        throw Error(`No cert found for: ${providerData.getProvider()}!`);
    }

    return await saml.create({
        signatureAlgorithm: providerData.getServiceProvider().signatureAlgorithm,
        digestAlgorithm: providerData.getServiceProvider().digestAlgorithm,
        key: providerData.getIdentityProvider().privateKey,
        cert: providerData.getIdentityProvider().publicCert,
        issuer: providerData.getIdentityProvider().issuer,
        lifetimeInSeconds: 3600,
        audiences: loginRequest.assertionConsumerServiceUrl,
        attributes: {
            email: loginRequest.user.email
        },
        nameIdentifier: loginRequest.user.email,
        nameIdentifierFormat: providerData.getIdentityProvider().nameIDFormat,
        recipient: loginRequest.assertionConsumerServiceUrl,
        inResponseTo: loginRequest.id,
        authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
        includeAttributeNameFormat: true,
        signatureNamespacePrefix: '',
        sessionIndex: uuidV4()
    });
}
