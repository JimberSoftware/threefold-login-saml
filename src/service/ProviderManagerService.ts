import ProviderData from "../providers/ProviderData";
import {ServiceProvider} from "../providers/ServiceProvider";
import {IdentityProvider} from "../providers/IdentityProvider";

export class ProviderManagerService {

    private providers: Map<string, ProviderData> = new Map<string, ProviderData>();

    public init(providers: Provider[]) {
        providers.forEach(provider => {
            this.addProvider(provider.name, provider.data);
        });
    }

    private addProvider(name: string, providerData: ProviderData): void {
        if (this.providers.get(name)) {
            console.log(`${name} does already exists as provider`);
            return;
        }
        this.providers.set(name, providerData);
    }

    public getCurrentProvider(providerName: string) : ProviderData | undefined {
        return this.providers.get(providerName);
    }

    public getIdentityProviderForProvider(name: string) : IdentityProvider | undefined {
        return this.providers.get(name)?.getIdentityProvider();
    }

    public getServiceProviderForProvider(name: string) : ServiceProvider | undefined {
        return this.providers.get(name)?.getServiceProvider();
    }
}

export interface Provider {
    name: string,
    data: ProviderData
}