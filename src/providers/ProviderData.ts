import { IdentityProvider } from "./IdentityProvider";
import { ServiceProvider } from "./ServiceProvider";

export default class ProviderData {

    private readonly provider: string;
    private readonly identityProvider: IdentityProvider;
    private readonly serviceProvider: ServiceProvider;

    constructor(provider: string, identityProvider: IdentityProvider, serviceProvider: ServiceProvider) {
        this.provider = provider;
        this.identityProvider = identityProvider;
        this.serviceProvider = serviceProvider;
    }

    public getProvider(): string {
        return this.provider;
    }

    public getIdentityProvider(): IdentityProvider {
        return this.identityProvider;
    }

    public getServiceProvider(): ServiceProvider {
        return this.serviceProvider;
    }
}