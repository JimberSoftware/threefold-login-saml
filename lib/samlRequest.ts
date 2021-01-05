import {extractXmlAttributeFields, inflateXaml} from "./utils";
import {LoginRequest, SamlRequestData} from "./types";

export const parseSamlRequest = (samlRequestData: SamlRequestData): LoginRequest => {
    const inflatedXaml = inflateXaml(samlRequestData.samlRequest);
    const loginData = extractXmlAttributeFields(inflatedXaml, ['AssertionConsumerServiceURL', 'ID']);
    return {
        id: loginData.id,
        assertionConsumerServiceUrl: loginData.assertionconsumerserviceurl,
        relayState: samlRequestData.relayState,
        user: samlRequestData.user
    };
}

