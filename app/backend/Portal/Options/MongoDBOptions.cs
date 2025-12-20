using System;

namespace Portal.Options;

public class MongoDBOptions
{
    public required string ConnectionString { get; init; }
    public required string DatabaseName { get; init; }
    public required string PatientsCollection { get; init; }
    public required string OrdersCollection { get; init; }
}
