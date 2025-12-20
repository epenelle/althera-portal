using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;

namespace azure_functions;

public class TestController
{
    [Function("hello")]
    public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "post", Route = "hello")] HttpRequest req, CancellationToken ct)
    {
        return new CreatedResult("/hello", new { message = "Hello, World!" });
    }
}
