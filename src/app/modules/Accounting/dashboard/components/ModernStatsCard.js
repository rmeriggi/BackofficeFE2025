import {
  AccountBalance,
  AccountBalanceWallet,
  Assessment,
  Business,
  MonetizationOn,
  Receipt,
  TrendingDown,
  TrendingUp,
} from "@material-ui/icons";
import React from "react";

export default function ModernStatsCard({ stats }) {
  const iconMap = {
    AccountBalance,
    AccountBalanceWallet,
    MonetizationOn,
    Receipt,
    Assessment,
    Business,
  };

  return (
    <div className="row mb-8">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon] || AccountBalance;

        return (
          <div
            key={index}
            className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-6"
          >
            <div
              className="card card-custom gutter-b shadow-sm"
              style={{
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
              }}
            >
              <div className="card-body p-6">
                <div className="d-flex align-items-center">
                  <div
                    className={`symbol symbol-50 symbol-light-${stat.color} mr-6`}
                  >
                    <span className="symbol-label bg-white">
                      <Icon
                        style={{
                          fontSize: 24,
                          color: stat.iconColor || "#3699FF",
                        }}
                      />
                    </span>
                  </div>
                  <div className="flex-grow-1">
                    <div className="text-muted font-weight-bold font-size-sm mb-1">
                      {stat.title}
                    </div>
                    <div
                      className={`font-size-h3 font-weight-bolder text-${stat.color} mb-2`}
                    >
                      {stat.value}
                    </div>
                    <div className="d-flex align-items-center">
                      {stat.trend > 0 ? (
                        <TrendingUp
                          style={{
                            fontSize: 16,
                            color: stat.iconColor || "#3699FF",
                            marginRight: 4,
                          }}
                        />
                      ) : (
                        <TrendingDown
                          style={{
                            fontSize: 16,
                            color: "#F64E60",
                            marginRight: 4,
                          }}
                        />
                      )}
                      <span
                        className={`text-${stat.color} font-weight-bold font-size-sm`}
                      >
                        {stat.trend > 0 ? `+${stat.trend}%` : `${stat.trend}%`}{" "}
                        {stat.subtitle}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
