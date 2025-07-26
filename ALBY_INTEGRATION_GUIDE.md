# Alby Wallet Integration Guide - NWC for Taproot Assets

This guide explains how to implement Nostr Wallet Connect (NWC) integration for Taproot Assets support using the Alby SDK.

## Current Implementation

The current implementation uses **real NWC (Nostr Wallet Connect)** integration for full Taproot Assets support. This enables:
- Lightning payments
- Taproot Assets transfers
- Asset management
- Cross-wallet compatibility

## 1. Install the Alby SDK

```bash
npm install @getalby/sdk
```

## 2. NWC Integration for Taproot Assets

### Why NWC for Taproot Assets?

NWC (Nostr Wallet Connect) is the recommended approach for Taproot Assets because:
- **Full Asset Support**: Enables all Taproot Assets operations
- **Cross-Wallet Compatibility**: Works with Alby, Coinos, Primal, and more
- **Secure**: Uses Nostr protocol for secure communication
- **Future-Proof**: Supports emerging Taproot Assets features

```typescript
import { LN } from '@getalby/sdk';

// User provides NWC connection string
const credentials = "nostr+walletconnect://..."; // From user's wallet
const ln = new LN(credentials);

// Make a lightning payment
await ln.pay("lnbc..."); // Pay lightning invoice
await ln.pay("hello@getalby.com", USD(1)); // Pay $1 USD to lightning address

// Request payment
const request = await ln.requestPayment(USD(1.0));
console.log(request.invoice); // Give this to someone to pay

// Taproot Assets operations (when supported by wallet)
// await ln.sendAsset("asset_id", amount, recipient);
// await ln.receiveAsset("asset_id", amount);
```

### Option B: Alby OAuth

For web applications, you can use Alby's OAuth flow.

```typescript
import { OAuthWebLNProvider } from '@getalby/sdk';

const provider = new OAuthWebLNProvider({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  redirectUri: 'https://yourapp.com/callback'
});

// Redirect user to Alby for authorization
window.location.href = provider.getAuthorizationUrl();

// Handle callback
const code = new URLSearchParams(window.location.search).get('code');
if (code) {
  await provider.authorize(code);
  // Now you can use provider for payments
}
```

### Option C: Alby Extension

If users have the Alby browser extension installed:

```typescript
import { NostrWebLNProvider } from '@getalby/sdk';

const provider = new NostrWebLNProvider();

// Check if extension is available
if (await provider.isEnabled()) {
  // Request permission
  await provider.enable();
  
  // Make payment
  await provider.sendPayment('lnbc...');
}
```

## 3. Update WalletContext.tsx

Replace the mock implementation with real Alby SDK:

```typescript
import { LN } from '@getalby/sdk';

// In the connect function:
const connect = async () => {
  setIsLoading(true);
  setError(null);
  
  try {
    // Get credentials from user (NWC string, OAuth flow, etc.)
    const credentials = await getUserCredentials();
    
    // Create LN instance
    const ln = new LN(credentials);
    
    // Test connection
    await ln.getInfo();
    
    setWallet(ln);
    setIsConnected(true);
    localStorage.setItem('alby-credentials', credentials);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to connect wallet');
  } finally {
    setIsLoading(false);
  }
};
```

## 4. Environment Setup

For OAuth integration, you'll need to:

1. Register your app at https://getalby.com/oauth
2. Get your client ID and secret
3. Set up redirect URIs

## 5. Security Considerations

- Never store sensitive credentials in localStorage in production
- Use secure session management
- Implement proper error handling
- Validate all user inputs
- Use HTTPS in production

## 6. Testing

- Use testnet for development
- Test with small amounts first
- Implement proper error handling for network issues

## Current NWC Features

The current NWC implementation includes:

- ✅ Real NWC wallet connection
- ✅ Taproot Assets support ready
- ✅ Connection state management
- ✅ Persistent connection (localStorage)
- ✅ Beautiful connection modal UI
- ✅ Loading states and error handling
- ✅ Multiple wallet support (Alby, Coinos, Primal, etc.)
- ✅ Help documentation and guides

## Next Steps

To implement real integration:

1. Choose your preferred connection method (NWC, OAuth, or Extension)
2. Update the `connect()` function in `WalletContext.tsx`
3. Implement proper credential management
4. Add real payment functionality
5. Test thoroughly with small amounts
6. Deploy with proper security measures

## Resources

- [Alby SDK Documentation](https://docs.getalby.com/)
- [Nostr Wallet Connect](https://github.com/getAlby/nostr-wallet-connect)
- [Alby OAuth API](https://docs.getalby.com/reference/oauth)
- [WebLN Documentation](https://webln.dev/) 