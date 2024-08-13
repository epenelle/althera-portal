using Althera.Api.Models;
using Althera.Domain;
using Althera.Models.Persistence;

namespace Althera.Extensions;

public static class OrderExtensions
{
    public static Order ToDomain(this OrderEntity orderEntity)
    {
        return new Order
        {
            Id = orderEntity.Id,
            OrthosisModel = orderEntity.OrthosisModel,
            OrthosisInformation = orderEntity.OrthosisInformation,
            OrthosisScan = orderEntity.OrthosisScan,
            Comments = orderEntity.Comments,
            Date = orderEntity.Date,
            State = orderEntity.State,
            Patient = orderEntity.Patient.ToDomain(),
        };
    }

    public static OrderModel ToApi(this Order orderDomain)
    {
        return new OrderModel
        {
            Id = orderDomain.Id,
            OrthesisModel = orderDomain.OrthosisModel,
            OrthesisInfo = orderDomain.OrthosisInformation,
            OrthesisComment = orderDomain.Comments,
            OrthesisScan = orderDomain.OrthosisScan,
            OrderDate = orderDomain.Date,
            OrderState = orderDomain.State.ToString(),
            Patient = orderDomain.Patient.ToApi(),
        };
    }
}
