import {Provider, ProviderManagerService} from "./service/ProviderManagerService";
import {googleProvider} from "./providers/google";

const providerManager = new ProviderManagerService();

const providers: Provider[] = [
    { name: 'google', data: googleProvider }
]

providerManager.init(providers);

export default providerManager;