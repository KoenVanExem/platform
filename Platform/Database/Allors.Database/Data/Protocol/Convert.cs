// <copyright file="Convert.cs" company="Allors bvba">
// Copyright (c) Allors bvba. All rights reserved.
// Licensed under the LGPL license. See LICENSE file in the project root for full license information.
// </copyright>

namespace Allors.Protocol.Data
{
    using System;
    using System.Text.Json;
    using System.Xml;

    using Allors.Meta;

    public static class Convert
    {
        public static object ToValue(IUnit unit, string @string)
        {
            if (@string == null)
            {
                return null;
            }

            switch (unit.UnitTag)
            {
                case UnitTags.Binary:
                    return System.Convert.FromBase64String(@string);

                case UnitTags.Boolean:
                    return XmlConvert.ToBoolean(@string);

                case UnitTags.DateTime:
                    return XmlConvert.ToDateTime(@string, XmlDateTimeSerializationMode.Utc);

                case UnitTags.Decimal:
                    return XmlConvert.ToDecimal(@string);

                case UnitTags.Float:
                    return XmlConvert.ToDouble(@string);

                case UnitTags.Integer:
                    return XmlConvert.ToInt32(@string);

                case UnitTags.String:
                    return @string;

                case UnitTags.Unique:
                    return XmlConvert.ToGuid(@string);

                default:
                    throw new Exception("Unknown unit " + unit);
            }
        }

        public static object ToValue(IRoleType roleType, object value)
        {
            var unit = (IUnit)roleType?.ObjectType;

            if (value is string stringValue)
            {
                return Convert.ToValue(unit, stringValue);
            }

            if (value is JsonElement jsonElement)
            {
                switch (jsonElement.ValueKind)
                {
                    case JsonValueKind.True:
                        return true;

                    case JsonValueKind.False:
                        return true;

                    case JsonValueKind.Undefined:
                        return null;

                    default:
                        throw new ArgumentException($"Unknown value: {value}");
                }
            }

            return value;
        }
    }
}