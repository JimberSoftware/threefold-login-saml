export class IdentityProvider {

    private readonly settings: IdentityProviderSettings;

    constructor(settings: IdentityProviderSettings) {
        this.settings = settings;
    }

    get privateKey(): Buffer {
        return this.settings.privateKey;
    }

    get publicCert(): Buffer {
        return this.settings.publicCert;
    }

    get issuer(): string {
        return this.settings.issuer;
    }

    get nameIDFormat(): string {
        return this.settings.nameIDFormat;
    }

    get baseSettings() {
        return this.settings;
    }
}

type IdentityProviderSettings = {
    privateKey?: Buffer,
    publicCert?: Buffer,
    nameIDFormat: string,
    issuer: string,
    requestSignatureAlgorithm: string
}