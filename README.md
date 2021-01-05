# SAML

Create SAML assertions for specific SAML 2.0 Providers

## Custom Providers

This Saml lib can be used to setup your own third-party Identity Provider for a Service Provider (e.g Google).

### Registering Provider

To initialise a Provider you will have to add it inside the **Provider folder**. The provider contains the Identity Provider and Service Provider config that is needed to sign the assertion requests and responses.

### Key Setup

You'll need to setup the Service Provider to work with a third-party Identity Provider. This requires to give the Service Provider the **PrivKey and Cert** that is used by your Identity Provider for signing the assertions.

## Assertion

The Identity Provider create signed assertions which will be sent to the Service provider. The Service Provider validates the assertion and grant you access to the Service if it is valid.

###  Generating Assertion

To generate a signed assertion you'll have to register a provider first. The provider must have a **PrivKey and Cert** in order to fully work. Once those are defined it will be possible for the saml lib to generate a **assertion** for the requested provided.

##  Supported

- Saml Request
- Saml Response signing

## Not Supported

- SLO (Single logout)
- Saml Response encryption
- Dynamic load providers

## Usage

Example for express:
```typescript
private signInWithSaml = async (req: Request, res: Response, next: NextFunction) => {
    const { SAMLRequest, RelayState } = req.query;
    const { provider } = req.params;

    // Query string checks
    if (!SAMLRequest || typeof SAMLRequest !== "string") {
        throw Error('SamlRequest is not defined or not a string!');
    }
    if (!RelayState || typeof RelayState !== "string") {
        throw Error('RelayState is not defined or not a string!');
    }
    if (!provider) {
        throw Error('Provider is not defined!');
    }

    // Current user
    const user = {
        email: 'test@test.com'
    };

    // Parse the saml request of the Service Provider
    const loginRequest = parseSamlRequest({
        samlRequest: <string> SAMLRequest,
        relayState: <string> RelayState,
        user
    });

    // Get the current Provider data
    const providerData: ProviderData = providerManager.getCurrentProvider(provider);

    // Generate Saml Response with signed assertion
    const samlResponse = await generateResponseTemplate(providerData, loginRequest);
    // base64 encode the response
    const encodeSamlResponse = encodeSaml(samlResponse);

    // send the response to the Service Provider
    res.render('formInput', {
        audience: loginRequest.assertionConsumerServiceUrl,
        relayState: loginRequest.relayState,
        samlResponse: encodeSamlResponse
    });
}
```