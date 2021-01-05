import {getTemplateForType} from "./templates";
import {createAssertion} from "./samlAssertion";
import {v4 as uuidV4} from "uuid";
import ProviderData from "./providers/ProviderData";
import {LoginRequest, samlType} from "./types";

const generateSamlAssertion = async (loginRequest: LoginRequest, providerData: ProviderData): Promise<any> => {
    return await createAssertion(loginRequest, providerData);
}

export const generateResponseTemplate = async (providerData: ProviderData, loginRequest: LoginRequest): Promise<string> => {
    const responseTemplate = getTemplateForType(samlType.LOGIN_RESPONSE);
    const assertion = await generateSamlAssertion(loginRequest, providerData);
    return responseTemplate(({
        uuid: ('_' + uuidV4()),
        issueInstant: new Date().toISOString(),
        issuer: providerData.getIdentityProvider().issuer,
        ...loginRequest,
        assertion
    }));
}