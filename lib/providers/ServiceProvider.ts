export class ServiceProvider {

    private readonly settings: ServiceProviderSettings;

    constructor(settings: ServiceProviderSettings) {
        this.settings = settings;
    }

    get signatureAlgorithm(): string {
        return this.settings.signatureAlgorithm;
    }

    get digestAlgorithm(): string {
        return this.settings.digestAlgorithm;
    }

    get isSloAvailable(): boolean {
        return this.settings.sloAvailable;
    }

    get authnContextClassRef(): string {
        return this.settings.authnContextClassRef;
    }

    get attributeNameFormat(): string {
        return this.settings.attributeNameFormat;
    }
}

type ServiceProviderSettings = {
    sloAvailable: boolean,
    signatureAlgorithm: string,
    digestAlgorithm: string,
    authnContextClassRef: string,
    attributeNameFormat?: string
}
