namespace Althera.Domain;

public enum OrderState
{
    None,
    Submitted,
    InDesign,
    DesignComplete,
    InProduction,
    ProductionComplete,
    ReadyForShipment,
    Shipped,
    Delivered,
    Cancelled
}