using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace azure_functions;

public interface IClerkTokenValidator
{
    Task<bool> ValidateAsync(string token);
}

public class ClerkTokenValidator(IHttpClientFactory httpClientFactory, IConfiguration configuration) : IClerkTokenValidator
{
    private readonly IHttpClientFactory _httpClientFactory = httpClientFactory;
    private readonly string _jwksUrl = configuration["Clerk:JwksUrl"]
            ?? throw new InvalidOperationException("Clerk:JwksUrl is not configured.");

    public async Task<bool> ValidateAsync(string token)
    {
        try
        {
            var client = _httpClientFactory.CreateClient();
            var jwksJson = await client.GetStringAsync(_jwksUrl);
            var signingKeys = new JsonWebKeySet(jwksJson).GetSigningKeys();

            var handler = new JwtSecurityTokenHandler();
            handler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKeys = signingKeys,
                ValidateLifetime = true,
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.FromSeconds(30),
            }, out _);

            return true;
        }
        catch (SecurityTokenException)
        {
            return false;
        }
    }
}
