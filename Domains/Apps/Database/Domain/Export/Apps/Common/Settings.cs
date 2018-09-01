﻿namespace Allors.Domain
{
    using System;

    public partial class Settings
    {
        public void AppsOnDerive(ObjectOnDerive method)
        {
            if (!this.ExistSkuCounter)
            {
                this.SkuCounter = new CounterBuilder(this.strategy.Session).WithUniqueId(Guid.NewGuid()).WithValue(0).Build();
            }
        }

        public string NextSkuNumber()
        {
            var skuNumber = this.SkuCounter.NextValue();
            return string.Concat(this.SkuPrefix, skuNumber);
        }
    }
}
