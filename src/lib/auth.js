const JWT_SECRET = process.env.JWT_SECRET || 'beautiluuksecretkey2026jwtencryption';

// Base64url Encoder helper using web standards
function base64urlEncode(str) {
  const base64 = btoa(unescape(encodeURIComponent(str)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Base64url Decoder helper using web standards
function base64urlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return decodeURIComponent(escape(atob(base64)));
}

// Computes HMAC-SHA256 signature using native Web Crypto subtle API
async function signMessage(message, secret) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    messageData
  );

  const bytes = new Uint8Array(signatureBuffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Generates an Edge-compatible signed JWT session token
 */
export async function signSession(username) {
  const header = base64urlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = base64urlEncode(JSON.stringify({
    username,
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 24 Hours
  }));
  
  const signature = await signMessage(`${header}.${payload}`, JWT_SECRET);
  return `${header}.${payload}.${signature}`;
}

/**
 * Cryptographically validates an Edge-compatible session token
 */
export async function verifySession(token) {
  if (!token) return null;
  
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  
  const [header, payload, signature] = parts;
  
  try {
    const expectedSignature = await signMessage(`${header}.${payload}`, JWT_SECRET);
    if (signature !== expectedSignature) {
      return null;
    }
    
    const data = JSON.parse(base64urlDecode(payload));
    if (data.exp && (Date.now() / 1000) > data.exp) {
      return null; 
    }
    
    return data;
  } catch (error) {
    return null;
  }
}
