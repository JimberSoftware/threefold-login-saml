export type LoginRequest = {
    id: string,
    assertionConsumerServiceUrl: string,
    relayState: string,
    user: UserData
}

export type SamlRequestData = {
    samlRequest: string,
    relayState: string,
    user: UserData
}

export type LogoutRequestData = {
    uuid: string,
    nameIdentifier: string,
    nameIdentifierFormat: string,
    issueInstant: string,
    issuer: string,
    destination: string
}

export type AssertionData = { // @TODO maybe find a way to handle our own assertion creation
    privateKey: Buffer,
    certificate: Buffer,
    recipient: string,
    inResponseTo: string,
    issuer: string,
    audiences: string,
    nameIdentifier: string,
    nameIdentifierFormat: string,
    signatureNamespacePrefix: string,
    attributes: {
        email: string
        displayName?: string
        firstName?: string
        lastname?: string
    },
    lifetime: number,
    signatureAlgorithm: string,
    digestAlgorithm: string,
    authnContextClassRef: string,
    attributeNameFormat: string,
}

export type UserData = {
    email: string,
    firstName?: string,
    surname?: string,
    displayName?: string
}

export enum samlType {
    LOGOUT_REQUEST = 'logoutRequest',
    LOGIN_RESPONSE = 'loginResponse',
    LOGOUT_RESPONSE = 'logoutResponse'
}

export interface XmlAttributeFields {
    [key: string]: any
}