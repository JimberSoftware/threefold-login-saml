import {getTemplateForType} from "./templates";
import {v4 as uuidV4} from "uuid";
import samlProviders from './samlProviders';
import {LogoutRequestData, samlType, UserData} from "./types";

export const generateLogoutRequest = (provider: string, user: UserData) => {
    const logoutRequestTemplate = getTemplateForType(samlType.LOGOUT_REQUEST);
    const logoutRequestData = getLogoutRequestData(provider, user);
    return logoutRequestTemplate(logoutRequestData);
}

const getLogoutRequestData = (provider: string, user: UserData): LogoutRequestData => {
    const currentIdp = samlProviders.getIdentityProviderForProvider(provider);
    const currentSp = samlProviders.getServiceProviderForProvider(provider);

    if (!currentIdp || !currentSp) {
        // Throw error here?
        throw new Error('No service or identity provider');
    }

    return {
        uuid: ('_' + uuidV4()),
        issueInstant: new Date().toISOString(),
        issuer: currentIdp.issuer,
        destination: '', //@TODO
        nameIdentifierFormat: currentIdp.nameIDFormat,
        nameIdentifier: user.email
    }
}